// server.js

var express = require('express')
  , app = express();

app.set('env', 'development'); // Change this to change application behavior

app.configure('development', function () {
  app.use(express.bodyParser());
});

app.configure('login', function () {
  app.use(express.bodyParser());
  var auth = require('./lib/auth');
  app.use(auth);
});

app.use(express.static('static'));

app.listen(3000, console.log("Rapid Prototype listening on port 3000"));