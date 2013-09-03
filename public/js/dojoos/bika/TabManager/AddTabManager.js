define("bika/TabManager/AddTabManager", 
  ["dijit/layout/TabContainer", "dijit/layout/ContentPane","dojo/_base/declare"], 
  function(TabContainer, ContentPane, declare){
    return declare("bika.TabManager.AddTabManager",TabContainer,{
//open a new tab
      openTab: function( title, href, closable) {
        var add = true;
        var openTab = true;
        var tabPane = this.getChildren();
        var taClose = tabPane.length;
        
        for(i = 0; i < tabPane.length; i++){
          if(title == tabPane[i].params.title){
            add = false;
            break;
          }else{
            var openTab = false;          
          }
        }
        if(add == true){
          var tbcon = this;
          var pane = new ContentPane({
                title: title,
                href: href,
                closable: closable,
            onClose: function(){
                    valeurChoix = true;
                if(valeurChoix == true){
                  if (tbcon.getChildren().length == 2){
                    tbcon.getChildren()[1].set('closable',false);
                    tbcon.getChildren()[0].set('closable',false);
                    console.log(tbcon.getChildren()[0].closable);
                  }
                      if(tbcon.getChildren().length >= 2){
                        tbcon.getChildren()[0].set("closable",true);              
                      }
                   return valeurChoix;
                }
            }
            });
            if(openTab == true ){
            this.addChild(pane);
          }
          if(openTab == false ){
            var i = 0;
            if(this.selectedChildWidget == tabPane[1]){
              this.removeChild(tabPane[1]);
              this.addChild(pane,1);
              this.selectChild(pane);
            } else if(this.selectedChildWidget == tabPane[2]){
              this.removeChild(tabPane[2]);
              this.addChild(pane,2);
              this.selectChild(pane);
            } else{
              this.removeChild(tabPane[0]);
              this.addChild(pane,0);
              this.selectChild (pane);
            }
          }           
          if(tbcon.getChildren().length == 1){
              tbcon.getChildren()[0].set('closable',false);
          } else{
              tbcon.getChildren()[0].set('closable',true);          
          }
        }else{
          for(i = 0; i < tabPane.length; i++){
          
            if(title == tabPane[i].params.title){
              if(!tabPane[i].selected){
                this.selectChild(tabPane[i]);
              }
            break;
            }
          }

        }       
      },
//create a new tab      
      newTab: function( title, href, closable) {
        var add = true;
        var newTab = true;
        var testTab = true;
        var tabPane = this.getChildren();
        var taClose = tabPane.length;
        
        for(i = 0; i < tabPane.length; i++){
          if(title == tabPane[i].params.title){
            add = false;
            break;
          }
        }
        if(add == true){
          var tbcon = this;
          var pane = new ContentPane({
                title: title,
                href: href,
                closable: closable,
              onClose: function(){
                    valeurChoix = true;
                if(valeurChoix == true){
                  if (tbcon.getChildren().length == 2){
                    tbcon.getChildren()[1].set('closable',false);
                    tbcon.getChildren()[0].set("closable",false);
                  }
                return valeurChoix;
                }
              } // Fin de la fonction onClose
            });
          if(newTab == true ){
            this.addChild(pane);
          }
          if(newTab == false ){
            this.removeChild(tabPane[0]);
            this.addChild(pane,0);
          }         
          if(tbcon.getChildren().length == 1){
              tbcon.getChildren()[0].set('closable',false);
          } else{
              tbcon.getChildren()[0].set('closable',true);          
          } 
          this.selectChild (pane);
        }else{
          for(i  =0; i < tabPane.length; i++){
          
            if(title == tabPane[i].params.title){
              if(!tabPane[i].selected){
                this.selectChild(tabPane[i]);
              }
            break;
            }
          }

        }       
      },
      constructor:function(args){
                dojo.safeMixin(this.args);
      }
    });
  }
  );