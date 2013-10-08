var form;
require([
  "dojo/store/Memory",
  "dojo/store/JsonRest",
  "dojo/store/Cache",
  "dojo/request",
  "dijit/form/Select",
  "dijit/form/Form",
  "dijit/form/TextBox",
  "dijit/form/CheckBox",
  "dijit/form/Button",
  "bika/ApplicationState",
  "dojo/domReady!"
  ], function (Memory, JsonRest, Cache, request, Select, Form, TextBox, CheckBox, Button, AppState) {

  // the prefix used for ids in this module
  var prefix = "bika-units-debitors-forms-general-";

  // import application variables
  var app = new AppState();

  // the top level form FTW
  form = new Form({}, prefix + "form");

  // debitor select declaration
  var debitor_store = new Cache(new JsonRest({
    target: 'data/',
    getLabel: function(data) { return data.name; }
  }), new Memory());

  var debitor_query = {
    e: [{"t": "debitor", c: ["id", "name"]}],
    c: [
      {"t": "debitor", cl: "id", z: "=", v: 1, l: "AND"},
      {"t": "debitor", cl: "enterprise_id", z: "=", v: app.getValue("enterprise-select")}
    ]
  };
  
  var debitor_select = new Select({
    store: debitor_store,
    query: "?" + JSON.stringify(debitor_query)
  }, prefix + "debitor");

  // generic textboxes
  
  var name =  new TextBox({}, prefix + "name");
  var address_1 = new TextBox({}, prefix + "address_1");
  var address_2 = new TextBox({}, prefix + "address_2");

  // location selects
  // country
  var location_store = new Cache(new JsonRest({
    target: 'data/',
    getLabel: function(data) { return data.city + "-" + data.region; }
  }), new Memory());
  
  var location_query = {
    e: [{t: 'location', c: ['id', 'city', 'region', 'country_code', 'zone', 'village']}]
  };

  // this is temporarily using "region" not "country"
  var country = new Select({
    name: "country",
    store: location_store,
    query: "?" + JSON.stringify(location_query)
  }, prefix + "country");

  // city
  var city = new Select({
    name: "city",
    store: location_store,
    query: "?" + JSON.stringify(location_query)
  }, prefix + "city");

  // generic Textbox
  var att = new TextBox({}, prefix + "att");

  // locked checkbox 
  var locked = new CheckBox({}, prefix + "locked");

  // totals button
  var totals = new Button({}, prefix + "totals");

  // generic textboxes
  var group_id = new TextBox({}, prefix + "group_id");
  var email = new TextBox({}, prefix + "email");
  var phone = new TextBox({}, prefix + "phone");
  
  var container = form.getParent();

  function refreshform(rows) {
    // this row should expose the 
    console.log(row);
    console.log(location_store);
  }

  container.set('refreshform', refreshform);

}); 
