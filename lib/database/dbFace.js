/*
Ce module retouche a pour role d'interagir avec les bases des donnees.
On trouvera ici trois grandes fonctionnalites a savoir :
1. le pretraitement (Sanitize)
2. la gestion d'erreur (Error Handling)
3. Interfaces de manipulation des bases des donnees  (A generic interface for all database actions)
*/

//pour l'instant, on travail avec MYSQL

var SGBD = 'MYSQL';

var db;
var con;


//var postgresInit = null; // Ca n'existe pas pour maintenant
//var redisInit = null;    // ''

var postgresInit = function () {
  db = require('pg');
};

var codes = {
  100: "table doesn't exist",
  101: "field doesn't exist",
  102: "database doesn't exist",
  103: "query is empty",
  104: "this key doesn't exist in the table",
  105: "file already exists",
  106: "bad field separator"
};

var mysqlInit = function () {
  db = require('mysql');
  var connectConfig = {};
  connectConfig.host = 'localhost';  // le meme nom pour chaque base de donnees
  connectConfig.user = 'bika';
  connectConfig.password = 'HISCongo2013';
  connectConfig.database = 'bika';
  con = db.createConnection(connectConfig);
  con.connect();
  return con;  // c'est pas necessaire pour mysql de retourne cette variable, mais peut-etre ca va necessaire pour autre base des donnees
};

var supportedDatabases = {MYSQL: mysqlInit, postgres: postgresInit};
con = supportedDatabases[SGBD](); //on a l'objet connection
// what does this do?


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
de la chaine de requette
@param table : STRING : la table target
@param rows : TABLEAU : les donnees a inserer sous format json
*/
buildINSStatement = function (table, rows) {
  var statement = 'INSERT INTO ';
  //desinfection du nom de la table
  table = desinfecter(table);
  statement += table+' ';
  //desinfection des lignes
  var vals;
  var keys = [];
  var groups = [];
  rows.forEach(function (row) {
    vals = [];
    for (var key in row) {
      if (keys.indexOf(key) === -1) {keys.push(key); }  // cree un tableau pour cle unique
      var valeur = traiterQuotes(row[key]);
      valeur = "'"+valeur+"'";
      vals.push(valeur);
    };
    // cree une insert
    groups.push(combine(vals));
  });

  statement += combine(keys) + ' VALUES ';
  statement += groups.join(',') + ';';
  return statement;
};

/*Cette methode execute l'instruction sql recue
@param q : STRING : l'instruction sql
@param cb: FUNCTION : fonction de callback
*/
doStatement = function (q, cb) {
  con.query(q, function (err, res) {
      if (err) cb(err, null);
      cb(null, res);
  });
};

/*
Cette methode joue le role d'interfacage entre le
serveur web et notre module de gestion des bases des donnees
en ce qui concerne la modification des donnees
Donc elle est visible par l'exterieur.
@param data : la donnee a modifier sous format json
@param table : la table concernee
*/

exports.modifier = function(table, data, cb) {
  //construction statement
  console.log('voici c kon a comme entree edans dbface', data);
  var statement = buildUPDStatement(table, data);
  // execution de la requette
  doStatement(statement, cb);
}

/*Cette fonction est chargee de la construction 
de la chaine de requette
@param table : STRING : la table target
@param rows : TABLEAU : les donnees a modifier sous format json
*/
buildUPDStatement = function (table, data) {
  //traitement pour le update
  var statement = 'UPDATE ', colAndVal = '', separateur = ', ', prop = '', propValue = '', affectation = '=';
  //desinfection de la table
  var table = desinfecter(table);
  //desinfection des lignes 
  for(var keyId in data.rows) {
    prop = keyId;
    propValue = data.rows[keyId];

    for(var keyInfo in data.updateInfo) {
      var value = data.updateInfo[keyInfo];
      if(typeof value == 'string') {
      value = traiterQuotes(value);
      }
      colAndVal+=keyInfo+affectation+"'"+value+"'"+separateur;
    }
    colAndVal = ' SET '+colAndVal.substring(0, colAndVal.length-2);
  }     
  //construction et execution de la requette
  var requette = statement+table+colAndVal+' WHERE '+prop+affectation+"'"+propValue+"';";
  return requette;
}

/*
Cette methode joue le role d'interfacage entre le
serveur web et notre module de gestion des bases des donnees
en ce qui concerne la selection des donnees
Donc elle est visible par l'exterieur.
@param data : encapsule les infos necessaires pour la selection
 sous format json
@param callback : la fonction de callback
*/

exports.selectionner = function(data,cb) {
  //construction statement
  var statement = buildSELStatement(data);
  // execution de la requette
  doStatement(statement, cb);
}


