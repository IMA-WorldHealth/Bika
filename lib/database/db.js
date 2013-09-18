/*
 * Ce module retouche a pour role d'interagir avec les bases des donnees.
* On trouvera ici trois grandes fonctionnalites a savoir :
* 1. le pretraitement (Sanitize)
* 2. la gestion d'erreur (Error Handling)
* 3. Interfaces de manipulation des bases des donnees  (A generic interface for all database actions)
*/

// PRIVATE METHODS

function mysqlInit(config) {
  var connectConfig, db, con; //FIXME: Look up connection pooling in MySQL.
  if (config) connectConfig = config;
  db = require('mysql');
  con = db.createConnection(connectConfig);
  con.connect();
  return con;  // c'est pas necessaire pour mysql de retourne cette variable, mais peut-etre ca va necessaire pour autre base des donnees
}


// TODO: impliment PostgreSQL support
function postgresInit(config) {
  db = require('pg');
  return true;
}

// TODO: impliment Firebird support
function firebirdInit(config) {
  db = require('node-firebird');
  return true;
}

// TODO: impliment sqlite support
function sqliteInit(config) {
  db = require('sqlite3');
  return true;
}

// UTILS

// Works because NaN !== NaN
function isInt(n) {
  if (Math.floor(n) === Number(n)) return true;
  return false;
}

// Simple Escape
function escape_id(v) {
  return "`" + v + "`";
}

function escape_str(v) {
  return "'" + v + "'";
}


/* [fr]
 * Cette methode transformer un tableau dans une chaine
 * avec braces.
 * @param values : TABLEAU
 * EX:
 * tuplify(['id', 'nom', 'location'])
 *  ==> '(id, nom, location)'
 */
function tuplify(values) {
  return '(' + values.join(', ') + ')';
}

/* [fr]
 * Cette methode transforme un tableau des chaines de caractere
 * en une chaine avec un motif au debut et  separee par un element
 *  passe en parametre
 * @param chaines : tableau qui represente la chaine
 * @param motif   : chaine des caracteres a souder
 * @param sep : separateur
*/

function souder(chaines, motif, sep) {
  var chaine = '', i = 0, l = chaines.length;
  for(i; i < l; i++) { 
    chaine += motif + escape_id(chaines[i]) + sep;
  }
  return chaine;
}

/* [fr]
 * Cette fonction s'occupe de la suppression des espaces
 * dans une chaine des caracteres, resout les problemes lies
 * aux accents.
 * @param chaine: la chaine a traiter.
*/

function desinfecter(chaine) {
  chaine = chaine.replace(new RegExp("\\s", 'g'),"");
  chaine = chaine.replace(new RegExp("[àáâãäå]", 'g'),"a");
  chaine = chaine.replace(new RegExp("æ", 'g'),"ae");
  chaine = chaine.replace(new RegExp("ç", 'g'),"c");
  chaine = chaine.replace(new RegExp("[èéêë]", 'g'),"e");
  chaine = chaine.replace(new RegExp("[ìíîï]", 'g'),"i");
  chaine = chaine.replace(new RegExp("ñ", 'g'),"n");                            
  chaine = chaine.replace(new RegExp("[òóôõö]", 'g'),"o");
  chaine = chaine.replace(new RegExp("œ", 'g'),"oe");
  chaine = chaine.replace(new RegExp("[ùúûü]", 'g'),"u");
  chaine = chaine.replace(new RegExp("[ýÿ]", 'g'),"y");
  chaine = chaine.replace(new RegExp("\\W", 'g'),"");
  return chaine;
}

// main db module

