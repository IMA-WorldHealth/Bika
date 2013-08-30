// server.js

var express = require('express')
  , app = express();

app.set('env', 'jonathan'); // Change this to change application behavior

app.configure('dedrick', function () {
  app.use(express.bodyParser());
});

app.configure('jonathan', function () {
  app.use(express.cookieParser());
  app.use(express.session({secret: 'open blowfish'}));
  app.use(express.bodyParser());
  var auth = require('./lib/auth');
  app.use(auth);
});


// using main.html until dedrick and I sync our repositories
app.get('/public/main.html', function (req, res, next) {
  res.sendfile('./public/main.html')
});

app.listen(3000, console.log(app.get('env'), "Rapid Prototype listening on port 3000"));