define(["dojo/_base/declare", "dojo/dom", "dojo/Stateful", "dojo/dom-construct"], function(declare, dom, Stateful, construct) {
return declare("bika.Select", [Stateful], {
 
  // id : String
  id: "",

  // store : Object
  store: null,

  // emptyNode: Boolean
  emptyNode: false,

  // data: Object 
  data: {},

  // query: String
  query: "",

  // isLoaded: boolean
  isLoaded: false,

  // domNode: HTML DOM element 
  domNode: null, 

  // getLabel: Function 
  getLabel: null,

  constructor: function(args) {
    declare.safeMixin(this, args);
  },

  // get : Function
  // summary:
  //    Returns either this.param or the DOM node's
  //    parameter, or null
  get: function(param) {
    return this[param] || this.domNode[param];
  },

  // setOption: Function
  // summary:
  //    Set the display's "selected" attribute to the
  //    id specified (from the store), if it exists.
  setOption: function(id) {
    var self = this;
    if (!this.isLoaded) {
      // required to circumvent asynchronous loading
      this.watch('isLoaded', function() { self._setOption(id); });
    } else {
      this._setOption(id);
    }
  },

  _setOption: function(id) {
    var options, store = this.store, self = this;
    options = this.domNode.getElementsByTagName('option');
    options = Array.prototype.slice.call(options);
    options.forEach(function(opt) {
      if (opt.getAttribute('id') == self.id + "_" + id) {
        opt.setAttribute('selected', '');
      }
    });

  },

  startup: function() {
    this.domNode = dom.byId(this.id);
    this._copyAttributes();
    this._fillData();
    // FIXME: clean this up
    if (this.class) { this.domNode.setAttribute("class", this.class); }
  },

  // _copyAttributes: Function
  // summary:
  //    Copies HTML attributes into properties of "this".
  // tags: 
  //    private
  _copyAttributes: function() {
    // attributes is a NamedNodeMap
    // To change this into an array, we use Array.prototype.slice.call()
    var attrlist, nodemap;
    attrlist = Array.prototype.slice.call(this.domNode.attributes);
    attrlist.forEach(function(attr) {
      // convert DOM node attributes to properties of this
      this[attr.name] = attr.value;
    });
  },

  // _fillData: Function
  // summary:
  //    Constructs the DOM <option> elements for the select
  _fillData: function() {
    var op, num = 0, store = this.store, query = this.query, self = this;
    if (!store || !query) { throw new Error("Must define both store and query"); } // safety first!
    store.query(query).then(function(data) {
      data.forEach(function(datum) {
        // ensure a unique id for each
        op = construct.create("option", {
          id: self.id + "_" + store.getIdentity(datum),
          innerHTML: self.getLabel(datum),
        });
        construct.place(op, self.domNode);
      });
      if (self.emptyNode) { self._buildEmptyNode(); }
    }).then(function() { self.set('isLoaded', true); });
  },

  _buildEmptyNode: function() {
    var op;
    op = construct.create("option", {
      id: this.id + "_empty",
      innerHTML: "",
    });
    construct.place(op, this.domNode);
    this.setOption("empty");
  }

});

});
