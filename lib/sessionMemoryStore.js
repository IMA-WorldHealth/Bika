// a generic memory store for auth.js to use to store passwords
// NOTE: If migrating to mulit-core architecture CHANGE THIS.
// This would be incredibly hard to eliminate sessions this way.


function init(options) {
  // API
  // 
  // push [function]
  // @param sessionid : STRING : key to session information
  // @param user      : STRING : user name string
  // @param roleid    : STRING : id of user's role
  // @return true
  //
  // pop [function]
  // @param user : STRING : user name in the database
  // @returns info : OBJECT : information containing session, user, role, and timestamp of login
  //
  // get [function]
  // @param
  //
  // contains [function]
  //
  // free [function]
  //
  // size [function]
  //
  // TOBECONTINUED...

  options = options || {};  // change this to set params

  return function() {

    //---- PRIVATE METHODS -----------------------------------------

    this._storage = [];

    //----- PUBLIC METHODS ------------------------------------------

    this.push = function (sessionid, userid, roleid) {
      var info = {
        session: sessionid,
        userid: userid,
        role: roleid,
        time: new Date().valueOf()
      };
      this._storage.push(info);
      return true;
    };

    this.pop = function (id) {
      var userData = this.get(id, 'session', true);    // pop by user name
      if (userData) {
        this._storage = [].concat(this._storage.slice(0, userData.index), this._storage.slice(userData.index + 1));
        return userData.info;
      }
      return false;
    };

    this.get = function (id, searchProperty, returnPosition) {
      var capture = null;
      var position = null;
      var i = 0;
      var l = this._storage.length;
      for (i; i < l; i++) {
        if (this._storage[i][searchProperty] === id) {
          capture = this._storage[i];
          position = i;
        }
      }
      return returnPosition ? {info: capture, index: position} : capture;
    };
    
    this.contains = function (id, searchProperty) {
      searchProperty = searchProperty || 'sessionid'; // default to sessionid 
      var results = this.get(id, searchProperty);
      return results ? true : false;
    };
    
    this.free = function (space) {
      space = space || this._storage.length;
      this._storage = this._storage.slice(space);
    };
    
    this.size = function () {
      return this._storage.length;
    };
  };
}

module.exports = init;
