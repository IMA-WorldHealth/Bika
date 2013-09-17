// server.js

var express = require('express')
  , dbFace = require('./lib/database/dbFace')
  , queryHandler = require('./lib/database/myQueryHandler')
  , url = require('url')
  , qs = require('querystring')
  , path = require('path')
  , auth = require('./lib/auth')
  , error = require('./lib/error/404.js')
  , app = express();

app.set('env', 'production'); // Change this to change application behavior

app.configure('production', function () {
  app.use(express.bodyParser()); // FIXME: Can we do better than body parser?  There seems to be /tmp file overflow risk.
  app.use(express.cookieParser());
  app.use(express.session({secret: 'open blowfish'}));
  app.use(auth);
  app.use(express.static('public'));
  app.use(app.router);
  app.use(error);
});

app.get('/data/', function (req, res) {
  var cb = function (err, ans) {
    if (err) throw err;
    res.setHeader('Content-Range', '0-0/' + ans.length);
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
  dbFace.selectionner(Qo, cb);
});



app.get('/tree', function(req, res) {
  var myRequest = decodeURIComponent(url.parse(req.url).query);
  var jsRequest = JSON.parse(myRequest);
  var Qo = queryHandler.getQueryObj(jsRequest);
  var parsed = url.parse(req.url);
  var parent = qs.parse(parsed.query).parent;
  req.session.roleid = 0;
  var tableaurole = [];
  var tableauAllrole = [];
  var tableauRight = [];
  var tableauHead = [];
  var tableauHeadLimite = [];
  var tableaurolelimite = [];
  var tableauBranche = [];
  // Voici le chemin de la base de données
  var jsonQuery = {
    'entities' : [{
      t: 'user_role',
      c: ['id', 'id_role', 'allRight']
    },
    {
      t: 'role',
      c: ['role_head']
    }],
    'jcond' : [{
      ts: ['user_role', 'role'],
      c: ['id_role', 'id'],
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
  var nbrerolelimite = 0;
  var nbrebranche = 0;
  var bb = 0;
  colonne = Qo.cond[0].v;
  tables =  Qo.cond[0].cl;
  dbFace.selectionner(jsonQuery, function (err, ans) {
    if (err) {
      throw err;
    }
    if (ans.length > 0) {
      //Comme nodejs fonctionne en mode Asynchrone nous  avons sauvegarder le resultat dans une session
      req.session.reponses = ans; 
      for (b; b < ans.length; b++) {
        roleuser = ans[b];
        // Si l'utilisateur possede le role 1 qui est le role de super user on affecte la valeur racineRoot à 0
        if (roleuser.id_role === 1) {
          racineRoot = 0;

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

          dbFace.selectionner(q, function(err, ans) {
            if (err) {
              throw err;
            }
            res.send(ans);
          });
          break;          
        }
      }
      // Si l'utilisateur n'est pas super user
      if(racineRoot !== 0) {
        var ansuer = req.session.reponses; // on recuper le resultat de la requete dans la variable ansuer
        // Cette fonction permet des recuperer construire la requete
        // ebvera au server
        //var resultat = createTree(colonne, tables, tableauHeadLimiteString, tableauBrancheString);
        function createTree(col,tab,tabHead,tabBran){
          if((col === 0) && (tab === "id")) {
            q = {
              'entities' : [{
                t: 'unit',
                c: ['id', 'name', 'desc', 'parent', 'hasChildren', 'url']
              }],
              'cond' : [{
                t: 'unit',
                cl: tab,
                z: '=',
                v: col
              }]
            };
          
          } else if((col === 0) && (tab === "parent")){
            q = {
              'entities' : [{
                t: 'unit',
                c: ['id', 'name', 'desc', 'parent', 'hasChildren', 'url']
              }],
              'cond' : [{
                t: 'unit',
                cl: tab,
                z: '=',
                v: col,
                l: 'AND'
              },
              {
                t: 'unit',
                cl: 'id',
                z: 'IN',
                v: "(" + tabHead + ")"
              }]
            };
          } else {
            q = {
              'entities' : [{
                t: 'unit',
                c: ['id', 'name', 'desc', 'parent', 'hasChildren', 'url']
              }],
              'cond' : [{
                t: 'unit',
                cl: tab,
                z: '=',
                v: col,
                l: 'AND'
              },
              {
                t: 'unit',
                cl: 'id',
                z: 'IN',
                v: "(" + tabBran + ")"
              }]
            };
          }

          valeur = "COl " + col + " TAB " +tab +" HEAD "+tabHead+ " Branche "+tabBran;
          // return valeur;
          dbFace.selectionner(q, function(err, ans) {
            if (err) {
              throw err;
            }
            res.send(ans);

          });          
        }
        taille = ansuer.length;
        for(bb; bb < taille; bb++) {
          roleuser = ansuer[bb];
          tableauAllrole[bb] = roleuser.role_head; // Dans ce tableau on sauvegarde tous le role de l'utilisateur 
          // ici on recherche les roles pour lesquels il a tous le droits
          if(roleuser.allRight === 1) {
              tableaurole[nbrerole] = roleuser.id_role;
              tableauRight[nbrerole] = roleuser.allRight;
              tableauHead[nbrerole] = roleuser.role_head;
              nbrerole++;
          }

          // ici on recherche les roles pour lesquels il a des droits limités
          if(roleuser.allRight === 0) {
            tableaurolelimite[nbrerolelimite] = roleuser.id_role;
            tableauHeadLimite[nbrerolelimite] = roleuser.role_head;
            nbrerolelimite++;
          }    
        }
        tableauroleString = tableaurole.toString();
        tableauHeadString = tableauHead.toString();
        // on preleve la taille des chacunes des tableaux des roles
        var tableauroleLen = tableaurole.length;
        var tableaurolelimiteLen = tableaurolelimite.length;
        /******************************************************************************/
        //  Si l'utilisateur a tous le droits dans un role et limites dans un autres //
        /****************************************************************************/        
        if((tableauroleLen > 0) && (tableaurolelimiteLen > 0)) {
          // cette utilisateur possedes tous les droits dans toutes ses branches
          var nbrebranche = 0;
          var newSql = {
            'entities' : [{
              t: 'role_unit',
              c: ['id_unit']
            }],
            'cond' : [{
              t: 'role_unit',
              cl: 'id_role',
              z: 'IN',
              v: "(" + tableauroleString + ")"
            }]
          };
          dbFace.selectionner(newSql, function(err, ans) {
            if (err) {
              throw err;
            } else if (ans.length > 0) {
              var newtaille = ans.length;
              for(var i = 0; i < ans.length; i++) {
                  unitUser = ans[i];
                  tableauBranche[nbrebranche] = unitUser.id_unit;
                  nbrebranche++;
              }

              tableauBrancheString = tableauBranche.toString();
              var sqlLimite = {
                'entities' : [{
                  t: 'role_unit',
                  c: ['id_unit']
                },
                {
                  t: 'user_role_description',
                  c: ['id']              
                }],
                'jcond' : [{
                  ts: ['user_role_description', 'role_unit'],
                  c: ['id_role_unit', 'id'],
                  l: 'AND' 
                }],
                'cond' : [{
                  t: 'user_role_description',
                  cl: 'id_user',
                  z: '=',
                  v: req.session.user_id
                }]
              };              
              dbFace.selectionner(sqlLimite, function(err, ans) {
                if (err) {
                  throw err;
                } else if (ans.length > 0) {
                  var newtaille = ans.length;
                  for(var bb = 0; bb < ans.length; bb++) {
                      unitUser = ans[bb];
                      tableauBranche.push(unitUser.id_unit);
                  }
                  var tableauBrancheString = tableauBranche.toString(); // Toutes les units dont l'utilisateur a droits
                  var tableauAllroleString = tableauAllrole.toString(); // Tous les roles de l'utilisateur
                  createTree(colonne, tables, tableauAllroleString, tableauBrancheString);
                }
              });

            }
          });           



        } else if ((tableauroleLen > 0) && (tableaurolelimiteLen == 0)) {
          // cette utilisateur possedes tous les droits dans toutes ses branches
          var nbrebranche = 0;
          var newSql = {
            'entities' : [{
              t: 'role_unit',
              c: ['id_unit']
            }],
            'cond' : [{
              t: 'role_unit',
              cl: 'id_role',
              z: 'IN',
              v: "(" + tableauroleString + ")"
            }]
          };
          dbFace.selectionner(newSql, function(err, ans) {
            if (err) {
              throw err;
            } else if (ans.length > 0) {
              var newtaille = ans.length;
              for(var i = 0; i < ans.length; i++) {
                  unitUser = ans[i];
                  tableauBranche[nbrebranche] = unitUser.id_unit;
                  nbrebranche++;
              }
              tableauBrancheString = tableauBranche.toString();
              createTree(colonne, tables, tableauHeadString, tableauBrancheString);
            }
          });           
        } else if ((tableauroleLen === 0) && (tableaurolelimiteLen > 0)) {
          // Cette n'a que des droits limités
          tableauHeadLimiteString = tableauHeadLimite.toString();                    
          var nbrebranche = 0;
          var sqlLimite = {
            'entities' : [{
              t: 'role_unit',
              c: ['id_unit']
            },
            {
              t: 'user_role_description',
              c: ['id']              
            }],
            'jcond' : [{
              ts: ['user_role_description', 'role_unit'],
              c: ['id_role_unit', 'id'],
              l: 'AND' 
            }],
            'cond' : [{
              t: 'user_role_description',
              cl: 'id_user',
              z: '=',
              v: req.session.user_id
            }]
          };
          //Envoi de la requete à DbFace
          dbFace.selectionner(sqlLimite, function(err, ans) {
            if (err) {
              throw err;
            } else if (ans.length > 0) {
              var newtaille = ans.length;
              for(var bb = 0; bb < ans.length; bb++) {
                  unitUser = ans[bb];
                  tableauBranche[nbrebranche] = unitUser.id_unit;
                  nbrebranche++;
              }
              tableauBrancheString = tableauBranche.toString();
              createTree(colonne, tables, tableauHeadLimiteString, tableauBrancheString);
            }
          });                    

        }
      }
    }
  });
});

app.listen(3000, console.log('Environment:', app.get('env'), "Rapid Prototype listening on port 3000"));
