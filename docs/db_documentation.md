DB.js DOCUMENTATION
====================


This module's role is to be a generic interface to several kinds of databases.


### A generic interface for all database activities

db.js's API consists of six functions:

- Select 
- Insert
- Update
- Delete
- Execute
- getSupportedDatabases

#### Initialization

In order to keep db.js modular, db.js returns a constructor which may optionally take in an `options` object.  Currenctly supported options are

```javascript
options = {
  sgbd   : 'mysql',         // toggle database selection ['mysql', 'postgres',
                            // 'sqlite', 'firebird'].
  config : {                // Configure specific database connection
    host     : 'localhost', // parameters; dependent on selected database.
    database : 'bika'
  }
};
```

To initialize a new db.js instance, simply require it and use it.

```javascript
var db_interface = require("./path/to/db.js")
    , db = db_interface({sgbd : 'mysql'});

// you can now use db.method();
```

Or, in more compact notation:

```javascript
var db = require('./path/to/db.js')({sgbd: 'mysql'});

// you can now use db.method();
```

The variable db is now supports all five functions of db.js.

#### Select 
db.js works on javascript objects of a certain syntax, transforming them into SQL queries. db.js 
performs automatic escaping of characters, allowing the data to be raw from the client.

The select syntax is:

```javascript
// using 'db' from above
select_object = {
  'entities' : [{
    t : 'account',        // Tell db.js the objects being operated on.
    c : ['id', 'account'] // This is used throughout to create SELECT [..]
  }, {                    // FROM [..] clauses.
    t : 'enterprise',     // Notice multi-table support.
    c : ['id', 'cash_account']
  }],
  'jcond': [{                       // Tell db.js how to do table joins
    ts: ['account', 'enterprise'],  // MUST be between only two tables
    c: ['account', 'cash_account'], // Specify the join columns
    l: 'AND'                        // Required if any other terms options
  }],                               // are supported.
  'cond': [{       // Tell db.js of any other conditions
    t: 'account'.  // Specify the table
    cl: 'id',      // Specify which column (single)
    z: '>',        // Specify the operator (can also be IN)
    v: 2000        // Specify the compared value.
  }]
};

var select_sql = db.select(select_object);  // build the SQL statement
db.execute(select_sql, callback);           // call the database with SQL statement
```

The above should be fairly clear.  For further reference, see `tests/db_tests.jasmine.js`.
The callback function is a generic callback of the form

```javascript
function callback(err, response) { ... }
```

Not all fields are required.  The simplest db.js query is below:

```javascript
var select_obj = {
  'entities' : [{
    t : 'account',
    c : ['id']
  }]
};

var sql = db.select(select_obj) // returns SELECT `account`.`id` FROM `account`;
db.execute(sql);
```
###### Required fields:
* entities: `[{t:'alias',c:['col1, col2,...,coln']}[,...]]`

###### Possible fields:
* jcond: `[{ts:[table1, table2], c:[idcol1, idcol2], l: combination }]`
* cond: `[{t: alias, cl: alias, z: alias, v: alias, [l: alias]} [, ...] ]`
* orderby: [{t: 'table', c: 'column', v: ['+' | '-']}]
* limit: `5`

* ts: specifies tables concerned by the join condition. `eg: jcond:[{ts:['account', 'transaction'],`
* cl: specifies columns concerned by the join condition. `eg: cond:[{t:'account', cl:'id', z:'>', v:'2000',`
* v: value of condition `eg: cond:[{t:'account', cl:'id', z:'>', v:'2000', l:'OR'}`
* c : columns concerned by the join condition `eg: jcond:[{ts:['account', 'transaction'], c:['id', 'accountID'], l:'AND'}]`
* t: table `eg: {entities:[{t:'account',c:['id']}`
* jcond : join conditions
* cond: simple condition (in one table)
    * l: specifies the Combinations:
        * AND condition `eg: jcond:[{ts:['account', 'transaction'], c:['id', 'accountID'], l:'AND'}]`
        * OR condition  `eg: cond:[{t:'account', cl:'id', z:'>', v:'2000', l:'OR'}`
        * IN condition
    * Conditions
        * `<` specifies LESS THAN 
        * `>` specifies GREATER THAN 
        * `=` specifies EQUALITY
        * `<=` specifies LESS THAN OR EQUAL
        * `>=` specifies GREATER THAN OR EQUAL

#### Update

db.js has a very uniform syntax.  For `update`, `delete`, `insert`, the first parameter
is always a table name.  The second is a JSON object.

For update specifically, the third parameter is ~required~ and must is a unique identifier
(or list of unique identifiers) to populate the where condition.

```javascript
var table = 'module';
var row = [
  {id: 1, txt: 'hello world!'},
];
var pk = ["id"];

db.update(table, row, pk); // returns "UPDATE `module` SET `txt` = 'db.js', WHERE `id` = 1;"
```

There is no (safe) current support for multi-row updates, although the above syntax may be leveraged
to allow multirow updates.  

#### Insert

The insert function behaves as one might expect, similar to the update function.  However, 
an array object is recieved as the second parameter.

```javascript
var table = 'example';
var insert_obj = [
  {id:7, nom:'nom1', prenom:'prenom1', adresse:'adresse1', date:'2013-05-16', etat:"li'bre"},
  {id:8, nom:'nom2', prenom:'prenom2', adresse:'adresse2', date:'2013-05-16', etat:"libre"}
];

db.insert(table, insert_obj); // returns "INSERT INTO `example`(id, nom, prenom, adresse, date, etat) VALUES (7,'nom1','prenom1','adresse1','2013-05-16','li'bre'), (8,'nom2','prenom2','adresse2','2013-05-16','libre');"

```

Don't forget to execute with `db.execute()`

#### DELETE

With `table` a string specifying the table concerned by the update operation and `ids` the identifiers of rows concerned; it json's format is:

```javascript
var table = 'example';
var delete_obj = {'id': [1,2,3]};

db.delete(table, delete_obj); // returns "DELETE FROM `example` WHERE `id` IN (1, 2, 3);"
```

You can specify more delete conditons by simply passing more key-value pairs through
the delete_obj.
