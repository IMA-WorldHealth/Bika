define("bika/TabManager", 
  ["dijit/layout/TabContainer", "dojox/layout/ContentPane","dojo/_base/declare", "bika/ApplicationState"], 
  function(TabContainer, ContentPane, declare, ApplicationState){
    return declare("bika.TabManager",TabContainer,{

      /////
      // module: TabManager 
      // summary: 
      // TODO: 
      //  -reformat code (remove duplication of code, multiple initiations of ContentPane)
      //  -Final tab can be closed if a new tab is open and then closed
      //  -tabs should NOT be re-purposed, close tab and open new tab in its place
      /////

      //TODO: figure out how to return a new instance of the object - no need initialise within modules
      app_state: new ApplicationState(),
      selectedTab:null,
      constructor:function(args){       
        this.watch("selectedChildWidget", function(name, oval, nval){
          selectedTab = nval;
          if (this.getChildren().length == 1){
            this.getChildren()[0].set('closable', false);
          }
          });       
      },

      urlToId: function(url) { 
        //Remove leading '/'
        var id = url.substr(1, url.length-2);
        return "bika-" + id.replace('/', '-');
      },

      //TODO: clean up this function - ContentPane should only be initialised in one place (lots of repeated code)
      addChildren: function(title, href, closable, simpleOpen) {

        var uid = this.urlToId(href);
        //@sfount - raw scope haX
        var t = this;

        var enfants = this.getChildren();
        if(enfants.length == 0) {

          //le tabcontainer ne contient aucun enfant, donc on ajoute
          var aine = new ContentPane({
                    title: title,
                    href: href,
                    closable: false,
                    onClose: function() { 
                      t.app_state.unregister(uid);
                      return true;
                    }
            });

            this.addChild(aine);

        }else if(enfants.length == 1){

          //verification existence du title
          var existe = false;
          var indexExistence = -1;

          for(i=0; i< enfants.length; i++){
            if(title==enfants[i].title){
              existe = true;
              indexExistence = i;
              break;
            }
          }
          if(existe == true){

            this.selectChild(enfants[indexExistence]);

          }else {
            //ajout de l'enfant

              if(simpleOpen){

                t.app_state.unregister(t.urlToId(selectedTab.get('href')));
                selectedTab.set('title', title);
                selectedTab.set('href', href);
                selectedTab.set('closable', false);               
                }else{
                  var d = new ContentPane({
                      title: title,
                      href: href,
                      closable: true,
                      onClose: function() { 
                        t.app_state.unregister(uid);
                        return true;
                      }
                  });
                  this.addChild(d);
                }       

          }

                  if(!simpleOpen){
                    enfants[0].set("closable", true);
                  }
        }
        else if(enfants.length > 1){          

          //verification existence du title
          var existe = false;
          var indexExistence = -1;

          for(i=0; i< enfants.length; i++){
            if(title==enfants[i].title){
              existe = true;
              indexExistence = i;
              break;
            }
          }
          if(existe == true){

            this.selectChild(enfants[indexExistence]);

          }else {
            //ajout de l'enfant

              if(simpleOpen){
                //oh lawd
                
                t.app_state.unregister(t.urlToId(selectedTab.get('href')));
                //enfants[0].set('title', title);
                //enfants[0].set('href', href);
                selectedTab.set('title', title);
                selectedTab.set('href', href);
                selectedTab.set('closable', closable);                
                }else{
                  var d = new ContentPane({
                      title: title,
                      href: href,
                      closable: true,
                      onClose: function() { 
                        t.app_state.unregister(uid);
                        return true;
                      }
                  });
                  this.addChild(d);
                }
                  

          }

        }

        
        
      }

    });
  }
  );