function db(options) {
  var supported_databases, con, config;
  options = options || {};

  // Select the system's database with this variable.
  sgbd = options.sgbd || 'mysql';

  // All supported dabases and their initialization
  supported_databases = {
    mysql    : mysqlInit,
    postgres : postgresInit,
    firebird : firebirdInit,
    sqlite   : sqliteInit
  };

  // load external configuration if it exists.
  // Else, default to this configuration
  var default_config = {
    host     : 'localhost',
    user     : 'bika',
    password : 'HISCongo2013',
    database : 'bika'
  };
  config = options.config || default_config;

  // The database connection for all data interactions
  // FIXME: researdh connection pooling in MySQL
  con = supported_databases[sgbd](default_config); //on a l'objet connection

  return {
    // return all supported databases
    getSupportedDatabases : function() {
      return Object.keys(supported_databases);
    },


    update: function(table, data) {
      var statement = 'UPDATE ', colAndVal = '', separateur = ', ', 
           prop, propValue, affectation = '=', row_id, keyInfo,
           value, requette;

      table = escape_id(table);

      for (row_id in data.rows) {
        propValue = data.rows[row_id];
        for(keyInfo in data.updateInfo) {
          value = data.updateInfo[keyInfo];
          if (!isInt(value)){
            value = escape_str(value);
          }
          colAndVal += escape_id(keyInfo) + affectation + value + separateur;
        }
        colAndVal = ' SET ' + colAndVal.substring(0, colAndVal.length - 2);
      }
      if (data.rows[row_id].length && data.rows[row_id].length > 1) { // FIXME: AUGH REFERENCES
        affectation = " IN ";
        propValue = tuplify(propValue);
      }
      requette = statement + table + colAndVal + ' WHERE ' + escape_id(row_id) + affectation + propValue + ";";
      return requette;
    },

    execute: function(sql, callback) {
      return con.query(sql, callback);
    },

    delete: function(table, ids) {
      var statement = 'DELETE FROM ', joiner = ' IN ',
            ander = ' AND ';
      var id, in_block;

      table = escape_id(table);
      statement += table + ' WHERE ';

      function escapeNonInts(i) { return isInt(i) ? i : escape_str(i); }
    
      for (id in ids) { 
        if (ids[id] && ids.hasOwnProperty(id) && ids.propertyIsEnumerable(id)) {
          in_block = tuplify(ids[id].map(escapeNonInts)); // escapes non-ints, reassembles
          statement += escape_id(id) + joiner + in_block + ander;
        }
      }
      statement = statement.substring(0, statement.lastIndexOf(ander)) + ';';
      return statement;
    },

    insert: function (table, rows) {
      var statement = 'INSERT INTO ', vals,
          keys = [], groups = [];
      
      table = escape_id(table);
      statement += table+' ';

      rows.forEach(function (row) {
        var key;
        vals = [];
        for (key in row) {
          if (keys.indexOf(key) < 0) { keys.push(key); }  // cree un tableau pour cle unique
          insert_value = (typeof row[key] === 'string') ? escape_str(row[key]) : row[key];
          vals.push(insert_value);
        }
        groups.push(tuplify(vals));
      });
    
      statement += tuplify(keys) + ' VALUES ';
      statement += groups.join(', ').trim() + ';';
      return statement;
    },

    select: function (data) {
      var ordre = 'SELECT ', entities = '', colonnes = '', 
            tables = '', jconditions='', conditions = '', orderby = '';
      var item, motif, requette, map;
  
      for (item in data) {  // FIXME: Decompile into a map {xcond: fx(), ycond: fy()}
        if (item === 'entities') {
          data[item].forEach(function (prop) {
            tables += escape_id(prop.t)+', '; 
            motif = escape_id(prop.t)+'.';
            colonnes += souder(prop.c, motif, ', ');
          });
          tables = tables.substring(0, tables.length-2);
          colonnes = colonnes.substring(0, colonnes.length-2); // strip off last ', '
        } else if (item === 'jcond') {
          data[item].forEach (function (jcond) {
            jconditions+= escape_id(jcond['ts'][0])+'.'+escape_id(jcond['c'][0])+' = '+ escape_id(jcond['ts'][1])+'.'+escape_id(jcond['c'][1]);
            if (jcond.l) { jconditions += ' ' + jcond.l + ' '; }
          });     
        } else if (item === 'cond') {
          data[item].forEach (function (cond) {
            if (cond.z === 'IN') {
              conditions += escape_id(cond.t) + '.' + escape_id(cond.cl) + ' ' + cond.z + ' ' + cond.v + '';
            } else {
              cond.v = (isInt(cond.v)) ? cond.v : escape_str(cond.v);
              conditions += escape_id(cond.t) + '.' + escape_id(cond.cl) + ' ' + cond.z + ' ' + cond.v + ' '; 
            }
            if (cond.l) conditions += cond.l + " "; 
          });
        } else if (item === 'orderby') {
          orderby += ' ORDER BY ';
          var dir;
          data[item].forEach(function(o) {
            dir = (o.v.trim() === '+') ? ' ASC ' : ' DESC ';
            orderby += escape_id(o.t) + '.' + escape_id(o.cl) + ' ' + dir;
          });
        }
      }
      requette = ordre + colonnes + ' FROM ' + tables;
      requette += (jconditions || conditions) ? ' WHERE ' + jconditions + conditions : "" ;
      return requette.trim() + orderby + ";";
    }
  };
}

module.exports = db;
