   /*
 * Ce module retouche a pour role d'interagir avec les bases des donnees.
* On trouvera ici trois grandes fonctionnalites a savoir :
* 1. le pretraitement (Sanitize)
* 2. la gestion d'erreur (Error Handling)
* 3. Interfaces de manipulation des bases des donnees  (A generic interface for all database actions)
*/

// PRIVATE METHODS

var SGBD = 'MYSQL';  // GLOBAL: Change this to change databases
var db;
var con;
var supportedDatabases = {MYSQL: mysqlInit, postgres: postgresInit};

function mysqlInit() {
  var connectConfig;
  db = require('mysql');
  connectConfig = {};
  connectConfig.host = 'localhost';  // le meme nom pour chaque base de donnees
  connectConfig.user = 'root';
  connectConfig.password = 'lenovo';
  connectConfig.database = 'bika';
  con = db.createConnection(connectConfig);
  con.connect();
  return con;  // c'est pas necessaire pour mysql de retourne cette variable, mais peut-etre ca va necessaire pour autre base des donnees
};

// TODO: impliment PostgreSQL support
function postgresInit() {
  db = require('pg');
  return true;
};

// TODO: impliment Firebird support
function firebirdInit() {
  db = require('node-firebird');
  return true;
}

// TODO: impliment sqlite support
function sqliteInit() {
  db = require('sqlite3');
  return true;
}

con = supportedDatabases[SGBD](); //on a l'objet connection

/*
 * Cette methode transformer un tableau dans une chaine
 * avec braces.
 * @param values : TABLEAU
 * EX:
 * combine(['id', 'nom', 'location'])
 *  ==> '(id, nom, location)'
 */
function combine(values) {
  return '(' + values.toString() + ')';
}

/* Cette methode execute l'instruction sql recue
 * @param q : STRING : l'instruction sql
 * @param cb: FUNCTION : fonction de callback
 */
function doStatement(q, cb) {
  con.query(q, function (err, res) {
      if (err) cb(err, null);
      cb(null, res);
  });
}

/*
Cette fonction s'occupe de la resolution des 
problemes lies aux apostrophes.
@param data: la donnee a traiter.
*/

function traiterQuotes(data){
  if (typeof data === 'string')
    data = data.replace(new RegExp("'", 'g'),"\\'");
  return data;
}

/*
Cette fonction s'occupe de la suppression des espaces
dans un tableau des chaines des caracteres, resout les problemes lies
aux accents.
@param []chaine: le tableau des chaines a traiter.
*/

function traiterChaines(chaines) {
  for(i=0; i<chaines.length; i++) {
    chaines[i] = desinfecter(chaines[i]);
  }
return chaines;
}

/*
Cette methode transforme un tableau des chaines de caractere
en une chaine avec un motif au debut et  separee par un element
 passe en parametre
@param chaines : tableau qui represente la chaine
@param motif   : chaine des caracteres a souder
@param sep : separateur
*/

function souder(chaines, motif, sep) {
  var chaine = '';

  for(i=0; i<chaines.length; i++) { 
    chaine+=motif+chaines[i]+sep;
  }
  return chaine;
}

/*
Cette fonction s'occupe de la suppression des espaces
dans une chaine des caracteres, resout les problemes lies
aux accents.
@param chaine: la chaine a traiter.
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

// PUBLIC METHODS

/*
Cette methode joue le role d'interfacage entre le
serveur web et notre module de gestion des bases des donnees
en ce qui concerne l'insertion des donnees
Donc elle est visible par l'exterieur.
@param table : STRING : la table target
@param rows : TABLEAU : les donnees a inserer sous format json
@param cb   : FONCTION: fonction de callback pour l'echange entre serveur et dbface

EX:
var rows = [{id:1, nom :'dedrick'},
            {id:2, nom :'carlos'},
            {id:3, nom :'chris'}]
inserer('table1', rows)
  ==> 'INSERT INTO table1(id, nom) VALUES (1,'dedrick'),(2, 'carlos'),(3,'chris');'
*/
exports.inserer = function (table, rows, cb) {
  //construction statement
  var statement = buildINSStatement(table, rows);
  // execution de la requette
  doStatement(statement, cb);
};


/*Cette fonction est chargee de la construction 
 * de la chaine de requette
 * @param table : STRING : la table target
 * @param rows : TABLEAU : les donnees a inserer sous format json
*/
var buildINSStatement = function (table, rows) {
  var statement = 'INSERT INTO ', vals,
      keys = [], groups = [], valeur;
  //desinfection du nom de la table
  table = desinfecter(table);
  statement += table+' ';
  //desinfection des lignes
  rows.forEach(function (row) {
    vals = [];
    var key;
    for (key in row) {
      if (keys.indexOf(key) < 0) {keys.push(key);}  // cree un tableau pour cle unique
      valeur = traiterQuotes(row[key]);
      valeur = "'" + valeur + "'";
      vals.push(valeur);
    }
    // cree une insert
    groups.push(combine(vals));
  });

  statement += combine(keys) + ' VALUES ';
  statement += groups.join(',') + ';';
  return statement;
};




