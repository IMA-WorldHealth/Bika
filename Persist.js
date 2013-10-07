/*
 * Persist API
 *  Methods:
 *    get(id, options)            --> Returns the associated object if it exists
 *    put(id, object, options)    --> Add a new object to sessionStorage
 *    remove(id, options)         --> Remove an object identified by it's id.
 *    update(id, object, options) --> Update an object in the sessionStorage
*/

function Persist(options) {
  options = options || {};
  this._storage = sessionStorage;
  if (!this._storage) throw new ReferenceError("sessionStorage is not supported in your browser");

  this.exits = true; // If sessionStorage exists, this flag will be true

  // Add flag to clear the sessionStorage on startup
  if (options.clearStorage) this._storage.clear();

  // Add flag to specify unique identity property
  // NOTE: idProperty MUST be unique
  this.idProperty = options.idProperty || "id";
}

// 'options' object is added here for compatibility with
// dojo's JsonRestStore.
Persist.prototype.get = function(id, options) {
  // Get something from sessionStorage
  options = options || {};
  var raw = this._storage.getItem(id);
  return this._deserialize(raw);
};

// A naive implimentation of putting objects in sessionStorage
// NOTE: Objects must be serializable using JSON.stringify()
Persist.prototype.put  = function (id, object, options) {
  // Put something into sessionStorage
  options = options || {};
  var exists = this.get(id);
  if (exists && options.strict) throw new Error("Object already exists");
  this._storage.setItem(id, this._serialize(object));
  return true;
};

Persist.prototype.update = function (id, data, options) {
  // Update an object in the session store identified 
  // by it's id.
  options = options || {};
  var obj = this.get(id);
  if (!obj) throw new ReferenceError('Object does not exist in sessionStorage');
  this._storage.removeItem(id);
  this._storage.put(id, object, options);
  return true;
};

Persist.prototype.remove = function(id, options) {
  // Remove an object from the session store, identified
  // by it's id.
  options = options || {};
  this.sessionStorage.removeItem(id);
  return true;
};

Persist.prototype.clear = function() {
  this._storage.clear();
};

// Pass in an object and returns a serial representation
// (a string) of the object using JSON.stringify()
Persist.prototype._serialize = function (obj) {
  var serial = JSON.stringify(obj);
  return serial;
};

// Pass in a string (representing an object) and returns
// the parsed object
Persist.prototype._deserialize = function (s) {
  var deserial = JSON.parse(s);
  return deserial;
};
