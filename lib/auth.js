// auth.js

// 401 HTTP code is unauthorised.
// See: http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html

var db = require('./database/dbface');

var users = {};

function logUserIn(id, username, password, req, res, next) {
  var dbquery = {
    rows: {'id': id},
    updateInfo: {'loggedIn': 1}
  };
  db.modifier('user', dbquery, function (err, results) {
    if (err) { next(err); }
    req.session.loggedIn = true;  // maybe this is too asynchronous
    users[req.session.id] = [id, username, password];
    res.redirect('/public/main.html');
    return;
  });
}


var auth = function (req, res, next) {
  console.log(req.session.loggedIn);
  if (req.session.loggedIn) {
    if (req.url === '/login.html' || req.url === '/login') {
      res.redirect('/public/main.html');
      return;
    }
    next();
  }

  if (req.url === "/login") {
    var u = req.body.username;
    var p = req.body.password;
    var dbquery = {
      'entities': [{t: 'user', c: ['id', 'loggedIn']}],
      'cond': [
        {t: 'user', cl: 'username', 'z': '=', v: u, l: 'AND'},
        {t: 'user', cl: 'password', 'z': '=', v: p}
      ]
    };
    db.selectionner(dbquery, function (err, results) {
      if (err) { next(err); }
      if (results.length > 0) {
        (results[0].loggedIn > 0) ? next(new Error('User already logged In')) : logUserIn(results[0].id, u, p, req, res, next);
      } else {
        res.redirect('/login.html');
      }
      return;
    });
  }

  if (req.url === "/login.html") {
    res.sendfile('./public/login.html');
    return;
  }

  if (!req.session.loggedIn && req.url !== '/login') {
    res.redirect('/login.html');
    return;
  }

  if (req.url === '/logout') {
    var userpass = users[req.session.id];
    var dbquery = {
      rows: {'id': userpass[0]},
      updateInfo: {'loggedIn': 0}
    };
    db.modifier('user', dbquery, function (err, results) {
      if (err) { next(err); }  // NOTE: make a middleware that throws errors for us
      req.session.loggedIn = false;
      req.session = null; // Can't remember if this actually works.  Please test.
      console.log('redirecting to /')
      res.redirect('/');
      return;
    });
  }
};

module.exports = auth;