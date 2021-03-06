require([
      //DOM manipulation
      "dojo/dom", 
      "dojo/dom-construct", 
      "dojo/query",
      "dojo/dom-attr", 
      //Stores
      "dojo/store/Memory",
      "dojo/store/Cache",
      "dojo/store/JsonRest",
      "dojo/store/Observable",
      //AJAX
      "dojo/request",
      //Async
      "dojo/on",
      "dojo/Deferred",
      //Components
      "dijit/form/Select",
      //ApplicationState [TEST]
      "bika/ApplicationState"
      ], function(dom, domConstruct, query, domAttr, Memory, Cache, JsonRest, Observable, request, on, Deferred, Select, ApplicationState){ 

    ///////
    // module : budgeting
    // 
    // TODO: 
    //  -[Discuss] Functions inside functions created every time a function is called? Place common functions at top level?
    //  -[Discuss] Should this just be done with D-Grid to provide uniform table structure
    //  -[Discuss] I read somewhere that var newFunc = function() { } is better practice than function() { }, is that true?
    //  -Flush budget changes to server (waiting on update of db.js)
    //  -Unique ID for budget table (ref: Store rant in code) TODO(meta) This is done, udpate code accordingly 
    //  -Highlighting for errors on incorrect inputs for budgeting etc (Red box around invalid input)
    //  -If changes to budget are made, user should not be able to change accounts until discarded (reset) or updated
    //  -Highlight Start of fiscal year (row outline) ?End of fiscal year
    //  -Some object are getting thrown initialised and sticking around way too long (ref: models etc. on view refresh)
    //  -Clean up error validating with cache_change
    ///////
    
    /////
    // TODO /n
    //  -Apportion budget row (button should make input and submit button visible); spread number across all months for budget
    //  -uniform width column headers always
    /////
    
    /////
    // Current - Total is an input, any value inserted into total should be spread evenly across te months
    /////
    var uid = "bika-units-budgeting";
    //TODO: return an initialised object, should not have to manually create instance
    var app_state = new ApplicationState();
    //label months provided by Date object (given 0 - 11)
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var enterprise_id = app_state.getValue("enterprise-select");
    var fiscal_year_id = app_state.getValue("fiscal-select");

    var cache_change = {};

    //Value set with account-select
    var account_id;
    var account_select;
    var edits = false;

    //@sfount - re-write this to inject these value all the way through, stupid to have them accesible to everyone
    tablebind = {};
    var fiscal_array = [{id : "previous"}, {id : "current"}, {id : "next"}];

    //This should be encapsulated somewhere
    var budget_dependencies = {"enterprise" : false, "fiscal" : true};

    //var cache_change = new Array(3);

    //access to any application level componenet changes
    app_state.register(uid, "enterprise-select", function(value) { 
      //Change will effect both enterprise AND fiscal, have to wait for dependencies, TODO determine dependencies from code
      console.log(uid, "responding to: ", value);
      budget_dependencies.enterprise = true;
      account_id = value;
      
      //Should make a call to updateAccount as well
    });

    app_state.register(uid, "fiscal-select", function(value) { 
      //Change will only effect fiscal year, no need to udpate account, TODO determine dependencies from code
      console.log(uid, "responding to: ", value);
      budget_dependencies.fiscal = true;
      fiscal_year_id = value;

      //really think this one through 
      if(budget_dependencies.enterprise) { 
        updateAccount(account_id);
      } else { 
        budget_dependencies.fiscal = false;
        refreshUI();
        //settupBudget(fiscal_year_id, account_id);
        resetModel();
      }
    });
    
    initUI();

    function initUI() { 

      //Split into seperate functions to allow multiple components to be rendered in order
      renderTables();

      var settupAccount = initAccountSelect(enterprise_id);

      settupAccount.then(function(value) { 
        account_id = value;
        //TODO: This is a temporary fix, error handling should be thought through
        if(account_id) { 
        	settupBudget(fiscal_year_id, account_id);
        }
      })

      function renderTables() { 
        //Populate the budget table with blank rows, account for fiscal years starting in any month
        for(var i=0; i<fiscal_array.length; i++) { 
          var tableid = "bika-units-budgeting-" + fiscal_array[i].id;
          var budget_table = dom.byId(tableid);

          for(var j=0; j<months.length; j++) { 
            budget_table.insertBefore(createRow(j), null);
          }

          var total_row = domConstruct.create("tr", {
            id : tableid + "-totalRow"
          }, budget_table);

          var total_label = domConstruct.create("td", { 
            colSpan : 2, 
            innerHTML : "Total"
          }, total_row);

          var budget_total = domConstruct.create("td", { 
            colSpan : 1,
            id : tableid + "-budgetTotal",

          }, total_row);

          function createRow(row_index) { 
            var tr = domConstruct.create("tr", { 
              id : tableid + '-' + row_index,
              class : "empty"
            });

            var td_period = domConstruct.create("td", {
              id : tableid + '-' + row_index + '-period'
            }, tr);
            //@sfount - Research Actual vs. Budget and implement correctly
            var td_actual = domConstruct.create("td", { 
              id : tableid + '-' + row_index + '-actual'
            }, tr);
            var td_budget = domConstruct.create("td", { 
              //@sfount - update this to give uniform naming convention 
              id : tableid + '-' + row_index + '-budgetRow'
            }, tr);

            return tr;
          }

        }
      }

      //should need to last entire life of the module
      on(dom.byId("bika-units-budgeting-submit"), "click", submitModel);
      on(dom.byId("bika-units-budgeting-reset"), "click", resetModel);
    }

    function submitModel() { 
      console.log("Submit pressed");
      for(fiscal_year in cache_change) { 
        var q = cache_change[fiscal_year]["model"].query()
        for (var i = q.length - 1; i >= 0; i--) {
          if(q[i].budget != cache_change[fiscal_year]["change"][q[i].id]) { 
            console.log("Updating", q[i]);
       
            var store = new JsonRest({ 
              target: 'data/'
            });

            //Manually create new object to insert, current models object is a reslut of a join
            store.put({"t" : "budget", "data" : [{"id" : q[i].id, "enterprise_id" : q[i].enterprise_id, "account_id" : q[i].account_id, "period_id" : q[i].period_id, "budget" : [q[i].budget]}], "pk" : ["id"]}, {id: q[i].id});
            //update cache model 
            cache_change[fiscal_year]["change"][q[i].id] = q[i].budget;
          }
        }
      }

      //TODO: 
      //  -this should only happen on successful server response, database updated 
      //  -resolve syntax error 
      dom.byId("bika-units-budgeting-submit").disabled = true;
      dom.byId("bika-units-budgeting-reset").disabled = true;
    }

    function resetModel() { 
      for(index in tablebind) { 
        tablebind[index].unbind();
      }
      tablebind = {};
      settupBudget(fiscal_year_id, account_id);
    } 
    
    function refreshUI() { 
      //basically duplicated code - not a good thing
      for(var i=0; i<fiscal_array.length; i++) { 
        var tableid = "bika-units-budgeting-" + fiscal_array[i].id;
        var budget_table = dom.byId(tableid);

        for(var j=0; j<months.length; j++) { 
          var tr = dom.byId(tableid + '-' + j);
          domAttr.set(tr, 'class', 'empty');

          //eugh
          var trchildren = tr.childNodes;
          for(child in trchildren) { 
            if(typeof trchildren[child]) { 
              domAttr.set(trchildren[child], "innerHTML", "");
            }
          }
        }

        var td_budget = dom.byId(tableid + '-budgetTotal');
        domAttr.set(td_budget, 'innerHTML', '');
      }
    }

    function settupBudget(fiscalyearid, accountid) { 

      //request information about current fiscal year
      var fyear = {};
      var fe = [{t : 'fiscal_year', c : ['id', 'number_of_months', 'start_month', 'start_year', 'previous_fiscal_year', 'next_fiscal_year']}];
      var fc = [{t : 'fiscal_year', cl : 'id', v : fiscalyearid, z : '='}];

      fyear.e = fe;
      fyear.c = fc;

      //reset 
      dom.byId("bika-units-budgeting-submit").disabled = true;
      dom.byId("bika-units-budgeting-reset").disabled = true;
      edits = false;
      cache_change = {};
      
      request.get('data/?' + JSON.stringify(fyear)).then(function(data) { 
        var fiscal_data = JSON.parse(data)[0];
        
        if(fiscal_data.previous_fiscal_year) { 
          requestBudget("previous", fiscal_data.previous_fiscal_year, accountid);
        }
        if(fiscal_data.next_fiscal_year) { 
          requestBudget("next", fiscal_data.next_fiscal_year, accountid);
        }
        requestBudget("current", fiscalyearid, accountid);
      });
    }

    function requestBudget(id, fiscalyearid, accountid) { 
      var budget_query = {
        'e' : [{
          t : 'period',
          c : ['period_start', 'period_stop'] 
        }, {
          t : 'budget',
          c : ['id', 'enterprise_id', 'account_id', 'period_id', 'budget']
        }],
        'jc': [{
          ts: ['period', 'budget'],
          c: ['id', 'period_id'],
          l: 'AND'
        }],
        'c': [{
          t: 'budget',
          cl: 'account_id',
          z: '=', 
          v: accountid, 
          l: 'AND' 
        }, 
        {
          t: 'period',
          cl: 'fiscal_year_id', 
          z: '=',
          v: fiscalyearid
      }]};

      var model = new Observable(Memory({}));
      var interface = new JsonRest({ 
        target : '/data/?' + JSON.stringify(budget_query)
      });
      var cache = new Cache(interface, model);

      cache.query().then(function() {
        //initialise all input errors to false 
        //temporary id hack
        var tid = "bika-units-budgeting-" + id;
        cache_change[tid] = {"error" : [], "model" : model, "change" : [], "interface" : cache};
        for (var i = model.data.length - 1; i >= 0; i--) {
          cache_change[tid]["error"].push(false);
          cache_change[tid]["change"][model.data[i].id] = model.data[i].budget;
        };

      });

      var budget_result = model.query();
      //@sfount - the methods returned here should be passed to whoever needs them, not stored at the top
      tablebind[id] = bindBudgetTable("bika-units-budgeting-" + id, budget_result, model);
      tablebind[id] = bindTotal("bika-units-budgeting-" + id, budget_result);

    } 

    function bindTotal(tableid, results) { 

      var total_view = dom.byId(tableid + "-budgetTotal");
      var cache_total = 0;
      ////////
      // This is a fix (read: hack) for keeping track of ID's 
      // -Items in dojos Stores must be UNIQUELY identifiable with a single column (ID). The budget table currently has a primary key consisting of multiple columns. Dojo kindly generates a random ID to satisfy its needs - unusable in this case.
      //  (1) Add a single column PK to every table in the bika database 
      //  (2) Alter dojo's Memory store to cater for the current `bika`.`budget` primary key`
      //  TODO: 
      //  -This should be resolved to adhere to the concept of having memory only in one place
      //  -Store original and new budgets to commit to server when needed
      ////////
      var cache_period = {};

      var bindHandle = results.observe(function(item, removedIndex, insertedIndex) { 

        var budget = Number(item.budget);
        //Use standard removed/insertedIndex method once Store IDs have been resolved
        if(!cache_period[item.period_id]) { 
          cache_period[item.period_id] = item.budget;
          cache_total += budget;
        } else { 
          cache_total -= cache_period[item.period_id];
          cache_total += budget;
          cache_period[item.period_id] = budget;
        }
        refreshView(cache_total);

      }, true);

      function refreshView(value) { 
        domAttr.set(total_view, "innerHTML", value);
      }

      function unbind() { 
        bindHandle.cancel();
      }

      return { 
        unbind: unbind
      }
    }

    function bindBudgetTable(tableid, results, model_ref) { 
      //summary: Bind the model for a given budget year to a budget table
      //TODO:
      //  -store row information in bindBudgetTable local variables - these should be used to access row elemnts, vs. queryying the DOM a second time

      var budget_table = dom.byId(tableid);
      var inputbind = {};

      var bindHandle = results.observe(function(item, removedIndex, insertedIndex) { 

        if(removedIndex > -1) { 
          //removeRow(removedIndex);
        }
        if(insertedIndex > -1) { 
          updateRow(item, insertedIndex);
        }
      }, true);

              

      //@sfount - this is probably shit
      function updateRow(item, index) { 
        
        //@sfount - assuming all fiscal years start in January - this number should be transformed respectively
        var month = new Date(item.period_start).getMonth();
        var row_id = tableid + "-" + month;

      
        domAttr.set(row_id, "class", '');
        //@sfount - 3 DOM querries, shouldn't happen
        domAttr.set(row_id + "-period", "innerHTML", formatDate(item.period_start));
        domAttr.set(row_id + "-actual", "innerHTML", '0.00');
        
        var submit = dom.byId("bika-units-budgeting-submit");
        var reset = dom.byId("bika-units-budgeting-reset");
        //TODO: Move duplicated into a function
        if(dom.byId(row_id + "-budget") != null) { 
          //reference input widget
          domAttr.set(row_id + "-budget", "value", item.budget);

          //If this is a new input
          //@sfount - this should be resolved (and not nescisary) by removing inputs on changing accounts/fiscal years
          if(!inputbind[item.id]) { 
            var td_budget_input = dom.byId(row_id + "-budget");

            inputbind[item.id] = on(td_budget_input, "keyup", function(e) { 
              ///////////
                //  Currently calling put method on store on every update, there may be a better way to this by updating the item (stored in the most recent query on the model) and obsering that individually 
              ///////////
                var newVal = td_budget_input.value;
                var validBudget = /^\d+(\.\d{1,2})?$/;

                if(!edits) { 
                  edits = true;
                  reset.disabled = false;
                  submit.disabled = false;
                }

                //Check format of input
                if(validBudget.test(newVal)) { 
                  cache_change[tableid]["error"][index] = false;
                  item.budget = Number(newVal);
                  model_ref.put(item);
                  if(validateSubmit()) { 
                    submit.disabled = false;
                  };
                } else { 
                  dom.byId("bika-units-budgeting-submit").disabled = true;
                  cache_change[tableid]["error"][index] = true;
                }
              });
          }
        } else { 

          //create input widget 
          var td_budget_input = domConstruct.create("input", { 
                value : item.budget,
                id : row_id + "-budget",
                pattern : '^[0-9]+(\.[0-9]{1,2})?$'
              }, dom.byId(row_id + "-budgetRow"));
              var input_error = false;

              //@sfount - again, undo these binds with dependencies vs. tracking them with an array
            inputbind[item.id] = on(td_budget_input, "keyup", function(e) { 
              var newVal = td_budget_input.value;
              var validBudget = /^\d+(\.\d{1,2})?$/;

              if(!edits) { 
                edits = true;
                reset.disabled = false;
                submit.disabled = false;
              }

              //Check format of input
              if(validBudget.test(newVal)) { 
                cache_change[tableid]["error"][index] = false;
                item.budget = Number(newVal);
                model_ref.put(item);
                if(validateSubmit()) { 
                  submit.disabled = false;
                };
              } else { 
                //Horrible number of reads and writes here
                submit.disabled = true;
                cache_change[tableid]["error"][index] = true;
              }
            });   
        }
      }

      function removeRow(index) { 
        //Remove an item from the budget table
      }

      function unbind() { 
        bindHandle.cancel();
        for (index in inputbind) {
          inputbind[index].remove();
        }
      }

      return { 
        unbind: unbind
      }
    }

    //TODO 
    //  -updateAccount
    //  -load fiscal years based on enterprise 
    //  -update server (/flush to server update button)
    //  -inputs on totals, spread costs across months

    function updateAccount(enterprise_id) { 

      refreshUI();
      budget_dependencies.enterprise = false;
      budget_dependencies.fiscal = false;
      var update_query = {};
      var e = [{t : 'account', c : ['id', 'locked', 'account_txt', 'account_type_id', 'account_category']}];
      var c = [{t : 'account', cl : 'enterprise_id', v : enterprise_id, z : '='}];

      update_query.e = e;
      update_query.c = c;
     
      var format_update_query = '?' + JSON.stringify(update_query);

      console.log("Updating account_select with", enterprise_id);
      account_select.query = format_update_query;
      account_select.removeOption(account_select.getOptions());
      account_select.setStore(account_select.store);
      account_select.set('value', account_select.get('value'));

    } 

    function initAccountSelect(enterprise_id) { 
      var deferred = new Deferred();

      //Using a store to utilise the getLabel method - there may be a better way to do this with dojo/request?
        var account_select_store = new JsonRest({
          target: '/data/',
          getLabel: function(data) {
            return data.id + " - " + data.account_txt; //ref: bika.sql
          }
        });

        var account_query = {};
        var e = [{t : 'account', c : ['id', 'locked', 'account_txt', 'account_type_id', 'account_category']}];
        var c = [{t : 'account', cl : 'enterprise_id', v : enterprise_id, z : '='}];

        account_query.e = e;
        account_query.c = c;
       
        var format_account_query = '?' + JSON.stringify(account_query);

        account_select = new Select({
          store: account_select_store, 
          query: format_account_query
        }, "bika-units-budgeting-account");

        account_select.on("setStore", function() { 
          deferred.resolve(this.get('value'));
        });

        account_select.on("change", function(value) {
          console.log("account select change called");
          account_id = value;
          resetModel();
        });

        return deferred.promise;
    }

    ///////
    // Utility Functions
    ///////

    function validateSubmit() { 
      for(var error in cache_change) { 
        for (var i = cache_change[error]["error"].length - 1; i >= 0; i--) {
          if(cache_change[error]["error"][i]) {
            return false;
          }
        };
      }

      return true;
    }

    function formatDate(datestring) { 
      var date = new Date(datestring);
          return months[date.getMonth()] + ' ' + date.getFullYear(); 
    }

  });