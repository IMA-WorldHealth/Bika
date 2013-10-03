require([
  "dojo/store/Memory",
  "dijit/form/Select",
  "dojo/store/JsonRest",
  "dojo/domReady!"
  ], function (Memory, Select, JsonRest) {

  // the prefix used for ids in this module
  var unitprefix = "bika-units-debitors-forms-general-";

  var groupID = new Select({
    name: "groupid",
  }, prefix + "debitor");
  
  var country = new Select({
    name: "country",
    store: country_store,
  }, prefix + "country");
  
  var city = new Select({
    name: "city",
    store: cityStore,
  }, prefix + "city");
}); 
