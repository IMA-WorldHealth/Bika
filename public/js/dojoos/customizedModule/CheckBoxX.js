define('customizedModule/CheckBoxX', ["dojo/_base/declare", "dojo/on", "dojo/topic", "dijit/form/CheckBox", "dojo/aspect", "dojo/_base/lang"], function (declare, on, topic, CheckBox, aspect, lang) {
  return declare("customizedModule.CheckBoxX", [CheckBox], {

    // SelectX attempts to empower dijit/form/Select with asynchronous loading
    // and with store resets.

    _listeners: [],

    // Detect a change event on a similar SelectX
    // Expects a dijit, type of event, and callback
    // E.g. selectx.detect(selectx2, 'onChange', function(val) {selectx.reset(val)});
    // This function can be very helpful in changing several selects together.
    detect: function (widget, evt, callback) {
      var channel = widget.get('id') + evt;
      var h = topic.subscribe(channel, callback);
      // push this to the event listeners to unsubscribe later
      this._listeners.push(h);
    },

    _emit: function (e) {
      var resultValue = {};
      resultValue.value = this.getValue();
      topic.publish(e, resultValue);
    },

    _emitChange: function () {
      this._emit(this.id + "onChange");
    },

    constructor: function (args) {
      this.inherited(arguments);
      dojo.safeMixin(this, args);
    },

    postCreate: function () {
      this.inherited(arguments);
      this.set('checked', false);
      aspect.after(this, "onChange", lang.hitch(this, "_emitChange"));
    },

    startup: function () {
      this.inherited(arguments);
    }
    // need to impliment unsubscribes to destroy methods
  });
});