// server.js
var express = require('express')
  , db = require('./lib/database/db')({config: {user: 'bika', database: 'bika', host: 'localhost', password: 'HISCongo2013'}})
  , queryHandler = require('./lib/database/myQueryHandler')
  , url = require('url')
  , qs = require('querystring')
  , path = require('path')
  , auth = require('./lib/auth')
  , error = require('./lib/error/404.js')
  , um = require('./lib/util/userManager')
  , app = express();

app.set('env', 'production'); // Change this to change application behavior

app.configure('production', function () {
  app.use(express.bodyParser()); // FIXME: Can we do better than body parser?  There seems to be /tmp file overflow risk.
  app.use(express.cookieParser());
  app.use(express.session({secret: 'open blowfish', cookie: {httpOnly: false}}));
  app.use(auth);
  app.use(express.static('public'));
  app.use(app.router);
  app.use(error);
});

app.get('/data/', function (req, res) {
  var cb = function (err, ans) {
    if (err) throw err;
    //res.setHeader('Content-Range', '0-0/' + ans.length);
    res.json(ans);
  };
  var myRequest = decodeURIComponent(url.parse(req.url).query);
  var jsRequest;  
  try{
    jsRequest = JSON.parse(myRequest);
  }catch(e){
    jsRequest = JSON.parse(JSON.stringify(myRequest));
  }  
  var Qo = queryHandler.getQueryObj(jsRequest);  
  if(!Qo.action){
    var sql = db.select(Qo);
  db.execute(sql, cb);
  }else{
    var sql = db.delete(Qo.table, Qo.ids); //en attendant une meilleure solution
    console.log(sql);
    var cbDEL = function (err, ans) {
    if (err) throw err;
    res.send("succes!");
  }
    db.execute(sql, cbDEL);
  }
  
});

//dojo store forces an ID to be passed with a PUT request, the server must match this pattern, even if the db.js API doesn't require it
app.put('/data/:id', function(req, res) { 
  var updatesql = db.update(req.body.t, req.body.data, req.body.pk);
  db.execute(updatesql, function(err, ans) { 
    if(err) throw err;
    res.send("success!");
  });
});

app.post('/data/', function (req, res) {
  
  var cb = function (err, ans) {
    if (err) throw err;
    res.send("succes!;");
  };

  var insertsql = db.insert(req.body.t, req.body.data);
  db.execute(insertsql, cb);
});

app.get('/tree', function(req, res) {
um.manageUser(req, res);
});

app.listen(3000, console.log('Environment:', app.get('env'), "Rapid Prototype listening on port 3000"));