buildSELStatement = function (data) {
  //traitement pour la selection
  var ordre = 'SELECT ', entities='', colonnes='', tables='', JConditions='', Conditions='';
  for (var item in data) {
    if(item == 'entities') {
      data[item].forEach (function (prop) {
        tables+=desinfecter(prop['t'])+',';
        var motif = desinfecter(prop['t'])+'.';
        colonnes+=souder(prop['c'], motif, ',');
      });
      tables = tables.substring(0, tables.length-1);
      colonnes = colonnes.substring(0, colonnes.length-1);
    }else if (item == 'jcond') {
      data[item].forEach (function (jcond) {
        JConditions+=jcond['ts'][0]+'.'+jcond['c'][0]+' = '+ jcond['ts'][1]+'.'+jcond['c'][1];
        (jcond['l']==undefined)? JConditions: JConditions+=' '+jcond['l']+' ';
      });     
    }else if(item == 'cond') {
      data[item].forEach (function (cond) {
        Conditions+=cond['t']+'.'+cond['cl']+' '+cond['z']+' \''+cond['v']+'\'';
        (cond['l']==undefined)? Conditions: Conditions+=' '+cond['l']+' ';
      });     
    }

  }
  requette =ordre+colonnes+' FROM '+tables;
  (JConditions || Conditions)? requette+=' WHERE '+JConditions+Conditions+';' : requette+=';';
  console.log(requette);
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
//
//
// 
// 


//exports.deleter = function(data, next) {  // old code
exports.deleter = function (table, ids, next) {

  // When we try to make this as general as possible, perhaps
  // it would behoove us to write down something like
  // mysqldb.delete() that would formulate this.  For example,
  // delAction = {mysql: mysqldb.delete(table, rowid, callback), 
  //              pg: pgdb.delete(table, rowid, callback)};
  // delAction[db](table,rowid,function(){..});
  // ... one day ...

  statement = 'DELETE FROM';

  //desinfection de la table
  var table = desinfecter(table).trim();
  statement += ' ' + table + ' WHERE ';

  var joiner = ' IN ';
  var ander = ' AND ';

  for (var prop in ids) { 
    if (ids[prop] && ids.hasOwnProperty(prop) && ids.propertyIsEnumerable(prop)) {

      var i = 0;
      ids[prop].forEach(function(item){
        typeof item === 'string'? ids[prop][i] = "'"+item+"'":ids[prop][i];
        i++;
      });

      var vals = combine(ids[prop]);
      statement += prop + joiner + vals + ander;
    }
  }

  // Pulls off the extra AND put on above.
  statement = statement.substring(0, statement.lastIndexOf(ander));
  statement += ';'; 
  console.log(statement);

  con.query(statement, function (err) {
    if (err) throw err;
    return statement;
  });
}

//******************************************************
//****** FONCTIONS UTILITAIRES***************
//******************************************************


/*
Cette fonction s'occupe de la suppression des espaces
dans une chaine des caracteres, resout les problemes lies
aux accents.
@param chaine: la chaine a traiter.
*/

desinfecter = function (chaine) {
  chaine = chaine.replace(new RegExp("\\s", 'g'),"");
  chaine = chaine.replace(new RegExp("[àáâãäå]", 'g'),"a");
  chaine =chaine.replace(new RegExp("æ", 'g'),"ae");
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

/*
Cette fonction s'occupe de la resolution des 
problemes lies aux apostrophes.
@param data: la donnee a traiter.
*/

traiterQuotes = function(data){
  if(typeof data === 'string')
  data = data.replace(new RegExp("'", 'g'),"\\'");
  return data;
}

/*
Cette fonction s'occupe de la suppression des espaces
dans un tableau des chaines des caracteres, resout les problemes lies
aux accents.
@param []chaine: le tableau des chaines a traiter.
*/

traiterChaines = function(chaines) {
  for(i=0; i<chaines.length; i++) {
    chaines[i] = desinfecter(chaines[i]);
  }
return chaines;
}

/*
Cette methode transforme un tableau des chaines de caractere
en une chaine separee par un element passe en parametre
@param chaines : tableau qui represente la chaine
@param sep : separateur
*/

toChaine = function (chaines, sep) {
  var chaine = '';

  for(i=0; i<chaines.length; i++) { 
    chaine+=chaines[i]+sep;
  }
  if (sep != '') {
    chaine = chaine.substring(0, chaine.length-(sep.length));
  } 

  return chaine;
};

/*
Cette methode transforme un tableau des chaines de caractere
en une chaine avec un motif au debut et  separee par un element
 passe en parametre
@param chaines : tableau qui represente la chaine
@param motif   : chaine des caracteres a souder
@param sep : separateur
*/


souder = function (chaines, motif, sep) {
  var chaine = '';

  for(i=0; i<chaines.length; i++) { 
    chaine+=motif+chaines[i]+sep;
  }
  return chaine;
};

toChaine2 = function (arr, sep) {
  var chaine = arr.toString();
  chaine.replace(',', sep);
}


/*
Cette methode transformer un tableau dans une chaine
avec braces.
@param values : TABLEAU 

EX:
  combine(['id', 'nom', 'location'])
  ==> '(id, nom, location)'
*/
var combine = function (values) {
  return '(' + values.join(',') + ')';
};






/**********************************
CETTE ZONE EST RESERVEE AUX TESTS
***********************************/


exports.runAllTest = function (options) {
  var options = options || {};
  var numFailures = 0;
  var failures = [];
  var sommaire = '';
  var executionInfo = {};
  var rep = testBuildINSStatement(); //test de la methode testbuildINSStatement
  if (rep) {
    //numFailures+= rep.num;
    sommaire+=rep.methode+': nombre fautes :'+rep.num;
    failures.push(rep.failures);
  }
  if(options.print == true) {
    console.log(sommaire+'\n');
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

testBuildINSStatement = function () {
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
    msg+='\n'+' attendue: '+expected+ '\n'+' , recue: '+res;
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
    msg+=' attendue: '+expected+' ,recue: '+res;
    num++;
    failures.push(msg);
  }
  return {num:num, failures:failures, methode:methode};
};

testDoStatement = function (cb) {
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

