// server.js
var dbFace = require('./lib/database/dbFace');
var queryHandler = require('./lib/database/myQueryHandler');
var path = require('path');
var url = require('url');
var express = require('express'), app = express();

app.set('env', 'dbface'); // Change this to change application behavior

app.configure('dbface', function () {
  app.use(express.bodyParser());
});

app.configure('jonathan', function () {
  app.use(express.cookieParser());
  app.use(express.session({secret: 'open blowfish'}));
  app.use(express.bodyParser());
  var auth = require('./lib/auth');
  app.use(auth);
});

<<<<<<< HEAD
app.get('/data/:table', function (req, res) {
  var cb = function (err, ans) {
=======
app.post('/login', function (req, res) {
	buidJSON(req.body);
	console.log(req.body);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/data', function (req, res) {
	 var cb = function (err, ans) {
>>>>>>> 303ba628db487a7cbec80476c8956bf7dc6af571
      if (err) {
        throw err;
      } else {
       // res.setHeader('Content-Range', '0-0/' + ans.length);
        res.json(ans);
      }
    };
  var myRequest = decodeURIComponent(url.parse(req.url).query);
  var jsRequest = JSON.parse(myRequest);
  var Qo = queryHandler.getQueryObj(jsRequest);
  dbFace.selectionner(Qo, cb);
});
<<<<<<< HEAD
app.use(express.static(path.join(__dirname, 'public')));
=======

// using main.html until dedrick and I sync our repositories
app.get('/public/main.html', function (req, res, next) {
  res.sendfile('./public/main.html')
});
>>>>>>> 303ba628db487a7cbec80476c8956bf7dc6af571

app.listen(3000, console.log(app.get('env'), "Rapid Prototype listening on port 3000"));
