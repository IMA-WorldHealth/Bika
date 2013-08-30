// temp_mysql.js

var mysql = require('mysql');

var config = {
  user: 'bika',
  password: 'HISCongo2013',
  host: 'localhost',
  database: 'bika'
};

var con = mysql.createConnection(config);

con.connect(function (err) {
  if (err) {
    throw err;
  }
});

var query = function (sql, data, callback) {
  return con.query(sql, data, callback);
};

exports.query = query;