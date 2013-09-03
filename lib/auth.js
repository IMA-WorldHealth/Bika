// auth.js

// 401 HTTP code is unauthorised.
// See: http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html

var db = require('./temp_mysql');

var users = {};

function logUserIn(user_id, username, password, req, res, next) {
  var sql = "UPDATE user SET loggedIn=1 WHERE username=? AND password=?";
  db.query(sql, [username, password], function (err, results) {
    if (err) { next(err); }
    req.session.user_id = user_id;
    req.session.loggedIn = true;  // maybe this is too asynchronous
    users[req.session.id] = [username, password];
    res.redirect('/tree.html');
    return;
  });
}


var auth = function (req, res, next) {
  if (req.session.loggedIn) {
    if (req.url === '/login.html' || req.url === '/login') {
      res.redirect('/tree.html');
      return;
    }
    next();
  }

  if (req.url === "/login") {
    var u = req.body.username;
    var p = req.body.password;
    var sql = "SELECT id, loggedIn FROM user WHERE username =? AND password=?";
    db.query(sql, [u, p], function (err, results) {
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
    var sql = "UPDATE user SET loggedIn=0 WHERE username=? AND password=?";
    db.query(sql, users[req.session.id], function (err, results) {
      if (err) { next(err); }  // NOTE: make a middleware that throws errors for us
      req.session.destroy();
      return;
    });
    res.redirect('/login.html');
  }
};

module.exports = auth;