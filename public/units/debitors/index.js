var tc;
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

  // import application-level variables
  var app = new AppState();

  tc = new TabContainer({}, "bika-units-debitors-tabcontainer");

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

  tc.addChild(new ContentPane({
    title  : "Text",
    href   : "units/debitors/forms/text.html",
  }));

  var columns = [
      {id : 'id'        , field : 'id'       , label : 'Debitor'} ,
      {id : 'name'      , field : 'name'     , label : 'Name'},
      {id : 'address_1' , field : 'address_1', label : 'Address'},
      {id : 'address_2' , field : 'address_2', label : 'Address'},
      {id : 'group_id'  , field : 'group_id' , label : 'Group'},
      {id : 'city'      , field : 'city'     , label : 'City'},
      {id : 'country'   , field : 'country'  , label : 'Country'},
      {id : 'phone'     , field : 'phone'    , label : 'Telephone'}
  ];

  var esval = app.getValue("enterprise-select");

  var query = {
    e: [{t: 'debitor', c: ['id', 'name', 'address_1', 'address_2', 'group_id', 'location_id', 'email', 'phone', 'max_credit', 'interest', 'price_group_id']}],
    c: [{t: 'debitor', cl: 'enterprise_id', z: '=', v: esval}]
  };

  var grid_rest_store = new JsonRest({
    target   : '/data/',
    getLabel : function (data) {
      return data.id;
    }
  });

  var store = new Cache(grid_rest_store, new Memory());

  var grid = new (declare([OnDemandGrid, DijitRegistry, Selection]))({
      store   : store,
      query   : '?' + JSON.stringify(query),
      columns : columns
  }, 'bika-units-debitors-grid');

  app.setComponent("units-debitors-grid", grid);
  //app.setComponent("units-debitors-store", store);

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
    var activeforms = tc.getChildren().filter(function(tab) { return tab.isLoaded; });
    activeforms.forEach(function(tab) {
      // Ad-hock API:
      //    expect each form to impliment a getParent() method that assigns
      //    refreshform(rows) to the content pane that refreshs the contents
      //    of each form.
      tab.refreshform(rows);
    });
  }
});
