// auth.js

var db = require('')

function logUserIn(username, password, next) {
  var sql = "UPDATE user SET loggedIn=1 WHERE id=1";
  dbModule.gridb(sql2, function (err, result) {
    if (err) { next(err); }
    req.session.loggedIn = true;  // maybe this is too asynchronous
  });
}


var auth = function (req, res, next) {
  if (req.session.loggedIn) {
    next();
  }

  if (req.url === "/login") {
    var u = req.body.username;
    var p = req.body.password;
    var sql = "SELECT id, loggedIn FROM user WHERE username = '" + u + "' AND password = '" + p + "' "; // change this to have query escaping
    dbModule.gridb(sql, function (err, results) {
      if (err) { next(err); }
        if (results.length > 0) {
          (ans[0].loggedIn > 0) ? next(new Error('User already logged In')) : logUserIn(u, p, next);
          res.redirect('/index.html');
        } else {
          res.redirect('/login.html');
        }
      });
  }

  if (req.url === "/login.html") {
    res.sendfile('./login.html');
  } else {
    res.redirect('/login.html');
  }
};

exports.auth = auth;