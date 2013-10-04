require([
  "dojo/store/Memory",
  "dojo/store/JsonRest",
  "dojo/store/Cache",
  "dojo/request",
  "dijit/form/Select",
  "dojo/domReady!"
  ], function (Memory, JsonRest, Cache, request, Select) {

  // TODO: Find a better way to reference the
  // change_enterprise dropdown!
  var enterpriseid = dijit.byId('change_enterprise').get('value');

  // TODO: Find a better way to do two-way data binding
  var grid = dijit.byId("bika-units-debitors-grid");
  var store = grid.store;
  // strip off "?" and return json of query
  var query = JSON.parse(grid.query.slice(1));

  // the prefix used for ids in this module
  var prefix = "bika-units-debitors-forms-general-";

  var location_store = new Cache(new JsonRest({
    target: 'data/',
    getLabel: function(data) { return data.city + "-" + data.region; }
  }), new Memory());
  
  var location_query = {
    e: [{t: 'location', c: ['id', 'city', 'region', 'country_code', 'zone', 'village']}]
  };

  var group_store = new Cache(new JsonRest({
    target: 'data/',
    getLabel: function(data) { return data.country; }
  }), new Memory());

  // DO NOT USE.  Group doesn't exist yet in the database
  var group_query = {
    e: [{t: 'group', c: ['id', 'name']}]
  };

  var groupid = new Select({
    name: "groupid",
    //store: group_store
  }, prefix + "debitor");
 
  // this is temporarily using "region" not "country"
  var country = new Select({
    name: "country",
    store: location_store,
    query: "?" + JSON.stringify(location_query)
  }, prefix + "country");
  
  var city = new Select({
    name: "city",
    store: location_store,
    query: "?" + JSON.stringify(location_query)
  }, prefix + "city");

  // widget actions
  //    map a bunch of update actions to each widget in the form
  // to be called on updateFormValues()
  widgetactions = {};
  widgetactions[prefix + "debitor"] = updateDebitor;
  widgetactions[prefix + "country"] = updateCountry;
  widgetactions[prefix + "city"] = updateCity;

  function updateDebitor(row) {
    var select = dijit.byId(prefix + "debitor");
  }

  function updateCountry(row) {
    var select = dijit.byId(prefix + "city");
    return true;
  }

  function updateCity(row) {
    var select = dijit.byId(prefix + "city");
    return true;
  }

  // adds onChange events to all form fields depending on their
  // respective type.
  function initFormFields() {

    function change(evt) {
      var element = evt.currentTarget;
    }

    function keyup(evt) {
      var element = evt.currentTarget;
    }

    for (var i = 0, l = formelements.length; i < l; i++) {
      var e = formelements[i];
      switch (e.type) {
        default: 
          break;
        case "text":
        case "email":
        case "number":
        case "tel":
          e.addEventListener("keyup", keyup, false);
        break;

        case "checkbox":
          e.addEventListener("change", change, false);
          break;
      }
    }

  }

  // loops through all form values and sets the value equal
  // the grid store's value
  function updateFormValues(row) {
    var element;
    for (var i = 0, l = formelements.length; i < l; i++) {
      element = formelements[i];
      if (!(element.getAttribute('readonly'))) element.value = row[element.getAttribute('name')];
    }
    // can I do this in one loop?
    for (var widget in widgetactions) {
      widgetactions[widget](row);
    }
  }
  
  var formelements = document.getElementById(prefix + "form").elements;
  initFormFields();

  // update form elements with 
  grid.on("dgrid-select", function(evt) {
    var rows = evt.rows;
    if (rows.length == 1) {
      // there's only one row
      updateFormValues(rows[0].data);
    }
  });

}); 
