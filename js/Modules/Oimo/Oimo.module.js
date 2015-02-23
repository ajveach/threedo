(function(){
	var Oimo = function(options,next){
		var thisOimo = this;

		// This constructor should be fired first
		threedo.Module.call(this,options);

		/** START Module Logic */
		// Rigidbody can be set to true/false to toggle a rigidbody in the physics engine
		threedo.Mesh.prototype.extend("rigidbody",{
			get : function(){
				return this._rigidbody;
			},
			set : function(value){
				if(typeof value !== 'boolean')
					throw "The rididbody value of a node must be of type boolean.";
				this._rigidbody = value;

				var thisMesh = this;
				if(value){
					this._OimoBody = THREEx.Oimo.createBodyFromMesh(thisOimo.world,this.Mesh);
					_updaters[this.name] = function(){
						THREEx.Oimo.updateObject3dWithBody(thisMesh.Mesh, thisMesh._OimoBody);
					};
				}
			}
		});

		// Collider can be set to true/false to toggle a static collider in the physics engine
		threedo.Mesh.prototype.extend("collider",{
			get : function(){
				return this._collider;
			},
			set : function(value){
				if(typeof value !== 'boolean')
					throw "The collider value of a node must be of type boolean.";
				this._collider = value;

				if(value){
					this._OimoBody = THREEx.Oimo.createBodyFromMesh(thisOimo.world,this.Mesh,{
						move : false
					});
				}
			}
		});

		var _updaters = {};

		var _world = null;
		Object.defineProperty(this,"world",{
			get : function(){ return _world; },
			set : function(value){
				_world = value;
			}
		});
		this.world = new OIMO.World();

		// Add update method to threedo.update. This function will be fired every frame
		var _update = function(){
			thisOimo.world.step();

			// Update each object
			for(var i in _updaters){
				if(_updaters.hasOwnProperty(i)){
					_updaters[i]();
				}
			}
		};
		threedo.update.add("oimo",_update);
		/** END Module Logic */

		// The next method must be fired here to continue the module loading process
		next();
	};

	Oimo.prototype = Object.create(threedo.Module.prototype);
	Oimo.prototype.constructor = Oimo;


	// Add module to threedo
	threedo.extend({
		name : "Oimo",
		Module : Oimo,
		requirements : {
			modules : null
		}
	});
})();