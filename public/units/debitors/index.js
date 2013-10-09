require([
  "dojo/_base/declare",
  "dojo/store/Memory",
  "dojo/store/JsonRest",
  "dojo/store/Cache",
  "dijit/layout/TabContainer",
  "dijit/form/Select",
  "dojox/layout/ContentPane",
  "dgrid/OnDemandGrid",
  "dgrid/Selection",
  "dgrid/extensions/DijitRegistry",
  "bika/ApplicationState",
  "dojo/domReady!"],
  function (declare, Memory, JsonRest, Cache, TabContainer,
    Select, ContentPane, OnDemandGrid, Selection, DijitRegistry, AppState) {

  // Debitor Organisation Config page 
  // TODO:
  //   
  //
  //

  // import application-level variables
  var app = new AppState();

  var tc = new TabContainer({}, "bika-units-debitors-tabcontainer");

  tc.addChild(new ContentPane({
      title  : "General",
      href   : "units/debitors/forms/general.html",
  }));

  tc.addChild(new ContentPane({
      title  : "Invoicing",
      href   : "units/debitors/forms/invoicing.html",
  }));

  tc.addChild(new ContentPane({
    title  : "Note",
    href   : "units/debitors/forms/note.html",
  }));

  var columns = [
      {id : 'id'          , field   : 'id'          , label   : 'Org. ID'},
      {id : 'name'        , field   : 'name'        , label   : 'Name'},
      {id : 'account_number', field : 'account_number', label : 'Account'},
      {id : 'address_1'   , field   : 'address_1'   , label   : 'Address'},
      {id : 'address_2'   , field   : 'address_2'   , label   : 'Address'},
      {id : 'location_id' , field   : 'location_id' , label   : 'Location ID'},
      {id : 'payment_id'  , field   : 'payment_id'  , label   : "Payment Id"},
      {id : 'phone'       , field   : 'phone'       , label   : 'Telephone'},
      {id : 'email'       , field   : 'email'       , label   : "Email"},
      {id : 'locked'      , field   : 'locked'      , label   : 'Locked'}
  ];

  var esval = app.getValue("enterprise-select");

  var query = {
    e: [
      {t: 'organisation', c: ['id', 'name', 'account_number', 'address_1', 'address_2', 'location_id', 'payment_id', 'email', 'phone', 'locked']},
      {t: 'location', c: ['city', 'region'] },
      {t: 'payment', c: ['text']}
    ],
    jc: [
      {ts: ['organisation', 'location'], c: ['location_id', 'id'], l: 'AND'},
      {ts: ['organisation', 'payment'], c: ['payment_id', 'id'], l: 'AND'}
    ],
    c: [
      {t: 'organisation', cl: 'enterprise_id', z: '=', v: esval}
    ]
  };

  var store = new Cache(new JsonRest({
    target   : '/data/',
    getLabel : function (data) {
      return data.id;
    }
  }), new Memory());

  var grid = new (declare([OnDemandGrid, DijitRegistry, Selection]))({
      store   : store,
      query   : '?' + JSON.stringify(query),
      columns : columns
  }, 'bika-units-debitors-grid');

  // suppress sorting
  grid.on("dgrid-sort", function (evt) {
    evt.preventDefault();
  });

  grid.on("dgrid-select", function(evt) {
    var rows = evt.rows;
    refreshtabcontainer(rows);
  });

  grid.startup();
  tc.startup();

  function refreshtabcontainer(rows) {
        if (rows.length > 1) { return true; } // don't change for multi-row selects
    var activeforms = tc.getChildren().filter(function(tab) { return tab.isLoaded; });
    var griddata = rows.pop().data;
    storedata = store.get(griddata.id);
    activeforms.forEach(function(tab) {
      // set this here to prevet asynchronous errors.
      // besides, it should fire after you set a row.
      tab.addFormCallback(function(evt) {
        console.log(tab.getFormValues());
      });
      // Ad-hock API:
      //    expect each form to impliment a getParent() method that assigns
      //    refreshform(rows) to the content pane that refreshs the contents
      //    of each form.
      tab.refreshForm(storedata);
    });
  }
  
});