/*
 * Cette methode joue le role d'interfacage entre le
 * serveur web et notre module de gestion des bases des donnees
 * en ce qui concerne la modification des donnees
 * Donc elle est visible par l'exterieur.
 * @param data : la donnee a modifier sous format json
 * @param table : la table concernee
*/

exports.modifier = function(table, data, cb) {
  //construction statement
  var statement = buildUPDStatement(table, data);
  // execution de la requette
  doStatement(statement, cb);
};

/*Cette fonction est chargee de la construction 
 * de la chaine de requette
 * @param table : STRING : la table target
 * @param rows : TABLEAU : les donnees a modifier sous format json
*/
var buildUPDStatement = function (table, data) {
  //traitement pour le update
  var statement = 'UPDATE ', colAndVal = '', 
      separateur = ', ', prop = '', propValue = '',
      affectation = '=';
  var keyId, keyInfo, value, requette;
  //desinfection de la table
  table = desinfecter(table);
  //desinfection des lignes 
  for(keyId in data.rows) {
    prop = keyId;
    propValue = data.rows[keyId];
    for(keyInfo in data.updateInfo) {
      value = data.updateInfo[keyInfo];
      if(typeof value === 'string') {
      value = traiterQuotes(value);
      }
      colAndVal += keyInfo + affectation + "'" + value + "'" + separateur;
    }
    colAndVal = ' SET ' + colAndVal.substring(0, colAndVal.length - 2);
  }     
  //construction et execution de la requette
  requette = statement + table + colAndVal + ' WHERE ' + prop + affectation + "'" + propValue + "';";
  return requette;
};

/*
 * Cette methode joue le role d'interfacage entre le
 * serveur web et notre module de gestion des bases des donnees
 * en ce qui concerne la selection des donnees
 * Donc elle est visible par l'exterieur.
 * @param data : encapsule les infos necessaires pour la selection
 *  sous format json
 * @param callback : la fonction de callback
*/

exports.selectionner = function(data,cb) {
  //construction statement
  var statement = buildSELStatement(data);
  // execution de la requette
  doStatement(statement, cb);
};


var buildSELStatement = function (data) {
  //traitement pour la selection
  var ordre = 'SELECT ', entities = '', colonnes = '', 
        tables = '', JConditions='', Conditions = '';
  var item, motif, requette;
  for (item in data) {
    if(item === 'entities') {
      data[item].forEach(function (prop) {
        tables += desinfecter(prop.t)+',';
        motif = desinfecter(prop.t)+'.';
        colonnes += souder(prop.c, motif, ',');
      });
      tables = tables.substring(0, tables.length-1);
      colonnes = colonnes.substring(0, colonnes.length-1);
    }else if (item === 'jcond') {
      data[item].forEach (function (jcond) {
        JConditions+=jcond['ts'][0]+'.'+jcond['c'][0]+' = '+ jcond['ts'][1]+'.'+jcond['c'][1];
        // (jcond.l === undefined) ? JConditions : JConditions+=' '+jcond['l']+' ';
        if (jcond.l !== undefined) { JConditions += ' ' + jcond.l + ' '; }
      });     
    }else if(item === 'cond') {
      data[item].forEach (function (cond) {
        if (cond.z === 'IN') {
          //Conditions += cond['t']+'.'+cond['cl']+' '+cond['z']+' ' + cond['v'];
          Conditions += cond.t + '.' + cond.cl + ' ' + cond.z + ' ' + cond.v + '';
        } else {
          Conditions += cond.t + '.' + cond.cl + ' ' + cond.z + ' \'' + cond.v + '\'';
        }
        // (cond.l === undefined)? Conditions: Conditions+=' '+cond['l']+' ';
        Conditions += (cond.l === undefined) ? '' : ' ' + cond.l + ' ';
      });
    }

  }
  requette = ordre + colonnes + ' FROM ' + tables;
  //(JConditions || Conditions)? requette+=' WHERE '+JConditions+Conditions+';' : requette+=';';
  requette += (JConditions || Conditions) ? ' WHERE ' + JConditions + Conditions + ';' : ';';
  return requette;
};



// DELETE a row from the database;
// 
// Expects an object of this form:
// var table = 'table1';
// var ids = {'id': [1,2,3],
//            'name': ['jon', 'dedrick'],
//            'ColumnName: [list of possible values]};
// 

