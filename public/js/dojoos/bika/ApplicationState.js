define("bika/ApplicationState", [
  "dojo/_base/declare",
  "dojo/on"
], function(declare, on) { 

  //////
  // module: ApplicationState
  // summary: 
  //  Maintains pointers to top level application components and their attributes (values, events etc.), these values can 
  //  then be safely loaded and used by modules nested in the application
  //  
  //  A module registering a callback with ApplicationState (register) should use bika-unit-unitname as the caller_id, this ID
  //  is the URL to the resources and uniquely identifies a unit
  // 
  // TODO: 
  // -Doesn't currently support multiple event types - I'm not losing any sleep over it
  // 
  // temporary: What purpose does this serve?
  // -cache value of often accessed componenets - fewer requests to the DOM 
  // -register callbacks for all modules, only one event listener registered
  // -handles removal of callbacks after a module is removed (something we haven't figured out how to do from inside the module yet)
  // -write formal API for ApplicationState (rename: ApplicationService?)
  //
  // PROPOSAL:
  //    Change ApplicationState to return a simple JSON object so the `new` constructor does not
  //    have to be invoked each time.  Since there are no instance variables, it doesn't make
  //    sense to require `new`.
  //////
  
  var component = {};
  var listener = {};

  //Allows application to track and remove event handles to respond to errors etc. not used otherwise
  var handle = {};

  var setComponent = function(component_id, reference) { 
    //summary:
    //  Insert an application level component (reference) to be accessed by nested modules, components change event details will
    //  be forwarded to all modules that register for the component_id
    component[component_id] = reference;
    handle[component_id] = on(component[component_id], "change", loopCallback(component_id));
    listener[component_id] = {};
  };

  var getComponent = function(component_id) { 
    //summary: 
    //  returns a reference to any application level component
    //  [this method should be redundant once all methods are implemented]
    return component[component_id];
  };

  var getValue = function(component_id) { 
    //summary: 
    //  returns an application level component's value
    return component[component_id].get('value');
  };

  var register = function(caller_id, component_id, callback) { 
    //summary: 
    //  Register a callback to be fired on a given component (component_id) change event, this will keep a reference to the caller so that
    //  the callback can be removed given original callers destruction
    var r = listener[component_id][caller_id];
    if(!r) { 
      listener[component_id][caller_id] = callback;
    }
    // PROPOSED CHANGE:
    // summary:
    //    Extend the above code to be able to register multiple callbacks. For example:
    //  
    // var r = (listener[component_id][caller_id] || listener[component_id][caller_id] = []);
    // // r is now an array
    // r.push(callback);
    //
    //  When a caller is destroyed, it would be responsible for cleaning up all its callbacks
    //  by setting listenery[component_id][caller_id] = null.
  };

  var unregister = function(caller_id) { 
    //summary: 
    //  Unregister all callbacks for a specific caller (module)
    //  [at the moment this is called from TabManager, who requests this event on the onClose method of a modules ContentPane, this method
    //  could be called from the module itself if it has access to it's own destructor (or an equivalent)]
    //TODO: make this search faster, currently iterates through a LOT of elements
    for(var comp in listener) { 
      for(var unit in listener[comp]) { 
        if(unit == caller_id) { //Would like to find a better way of checking this
          delete listener[comp][unit]; // NOTE: This means we will garbage collet.  What about listener[comp][unit] = null; ?
        }
      }
    }
  };

  //Utility functions
  //@sfount - raw javascript haX (ref: Javascript Closure)
  var loopCallback = function(component_id) { 
    //summary: 
    //  responds to component change event, recieves a component_id to route callback, and returns function to be fired by event
    return function(value) { 
      for(var caller in listener[component_id]) { 
        listener[component_id][caller](value);
      }
    };
  };

  return declare("bika.ApplicationState", null, { 
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
