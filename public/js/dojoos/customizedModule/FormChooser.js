define("customizedModule/FormChooser", 
	["dijit/form/Form", "dojo/store/JsonRest","dijit/form/CheckBox","dojo/_base/declare", "dojo/Deferred"], 
	function(Form, JsonRest, CheckBox, declare, Deferred){
		return declare("customizedModule.FormChooser",Form,{
			ids:null,
			args:null,
			checks:null,
			constructor: function(args){
				declare.safeMixin(this, args);
				this.args = args;
				this.ids = [];
				this.checks = [];
				
			},
			postCreate: function(){
				this.inherited(arguments);
				//this.getUnitsID();
			}, 
			getUnitsID: function(){
				var deferred = new Deferred();
				var store = new JsonRest({target:'/data/'});
				var that = this;
				sql={};
				sql.e = [{t : 'role', c : ['role_head']}];
                sql.cond = [{t:'role', cl:'name', v:this.args.name, z:'='}];				
				if(that.args){
					store.query(sql).then(function(item){
						var id = item[0].role_head;
						sql.e = [{t:'unit', c:['name']}];
						sql.cond = [{t:'unit', cl:'parent', v:id, z:'='}];
						store.query(sql).then(function(items){
						 for(var i=0; i<items.length; i++){
							that.ids.push(items[i].name);			  	            
			             }				             
			             deferred.resolve(that.ids);
			         });
					});		             
				}
				return deferred.promise; 
			},
			placeControls: function(values){
				//creation des checks
				for(var i=0; i<values.length; i++){
					var control = new CheckBox({value:values[i]},values[i]+'ID');
					this.checks.push(control);
				}
			},
			addLastCheck: function(id){
				var control = new CheckBox({value:"Tous"},id);
				this.checks.push(control);

			}
		});
	}
	);
