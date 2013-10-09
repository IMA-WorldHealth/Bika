define("customizedModule/UnitsForm", 
	["dijit/form/Form","dijit/form/CheckBox","dojo/_base/declare", "dojo/on"], 
	function(Form, CheckBox, declare, on){
		return declare("customizedModule.UnitsForm",Form,{
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
					var control = new CheckBox({id: values[i].id+'ID', value:values[i].name},""+values[i].id);
					this.checks.push(control);
				}
			},
			addLastCheck: function(id){
				console.log('jolie');
				var control = new CheckBox({id:'last', value:'Tous'},id);
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
			},
			getCheckSelectedCount: function(){
				var count=0;
				for(var i=0; i<this.checks.length; i++){

					if(this.checks[i].get('checked') === true){
						count++;
					}
			}
			return count;

			},
			unCheckAll: function(){
				for(var i=0; i<this.checks.length; i++){
					this.checks[i].set('checked', false);
				}
			},
			check: function(id){
				for(var i=0; i<this.checks.length; i++){
					if(this.checks[i].id == id+"ID"){
						this.checks[i].set('checked', true);
					}
				}


			}


		});
	}
	);
