define([
  "dojo/_base/declare",
  "dojo/on"
], function(declare, on) { 

  //////
  // module: ApplicationState
  // description: Maintains pointers to top level application components and their attributes (values, events etc.), these values can 
  // then be safely loaded and used by modules nested in the application
  // TODO: 
  //  -Doesn't currently support multiple event types - I'm not losing any sleep over it
  // temporary: What purpose does this serve?
  // -cache value of often accessed componenets - fewer requests to the DOM 
  // -register callbacks for all modules, only one event listener registered
  // -handles removal of callbacks after a module is removed (something we haven't figured out how to do from inside the module yet)
  //////
  
  var component = {};
  var listener = {};

  //Allows application track and remove event handles to respond to errors etc. not used otherwise
  var handle = {};

  var setComponent = function(component_id, reference) { 
    component[component_id] = reference;
    handle[component_id] = on(component[component_id], "change", loopCallback(component_id));
    listener[component_id] = {};
  }

  var getComponent = function(component_id) { 
    return component[component_id];
  }

  var getValue = function(component_id) { 
    return component[component_id].get('value');
  }

  var register = function(caller_id, component_id, callback) { 
    var r = listener[component_id][caller_id];
    if(!r) { 
      listener[component_id][caller_id] = callback;
    }
  }

  var unregister = function(caller_id) { 
    
  }

  //@sfount - raw javascript haX (ref: Javascript Closure)
  var loopCallback = function(component_id) { 
    return function(value) { 
      for(caller in listener[component_id]) { 
        listener[component_id][caller](value);
      }
    }
  }

  return declare("customizedModule.ApplicationState", null, { 
    //summary: returns an object to be used by a nested module requiring access to top level application components, this object 
    //should expose read-only access to values
    getComponent : getComponent,
    setComponent : setComponent,
    getValue : getValue,
    register : register
  });
});