exports.deleter = function (table, ids, next) {
  var statement = 'DELETE FROM', joiner = ' IN ',
        ander = ' AND ';
  var prop, i = 0, vals;
  //desinfection de la table
  table = desinfecter(table).trim();
  statement += ' ' + table + ' WHERE ';


  for (prop in ids) { 
    if (ids[prop] && ids.hasOwnProperty(prop) && ids.propertyIsEnumerable(prop)) {
      ids[prop].forEach(function(item){
        typeof item === 'string' ? ids[prop][i] = "'"+item+"'" : ids[prop][i];
        i++;
      });
      vals = combine(ids[prop]);
      statement += prop + joiner + vals + ander;
    }
  }

  // Pulls off the extra AND put on above.
  statement = statement.substring(0, statement.lastIndexOf(ander)) + ';';

  con.query(statement, function (err) {
    if (err) throw err;
    return statement;
  });
};

exports.rawQuery = function(query, callback) { //FIXME: do not ship this in production version
  return mysql.query(query, callback);
};

// TESTS //FIXME: Put this in another file

exports.runAllTest = function (options) {
  var options = options || {};
  var numFailures = 0;
  var failures = [];
  var sommaire = '';
  var executionInfo = {};
  var rep = testBuildINSStatement(); //test de la methode testbuildINSStatement
  if (rep) {
    //numFailures + = rep.num;
    sommaire += rep.methode + ': nombre fautes :' + rep.num;
    failures.push(rep.failures);
  }
  if (options.print) {
    console.log(sommaire + '\n');
    console.log(failures);
  }

  doStatementCallBack = function(executionInfo) {
    if(options.print == true) {
      console.log("Papport execution methode doStatement");
      console.log(executionInfo);
    }
  };

  testDoStatement(doStatementCallBack);
  return 1;
};

var testBuildINSStatement = function () {
  var num = 0;
  var failures = [];  
  //insertion d'une seule ligne
  var table = 'pays';
  var input = [{id:852, name:'Nouveau test'}];
  var expected = 'INSERT INTO pays (id,name) VALUES (\'852\',\'Nouveau test\');';
  var msg = 'Test pour la construction de l\'instruction INSERT pour une ligne';
  var methode = 'test de la methode buildINSStatement';
  var res = buildINSStatement(table, input);
  if (res !== expected) {
    msg+='\n attendue: '+expected+ ' , recue: '+res;
    num++;
    failures.push(msg);
  }

  //insertion avec des cotes
  var table = 'personne';
  var input = [{id:6, nom:'nom1', prenom:'prenom1', adresse:'adresse1', date:'2013-05-16', etat:"li'bre"}];  
  var expected = 'INSERT INTO personne (id,nom,prenom,adresse,date,etat) VALUES (\'6\',\'nom1\',\'prenom1\',\'adresse1\',\'2013-05-16\',\'li\'bre\');';
  var msg = 'Test pour la construction de l\'instruction INSERT pour une ligne avec cotes dans une valeur';
  var res = buildINSStatement(table, input);
  if (res !== expected) {
    msg += '\n' + ' attendue: ' + expected + '\n' + ' , recue: ' + res;
    num++;
    failures.push(msg);
  }

  //insertion de plusieurs lignes
  var table = 'personne';
  var input = [{id:7, nom:'nom1', prenom:'prenom1', adresse:'adresse1', date:'2013-05-16', etat:"li'bre"},
               {id:8, nom:'nom2', prenom:'prenom2', adresse:'adresse2', date:'2013-05-16', etat:"libre"}];  
  var expected = 'INSERT INTO personne (id,nom,prenom,adresse,date,etat) VALUES (\'7\',\'nom1\',\'prenom1\',\'adresse1\',\'2013-05-16\',\'li\'bre\'),(\'8\',\'nom2\',\'prenom2\',\'adresse2\',\'2013-05-16\',\'libre\');';
  var msg = 'Test pour la construction de l\'instruction INSERT pour plusieurs lignes';
  var res = buildINSStatement(table, input);
  if (res !== expected) {
    msg+= ' attendue: ' + expected + ' ,recue: ' + res;
    num++;
    failures.push(msg);
  }
  return {num:num, failures:failures, methode:methode};
};

var testDoStatement = function (cb) {
  var num = 0;
  var fails = [];
  req =  'INSERT INTO pays (id,name) VALUES (\'445\',\'Allo\');';
  msg = 'Echec Operation'+req;
  doStatement(req, function(err, res) {
    if(err){
      num++;
      fails.push(msg);         
    }
    rep = {num:num, failures:fails}; 
    cb(rep);
  });
};

