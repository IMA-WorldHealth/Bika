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
  "dojo/domReady!"],
  function (declare, Memory, JsonRest, Cache, TabContainer,
    Select, ContentPane, OnDemandGrid, Selection) {

  var tc = new TabContainer({}, "bika-units-debitors-tabcontainer");

  var gen = new ContentPane({
      title  : "General",
      id     : "bika-units-debitors-forms-general",
      href   : "units/debitors/forms/general.html",
  });

  var fac = new ContentPane({
      title  : "La facturation",
      id     : "bika-units-debitors-forms-facturation",
      href   : "units/debitors/forms/facturation.html",
  });

  var note = new ContentPane({
    title  : "Note",
    id     : "bika-units-debitors-forms-note",
    href   : "units/debitors/forms/note.html",
  });

  var text = new ContentPane({
    title  : "Text",
    id     : "bika-units-debitors-forms-text",
    href   : "units/debitors/forms/text.html",
  });
  
  tc.addChild(gen);
  tc.addChild(fac);
  tc.addChild(note);
  tc.addChild(text);

  var columns = [
      {id : 'id'        , field : 'id'       , label  : 'Debitor'} ,
      {id : 'name'      , field : 'name'     , label  : 'Name'},
      {id : 'address_1' , field : 'address_1', label  : 'Address'},
      {id : 'address_2' , field : 'address_2', label  : 'Address'},
      {id : 'group_id'  , field : 'group_id' , label  : 'Group'}, // make a select there
      {id : 'city'      , field : 'city'     , label  : 'City'},
      {id : 'country'   , field : 'country'  , label  : 'Country'},
      {id : 'phone'     , field : 'phone'    , label  : 'Telephone'}
  ];

  var grid_query = {
    e: [{t: 'debitor', c: ['id', 'name', 'address_1', 'address_2', 'group_id', 'phone']}]
  };

  var grid_rest_store = new JsonRest({
    target   : '/data/',
    getLabel : function (data) {
      return data.id;
    }
  });

  var grid_memory_store = new Memory();

  var grid_store = new Cache(grid_rest_store, grid_memory_store);

  var grid = new (declare([OnDemandGrid, Selection]))({
      store   : grid_store,
      query   : '?' + JSON.stringify(grid_query),
      columns : columns
  }, 'bika-units-debitors-grid');

  grid.startup();
  tc.startup();
});
