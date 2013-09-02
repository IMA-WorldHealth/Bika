// server.js
var dbFace = require('./lib/database/dbFace');
var queryHandler = require('./lib/database/myQueryHandler');
var path = require('path');
var url = require('url');
var express = require('express')
  , app = express();

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

app.post('/login', function (req, res) {
	buidJSON(req.body);
	console.log(req.body);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/data', function (req, res) {
	 var cb = function (err, ans) {
      if (err) {
        throw err;
      } else {
        res.setHeader('Content-Range', '0-0/' + ans.length);
        res.json(ans);
      }
    };
 var myRequest = decodeURIComponent(url.parse(req.url).query); 
 var jsRequest = JSON.parse(myRequest);
 var Qo = queryHandler.getQueryObj(jsRequest);
 console.log('la requette a executee est :', Qo);
	//df.selectionner(Qo, cb);
	res.send();
});

app.get('/tree', function(req, res) {
  console.log(req.query);
  var parsed = url.parse(req.url);
  var parent = qs.parse(parsed.query).parent;
  req.session.roleid = 0;
  var tableaurole = [];
  var tableaublanche = [];
  // Voici le chemin de la base de données
  console.log(req.session.identification);
  var sqlrole = "SELECT user_role.id, user_role.id_role_unit, role_unit.id_role, role_unit.id_unit, unit.hasChildren, unit.parent FROM user_role JOIN role_unit ON role_unit.id = user_role.id_role_unit JOIN unit ON unit.id = role_unit.id_unit WHERE user_role.id_user = " + req.session.identification;

  var racineRoot = -1;
  var b = 0;
  var tables;
  var roleuser;
  var nbrerole = 0;
  var nbrebranche = 0;
  dbModule.gridb(sqlrole, function(err, ans) {
    if (err) {
      throw err;
    }
    if (ans.length > 0) {
      for (b = 0; b < ans.length; b++) {
        roleuser = ans[b];
        /******************************************************************/
        // Ici on verifier le UNIT possede des enfants et a comme parent //
        // L'Element ROOT                                               //
        /***************************************************************/
        if ((roleuser.hasChildren === 1) && (roleuser.parent === 0)) {
          tableaurole[nbrerole] = roleuser.id_role;
          nbrerole++;
        } else {
          tableaublanche[nbrebranche] = roleuser.id_unit;
          nbrebranche++;
        }
        /******************************************************************/
        // On verifie si l'utilisateur a le role de super user           //
        // Dans ce cas racineRoot est affecté à ZERO                    //
        /***************************************************************/
        if (tableaurole[b] === 0) {
          racineRoot = 0;
        }
      }
      tableaurole = "" + tableaurole;
      tableaublanche = "" + tableaublanche;
      var location = req.url;
      var location = "" + location;
      var taille = location.length;
      var x = req.url.indexOf("id");
      var y = req.url.indexOf("parent");
      var egl = req.url.indexOf("=");
      var egl = egl + 1;
      // La variable colonne c'est le ID de l'element que vous avez cliquer     
      var colonne = location.substring(egl, taille);
      if (x !== -1) {
        tables = "id";
      }
      if (y !== -1) {
        tables = "parent";
      }
      /******************************************************************/
      // Pour l'appelle de la racine ROOT pour le super user           //
      /***************************************************************/
      if ((tables == "id") && (colonne == 0) && (racineRoot == 0)) {
        var q = "SELECT * FROM unit WHERE " + tables + " = ' " + colonne + " ' ";
      }
      /******************************************************************/
      // Pour l'appelle de la racine ROOT pour les autres user        //
      /***************************************************************/
      if ((tables == "id") && (colonne == 0) && (racineRoot != 0)) {
        var q = "SELECT * FROM unit WHERE " + tables + " = ' " + colonne + " ' ";
      }
      /******************************************************************/
      //           Pour les utilisateurs qui ne sont pas super User    //
      /***************************************************************/
      if ((tables == "parent") && (racineRoot != 0)) {

        if (colonne != racineRoot) { // Si la valeur cliquer est different racineRoot soit (-1) 
          if (colonne == 0) { // Si la colonne est egale à ZERO On Recherche les roles de l'utilisateur
            console.log("COLONNE EST EGALE A ZERO " + colonne);
            var q = "SELECT * FROM unit WHERE " + tables + " = ' " + colonne + " ' AND id IN ( " + tableaurole + " ) ";
            console.log(q);
          }
          if (colonne != 0) { // Si la colonne est different de ZERO on recherche alors le sous elements qui lui sont assignés
            var q = "SELECT * FROM unit WHERE " + tables + " = ' " + colonne + " ' AND id IN ( " + tableaublanche + " ) ";
            console.log("LA COLONNE EST DIFFERENT DE ZERO0++++++++++++++++++++++++ ");
            console.log(q);
            console.log("____________________________________________" + tableaublanche);
          }
        }
      } // Accès à tous les elements de l'Arbre
      if ((tables == "parent") && (racineRoot == 0)) {
        //console.log("RACINE ROOT ________________");
        var q = "SELECT * FROM unit WHERE " + tables + " = ' " + colonne + " ' ";
      }

      dbModule.gridb(q, function(err, ans) {
        if (err) {
          throw err;
        }
        console.log(ans);
        res.json(ans);
      });
      console.log('Message Sent Star');
    }
  });
});


// using main.html until dedrick and I sync our repositories
app.get('/public/main.html', function (req, res, next) {
  res.sendfile('./public/main.html')
});

app.listen(3000, console.log(app.get('env'), "Rapid Prototype listening on port 3000"));
