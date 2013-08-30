// server.js
var dbFace = require('./lib/database/dbFace');
var queryHandler = require('./lib/database/myQueryHandler');
var path = require('path');
var url = require('url');
var express = require('express')
  , app = express();

app.set('env', 'dbface'); // Change this to change application behavior

app.configure('dbface', function () {
  app.use(express.cookieParser());
  app.use(express.session({secret: 'open blowfish'}));
  app.use(express.bodyParser());
  var auth = require('./lib/auth');
  app.use(auth);
});

app.get('/data', function (req, res) {
	 var cb = function (err, ans) {
      if (err) {
        throw err;
      } else {
        res.setHeader('Content-Range', '0-0/' + ans.length);
        res.json(ans);
      }
    };
 var myRequest = decodeURIComponent(url.parse(req.url).query); 
 var jsRequest = JSON.parse(myRequest);
 var Qo = queryHandler.getQueryObj(jsRequest);
 console.log('la requette a executee est :', Qo);
	//df.selectionner(Qo, cb);
	res.send();
});

// using main.html until dedrick and I sync our repositories
app.get('/public/main.html', function (req, res, next) {
  res.sendfile('./public/main.html')
});

app.listen(3000, console.log(app.get('env'), "Rapid Prototype listening on port 3000"));
