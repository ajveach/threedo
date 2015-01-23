(function(){
	threedo.Cube = function(options){
		var options = options || {};

		// Skip THREE.Object3D creation in Node3D class
		options.noObject3D = true;

		threedo.Node3D.call(this,options);

		// 
		// Create cube mesh
		// 

		// Start with geometry
		var scale = options.scale || [1,1,1],
			segments = options.segments || [1,1,1],
			geometry = new THREE.BoxGeometry(scale[0],scale[1],scale[2],segments[0],segments[1],segments[2]);
		// Create material
		var color = options.color || 0xffffff,
			material = options.material || null;
		if(!material)
			material = new THREE.MeshLambertMaterial({color:color});
		// Create mesh
		var _mesh = new THREE.Mesh(geometry,material);
		// Apply rotation
		if(options.rotation){
			_mesh.rotation.x = options.rotation[0];
			_mesh.rotation.y = options.rotation[1];
			_mesh.rotation.z = options.rotation[2];
		}

		Object.defineProperty( this, "Mesh", {
			get : function(){ return _mesh; },
			set : function(value){ _mesh = value; }
		});
		// Add mesh to scene
		threedo.scene.add(options.name, _mesh);


		this.type = "Cube";
	};

	threedo.Cube.prototype = Object.create(threedo.Node3D.prototype);
	threedo.Cube.constructor = threedo.Cube;
})();