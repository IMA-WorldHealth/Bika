require(["dojo/store/Memory", "dojot/store/JsonRest", "dojo/store/Cache", "dijit/form/Select", "dojo/domReady!"], function (Memory, JsonRest, Cache, Select) {

  var rest_store = new JsonRest({target: "data/"});
  var mem_store = new Memory({});
  var store = new Cache(rest_store, mem_store);




});
