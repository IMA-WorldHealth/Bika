// auth.js

// 401 HTTP code is unauthorised.
// See: http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
// TODO: impliment more informative error codes
var url = require('url'),
    db = require('./database/db')({config: {user: 'bika', database: 'bikaDedrick', host: 'localhost', password: 'HISCongo2013'}});

var users = {};

function logUserIn(id, username, password, req, res, next) {
  var dbquery = {
    rows: {'id': id},
    updateInfo: {'logged_in': 1}
  };

  var composed_query = db.update('user', dbquery);

  db.execute(composed_query, function (err, results) {
    if (err) { next(err); }
    req.session.chemins = new Array();
    req.session.logged_in = true;  // maybe this is too asynchronous
    req.session.user_id = id;
    users[req.session.id] = [id, username, password];    
    //augmentation auth.js
    var rigth_request = {'entities':[
                                      {t:'unit', c:['url']},
                                      {t:'permission', c:['id']},
                                      {t:'user', c:['id']}
                                    ], 
                         'jcond':[
                                   {ts:['permission', 'user'], c:['id_user', 'id'], l:'AND'},
                                   {ts:['permission','unit'], c:['id_unit', 'id'], l:'AND'}
                                 ],
                         'cond':[       
                                   {t:'user', cl:'id', z:'=', v:req.session.user_id}
                                ]
                        };    
    var composed_query = db.select(rigth_request);
    db.execute(composed_query, function(err, results){
      if(err){
        next(err);
      }
      var taille = results.length;
      if(taille>0){
        for(var i = 0; i<taille; i++){
          req.session.chemins.push(results[i].url);
        }
        res.redirect('/');
    return;
      }
    });
    
  });
}


var auth = function (req, res, next) {
  if (req.session.logged_in && req.url !== '/logout') {
    if (req.url === '/login.html' || req.url === '/login') {
      res.redirect('/');
      return;
    }else{
      checkPermission(req, res, next);

    }
   
  }

  if (req.url === "/login") {
    var u = req.body.username;
    var p = req.body.password;
    var dbquery = {
      'entities': [{t: 'user', c: ['id', 'logged_in']}],      
      'cond': [
        {t: 'user', cl: 'username', 'z': '=', v: u, l: 'AND'},
        {t: 'user', cl: 'password', 'z': '=', v: p}
      ]
    };
    var composed_query = db.select(dbquery);
    db.execute(composed_query, function (err, results) {
      if (err) { next(err); }
      if (results.length > 0) {
        (results[0].logged_in > 0) ? next(new Error('User already logged In')) : logUserIn(results[0].id, u, p, req, res, next);
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

  if (!req.session.logged_in && req.url !== '/login') {
    res.redirect('/login.html');
    return;
  }

  if (req.url === '/logout') {
    var userpass = users[req.session.id];
    var dbquery = {
      rows: {'id': userpass[0]},
      updateInfo: {'logged_in': 0}
    };
    var composed_query = db.update('user', dbquery);
    db.execute(composed_query, function (err, results) {
      if (err) { next(err); }  // NOTE: make a middleware that throws errors for us
      users[req.session.id] = null;
      req.session.destroy();
      res.redirect('/');
      return;
    });
  }

  //augmentation de auth.js
 /* if(req.session.logged_in && req.url !== '/login' && req.url !== "/login.html" && req.url !== "/logout"){
    //console.log(req.session);
    //console.log('contenue dans la session, le tab est : ', req.session);
    
  }*/
};

var checkPermission = function (req,res,next){
  var chemin = url.parse(req.url).path;
  //test sur le chemin predefini
  if(chemin.match(new RegExp("/js/dojoos/"))){
    console.log("bonjour!");

    }
  for(var i=0; i<req.session.chemins.length; i++){
    //var chaine = new RegExp("[cor]","g");
    var chaine = new RegExp(req.session.chemins[i],"g");
    
    
  }
   next();
}

module.exports = auth;
