require(["bika/ApplicationState", "dgrid/OnDemandGrid", "dgrid/Selection", "dojo/store/JsonRest", "dojo/store/Cache", "dojo/store/Memory", "dojo/_base/declare", "dojo/domReady!"], function(ApplicationState, Grid, Selection, JsonRest, Cache, Memory, declare) {

  var apps = new ApplicationState();
  var enterprise_id = apps.getValue('enterprise-select');
  var fiscal_year_id = apps.getValue('fiscal-select');

  var columns = [
    {id: 'id', field: 'id', label: 'id'},
    {id: 'fiscal_year_txt', field: 'fiscal_year_txt', label: 'Fiscal Year'},
  ];

  var query = { 
    e : [{t : 'fiscal_year', c : ['id', 'fiscal_year_txt']}],
    c : [{t : 'fiscal_year', cl : 'enterprise_id', v : enterprise_id, z : '='}]
  };

  var grid_store = new Cache(new JsonRest({ 
    target: '/data/'
  }), new Memory());

  var grid = new (declare([Grid, Selection]))({ 
    store: grid_store,
    query: '?' + JSON.stringify(query),
    columns: columns
  }, 'bika-units-fiscalyear-grid');

  grid.on("dgrid-select", function(evt) {
    var rows = evt.rows;
    console.log(rows);
  });

});
