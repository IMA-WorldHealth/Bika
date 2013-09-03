// Another comment, for testing
// A comment, added by jonathan for testing
// server.js
var dbFace = require('./lib/database/dbFace');
var queryHandler = require('./lib/database/myQueryHandler');
var path = require('path');
var url = require('url');
var express = require('express')
  , app = express();

app.set('env', 'dbface'); // Change this to change application behavior

// To speed up development, I am moving auth to "production environment"
app.configure('dbface', function () {
  app.use(express.bodyParser());
  app.use(express.static('public')); // Change this when employing authentification
});

app.configure('production', function () {
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: 'open blowfish'}));
  var auth = require('./lib/auth');
  app.use(auth);
  app.use(express.static('public'));
});

app.get('/data', function (req, res) {
  var cb = function (err, ans) {
    if (err) {
      throw err;
    } else {
      res.setHeader('Content-Range', '0-0/' + ans.length);
      console.log('ans', ans);
      res.json(ans);
    }
  };
  var myRequest = decodeURIComponent(url.parse(req.url).query); 
  var jsRequest = JSON.parse(myRequest);
  var Qo = queryHandler.getQueryObj(jsRequest);
  console.log('la requette a executee est :', Qo);
  dbFace.selectionner(Qo, cb);
});

app.listen(3000, console.log('Environment:', app.get('env'), "Rapid Prototype listening on port 3000"));
