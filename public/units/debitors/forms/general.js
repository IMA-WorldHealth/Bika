require([
  "dojo/store/Memory",
  "dijit/form/Select",
  "dojo/store/JsonRest",
  "dojo/domReady!"
  ], function(Memory, Select, JsonRest){
     
  var groupID = new Select({
    id: "groupID",
    name: "groupID",
    onClick:function(){
      this.set('onChange', function(){
        sendData('groupID');
      });
    }
  }, "groupID");
  
  var country = new Select({
    id: "country",
    name: "country",
    store: country_store,
    domClass: "general",
    onClick:function(){
      this.set('onChange', function(){
        sendData('country');
      });
    }
  }, "country");	
  
  var city = new Select({
    id: "city",
    name: "city",
    store: cityStore,
    domClass: "general",
    onClick:function(){
      this.set('onChange', function(){
        sendData('city');
      });
    }
  }, "city");	 
}); 
