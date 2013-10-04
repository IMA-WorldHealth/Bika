define([
	"dojo/_base/declare",
	"dojo/on"
], function(declare, on) { 

	//////
	// module: ApplicationState
	// description: Maintains pointers to top level application components and their attributes (values, events etc.), these values can 
	// then be safely loaded and used by modules nested in the application
	// temporary: What purpose does this serve?
	// -cache value of often accessed componenets - fewer requests to the DOM 
	// -register callbacks for all modules, only one event listener registered
	// -handles removal of callbacks after a module is removed (something we haven't figured out how to do from inside the module yet)
	//////
	
	var component = {};
	var listener = {};

	//Allows capplication track and remove event handles to respond to errors etc. not used otherwise
	var handle = {};

	var setComponent = function(component_id, reference) { 
		component[component_id] = reference;
		handle[component_id] = on(component[component_id], "change", loopCallback(component_id));
		listener[component_id] = {};
	}

	var getComponent = function(component_id) { 
		return component[component_id];
	}

	var register = function(caller_id, component_id, callback) { 
		//good lawd
		listener[component_id][caller_id] = callback;
	}

	//@sfount - raw javascript haX (ref: Javascript Closure)
	var loopCallback = function(component_id) { 
		return function(value) { 
			console.log(listener);
		}
	}

	return declare("customizedModule.ApplicationState", null, { 
		//summary: returns an object to be used by a nested module requiring access to top level application components, this object 
		//should expose read-only access to values
		getComponent : getComponent,
		setComponent : setComponent,
		register : register
	});
});