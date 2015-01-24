(function(){
	threedo.Mesh = function(options){
		var options = options || {};

		// Skip THREE.Object3D creation in Node3D class
		options.noObject3D = true;
		threedo.Node3D.call(this,options);

		//
		// TODO: If model resource was provided use cached model or load it
		//

		var _mesh = null;
		Object.defineProperty( this, "Mesh", {
			get : function(){ return _mesh; },
			set : function(value){ 
				// remove previous mesh from scene if it exists
				if(_mesh instanceof THREE.Mesh)
					threedo.scene.remove(_mesh);

				_mesh = value; 
				
				// Add mesh to scene
				threedo.scene.add(options.name, _mesh);
			}
		});

		// If Mesh was provided as option add it to scene
		if(options.Mesh instanceof THREE.Mesh)
			this.Mesh = options.Mesh;

		// If rotation option was provided apply it to mesh
		if(options.rotation instanceof THREE.Euler){
			this.Mesh.rotation.x = options.rotation.x;
			this.Mesh.rotation.y = options.rotation.y;
			this.Mesh.rotation.z = options.rotation.z;
		}

		// If position option was provided apply it to mesh
		if(options.position instanceof THREE.Vector3){
			this.Mesh.position.x = options.position.x;
			this.Mesh.position.y = options.position.y;
			this.Mesh.position.z = options.position.z;
		}

		this.type = "Mesh";
	};

	threedo.Mesh.prototype = Object.create(threedo.Node3D.prototype);
	threedo.Mesh.constructor = threedo.Mesh;
})();