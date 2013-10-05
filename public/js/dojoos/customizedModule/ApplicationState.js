define([
  "dojo/_base/declare",
  "dojo/on"
], function(declare, on) { 

  //////
  // module: ApplicationState
  // description: Maintains pointers to top level application components and their attributes (values, events etc.), these values can 
  // then be safely loaded and used by modules nested in the application
  // 
  // TODO: 
  //  -Doesn't currently support multiple event types - I'm not losing any sleep over it
  // 
  // temporary: What purpose does this serve?
  // -cache value of often accessed componenets - fewer requests to the DOM 
  // -register callbacks for all modules, only one event listener registered
  // -handles removal of callbacks after a module is removed (something we haven't figured out how to do from inside the module yet)
  // -write formal API for ApplicationState (rename: ApplicationService?)
  //////
  
  var component = {};
  var listener = {};

  //Allows application track and remove event handles to respond to errors etc. not used otherwise
  var handle = {};

  var setComponent = function(component_id, reference) { 
    //summary:
    //  Insert an application level component (reference) to be accessed by nested modules, components change event details will
    //  be forwarded to all modules that register for the component_id
    component[component_id] = reference;
    handle[component_id] = on(component[component_id], "change", loopCallback(component_id));
    listener[component_id] = {};
  }

  var getComponent = function(component_id) { 
    //summary: 
    //  returns a reference to any application level component
    //  [this method should be redundant once all methods are implemented]
    return component[component_id];
  }

  var getValue = function(component_id) { 
    //summary: 
    //  returns an application level copmonent's value
    return component[component_id].get('value');
  }

  var register = function(caller_id, component_id, callback) { 
    //summary: 
    //  Register a callback to be fired on a given component (component_id) change event, this will keep a reference to the caller so that
    //  the callback can be removed given original callers destruction
    var r = listener[component_id][caller_id];
    if(!r) { 
      listener[component_id][caller_id] = callback;
    }
  }

  var unregister = function(caller_id) { 
    //summary: 
    //  Unregister all callbacks for a specific caller (module)
    //  [at the moment this is called from TabManager, who requests this event on the onClose method of a modules ContentPane, this method
    //  could be called from the module itself if it has access to it's own destructor (or an equivalent)]
    //TODO: make this search faster, currently iterates through a LOT of elements
    for(comp in listener) { 
      for(unit in listener[comp]) { 
        if(unit==caller_id) { //Would like to find a better way of checking this
          delete listener[comp][unit];
        }
      }
    }
  }

  //Utility functions

  //@sfount - raw javascript haX (ref: Javascript Closure)
  var loopCallback = function(component_id) { 
    //summary: 
    //  responds to component change event, recieves a component_id to route callback, and returns function to be fired by event
    return function(value) { 
      for(caller in listener[component_id]) { 
        listener[component_id][caller](value);
      }
    }
  }

  return declare("customizedModule.ApplicationState", null, { 
    //summary: 
    //  publicly available attributes and methods
    //
    //description: 
    //  returns an object to be used by a nested module requiring access to top level application components, this object 
    //  should expose read-only access to values 
    setComponent : setComponent,
    getValue : getValue,
    register : register,
    unregister: unregister
  });
});