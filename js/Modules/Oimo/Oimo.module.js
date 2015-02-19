(function(){
	var Oimo = function(options){
		threedo.Module.call(this,options);

		threedo.Node3D.prototype.extend("rigidbody",{
			get : function(){
				return this._rigidbody;
			},
			set : function(value){
				if(typeof value !== 'boolean')
					throw "The rididbody value of a node must be of type boolean.";
				this._rigidbody = value;
			}
		});
	};

	Oimo.prototype = Object.create(threedo.Module.prototype);
	Oimo.prototype.constructor = Oimo;


	// Add module to threedo
	threedo.extend({
		name : "Oimo",
		Module : Oimo,
		requirements : {
			modules : null,
			libraries : [
				{
					check : function(){
						if(!window.THREEx || !THREEx.Oimo)
							return false;
						return true;
					},
					file : "../js/Modules/Oimo/threex.oimo.js"
				}
			]
		}
	});
})();