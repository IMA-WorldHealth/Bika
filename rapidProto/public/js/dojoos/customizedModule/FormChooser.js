define("customizedModule/FormChooser", 
	["dijit/form/Form", "dojo/store/JsonRest","dijit/form/CheckBox","dojo/_base/declare", "dojo/Deferred", "dojo/on"], 
	function(Form, JsonRest, CheckBox, declare, Deferred, on){
		return declare("customizedModule.FormChooser",Form,{
			checks:null,
			constructor: function(){
				this.checks = [];				
			},
			postCreate: function(){
				this.inherited(arguments);
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
				var that = this;
				on(control, 'change', function(value){
					if(value){
						for(var i=0; i<that.checks.length; i++){
							that.checks[i].set('checked', true);

						}
					}else{
						for(var i=0; i<that.checks.length; i++){
							that.checks[i].set('checked', false);
						}
					}
				});
				console.log("on a fini!");
				this.checks.push(control);
			},
			getCheckSelectedCount: function(){
				var count=0;
				for(var i=0; i<this.checks.length; i++){

					if(this.checks[i].get('checked') === true){
						count++;
					}
			}
			console.log(this);
			return count;

			},
			uncheckedAll: function(){
				for(var i=0; i<this.checks.length; i++){
					this.checks[i].set('checked', false);
				}
			}


		});
	}
	);
