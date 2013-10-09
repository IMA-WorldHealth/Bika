define(["dojo/_base/declare", "dijit/form/Form", "dojo/on", "dojo/query"], function(declare, Form, on, query) {

return declare("bika.Form", [Form], {

  // elements: Array
  elements: [],

  // values: Object 

  constructor: function(args) {
    declare.safeMixin(this, args);
    this.set('elements', query('#' + this.id + ' [name]'));
  },

  // tags: Private
  setValues: function(obj) {
    var elements = this.elements;
    elements.forEach(function(input) {
      switch (input.type) {
        default: 
          // input's names are expected to correspond exactly
          // to the incoming data's keys
          input.value = obj[input.name];
          break;
        case "checkbox":
          input.checked = (obj[input.name] == "on" || obj[input.name] == "1") ? true : false;
          break;
      }
    });
  },

  // tags: Private
  getValues: function() {
    var elements = this.elements, values = {};
    elements.forEach(function(input) {
      values[input.name] = input.value;
    });
    return values;
  },

  addCallback: function(callback, evt) {
    evt = evt || "change";
    this.own(on(this.domNode, evt, callback));
    return;
  }

});

});
