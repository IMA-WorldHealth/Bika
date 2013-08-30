// server.js
var dbFace = require('./lib/database/dbFace');
var queryHandler = require('./lib/database/myQueryHandler');
var path = require('path');
var url = require('url');
var express = require('express')
  , app = express();

app.set('env', 'dbface'); // Change this to change application behavior

app.configure('dbface', function () {
  app.use(express.bodyParser());
});

app.configure('login', function () {
  app.use(express.bodyParser());
  var auth = require('./lib/auth');
  app.use(auth);
});

app.post('/login', function (req, res) {
	buidJSON(req.body);
	console.log(req.body);


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

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, console.log("Rapid Prototype listening on port 3000"));