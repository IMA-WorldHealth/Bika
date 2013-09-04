// server.js

var express = require('express')
  , dbFace = require('./lib/database/dbFace')
  , queryHandler = require('./lib/database/myQueryHandler')
  , url = require('url')
  , qs = require('querystring')
  , app = express();

app.set('env', 'production'); // Change this to change application behavior

// To speed up development, I am moving auth to "production environment"
app.configure('dbface', function () {
  app.use(express.bodyParser());
  app.use(express.static('public')); // Change this when employing authentification
});

app.configure('production', function () {
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: 'open blowfish'}));
  var auth = require('./lib/auth');
  app.use(auth);
  app.use(express.static('public'));
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
  res.send();
});

app.get('/reflect', function (req, res) {
  res.json(req.session);
  console.log(req.session.user_id);
});

app.get('/tree', function(req, res) {
  var myRequest = decodeURIComponent(url.parse(req.url).query);
  var jsRequest = JSON.parse(myRequest);
  var Qo = queryHandler.getQueryObj(jsRequest);
  var parsed = url.parse(req.url);
  var parent = qs.parse(parsed.query).parent;
  req.session.roleid = 0;
  var tableaurole = [];
  var tableaublanche = [];
  // Voici le chemin de la base de données
  var jsonQuery = {
    'entities' : [{
      t: 'user_role',
      c: ['id', 'id_role_unit']
    },
    {
      t: 'role_unit',
      c: ['id_role', 'id_unit']
    },
    {
      t: 'unit',
      c: ['hasChildren', 'parent']
    }],
    'jcond' : [{
      ts: ['role_unit', 'user_role'],
      c: ['id', 'id_role_unit'],
      l: 'AND' 
    },
    {
      ts: ['unit', 'role_unit'],
      c: ['id', 'id_unit'],
      l: 'AND'
    }],
    'cond' : [{
      t: 'user_role',
      cl: 'id_user',
      z: '=',
      v: req.session.user_id
    }]
  };
  var racineRoot = -1;
  var b = 0;
  var tables;
  var roleuser;
  var nbrerole = 0;
  var nbrebranche = 0;
  dbFace.selectionner(jsonQuery, function (err, ans) {
    if (err) {
      throw err;
    }
    if (ans.length > 0) {
      for (b; b < ans.length; b++) {
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
      tableaurole = tableaurole.join(',');
      tableaublanche = tableaublanche.join(',');
      colonne = Qo.cond[0].v;
      tables =  Qo.cond[0].cl;

      /******************************************************************/
      // Pour l'appelle de la racine ROOT pour le super user           //
      /***************************************************************/
      if ((tables == "id") && (colonne == 0) && (racineRoot == 0)) {
        var q = "SELECT * FROM unit WHERE " + tables + " = ' " + colonne + " ' ";
        q = {
          'entities' : [{
            t: 'unit',
            c: ['id', 'name', 'desc', 'parent', 'hasChildren', 'url']
          }],
          'cond' : [{
            t: 'unit',
            cl: tables,
            z: '=',
            v: colonne
          }]
        };
      }
      /******************************************************************/
      // Pour l'appelle de la racine ROOT pour les autres user        //
      /***************************************************************/
      if ((tables == "id") && (colonne == 0) && (racineRoot != 0)) {
        var q = "SELECT * FROM unit WHERE " + tables + " = ' " + colonne + " ' ";
        q = {
          'entities' : [{
            t: 'unit',
            c: ['id', 'name', 'desc', 'parent', 'hasChildren', 'url']
          }],
          'cond' : [{
            t: 'unit',
            cl: tables,
            z: '=',
            v: colonne
          }]
        };
      }
      /******************************************************************/
      //           Pour les utilisateurs qui ne sont pas super User    //
      /***************************************************************/
      if ((tables == "parent") && (racineRoot != 0)) {

        if (colonne != racineRoot) { // Si la valeur cliquer est different racineRoot soit (-1) 
          if (colonne == 0) { // Si la colonne est egale à ZERO On Recherche les roles de l'utilisateur
            var q = "SELECT * FROM unit WHERE " + tables + " = ' " + colonne + " ' AND id IN ( " + tableaurole + " ) ";
            q = {
              'entities' : [{
                t: 'unit',
                c: ['id', 'name', 'desc', 'parent', 'hasChildren', 'url']
              }],
              'cond' : [{
                t: 'unit',
                cl: tables,
                z: '=',
                v: colonne,
                l: 'AND'
              },
              {
                t: 'unit',
                cl: 'id',
                z: 'IN',
                v: "(" + tableaurole + ")"
              }]
            };
          }
          if (colonne != 0) { // Si la colonne est different de ZERO on recherche alors le sous elements qui lui sont assignés
            var q = "SELECT * FROM unit WHERE " + tables + " = ' " + colonne + " ' AND id IN ( " + tableaublanche + " ) ";
            q = {
              'entities' : [{
                t: 'unit',
                c: ['id', 'name', 'desc', 'parent', 'hasChildren', 'url']
              }],
              'cond' : [{
                t: 'unit',
                cl: tables,
                z: '=',
                v: colonne,
                l: 'AND'
              },
              {
                t: 'unit',
                cl: 'id',
                z: 'IN',
                v: "(" + tableaublanche + ")"
              }]
            };
          }
        }
      } // Accès à tous les elements de l'Arbre
      if ((tables == "parent") && (racineRoot == 0)) {
        var q = "SELECT * FROM unit WHERE " + tables + " = ' " + colonne + " ' ";
        q = {
          'entities' : [{
            t: 'unit',
            c: ['id', 'name', 'desc', 'parent', 'hasChildren', 'url']
          }],
          'cond' : [{
            t: 'unit',
            cl: tables,
            z: '=',
            v: colonne,
          }]
        };
      }
      dbFace.selectionner(q, function(err, ans) {
        if (err) {
          throw err;
        }
        res.send(ans);

      });
    }
  });
});

app.listen(3000, console.log('Environment:', app.get('env'), "Rapid Prototype listening on port 3000"));
