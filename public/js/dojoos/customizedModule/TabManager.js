define("customizedModule/TabManager", 
	["dijit/layout/TabContainer", "dojox/layout/ContentPane","dojo/_base/declare"], 
	function(TabContainer, ContentPane, declare){
		return declare("customizedModule.TabManager",TabContainer,{

			selectedTab:null,
			constructor:function(args){				
				this.watch("selectedChildWidget", function(name, oval, nval){
			    selectedTab = nval;
			    if (this.getChildren().length == 1){
			    	this.getChildren()[0].set('closable', false);
			    	this.hello();
			    }
			    });				
			},
			hello: function(){
				console.log("je viens d'etre appeler");
			},

			addChildren: function(title, href, closable, simpleOpen) {

				var enfants = this.getChildren();
				if(enfants.length == 0) {

					//le tabcontainer ne contient aucun enfant, donc on ajoute
					var aine = new ContentPane({
         						title: title,
         						href: href,
         						closable: false
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
								selectedTab.set('title', title);
								selectedTab.set('href', href);
								selectedTab.set('closable', false);								
		    				}else{
		    					var d = new ContentPane({
	         						title: title,
	         						href: href,
	         						closable: true
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
								//enfants[0].set('title', title);
								//enfants[0].set('href', href);
								selectedTab.set('title', title);
								selectedTab.set('href', href);
								selectedTab.set('closable', closable);								
		    				}else{
		    					var d = new ContentPane({
	         						title: title,
	         						href: href,
	         						closable: true
	    						});
	    						this.addChild(d);
		    				}
									

					}

				}

				
				
			}
		});
	}
	);
