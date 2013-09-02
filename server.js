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
app.use(express.static(path.join(__dirname, 'public')));

app.get('/data/:table', function (req, res) {
	 var cb = function (err, ans) {
      if (err) {
        throw err;
      } else {

      if ('transaction' == req.params.table) res.setHeader('Content-Range', '0-0/' + ans.length);
        res.json(ans);
      }
    };
  var myRequest = decodeURIComponent(url.parse(req.url).query);
  var jsRequest;  
  try{
    jsRequest = JSON.parse(myRequest);
  }catch(e){
    jsRequest = JSON.parse(JSON.stringify(myRequest));
  }
  var Qo = queryHandler.getQueryObj(jsRequest);
  dbFace.selectionner(Qo, cb);
});

app.listen(3000, console.log(app.get('env'), "Rapid Prototype listening on port 3000"));
