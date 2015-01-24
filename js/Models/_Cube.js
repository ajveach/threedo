(function(){
	threedo.Cube = function(options){
		var options = options || {};

		// 
		// Create cube mesh
		// 
		
		// Start with geometry
		var scale = options.scale || new THREE.Vector3(1,1,1),
			segments = options.segments || [1,1,1],
			geometry = new THREE.BoxGeometry(scale.x,scale.y,scale.z,segments[0],segments[1],segments[2]);

		// Create material
		var color = options.color || 0xffffff,
			material = options.material || null;
		if(!material)
			material = new THREE.MeshLambertMaterial({color:color});

		// Create mesh
		options.Mesh = new THREE.Mesh(geometry,material);

		// Call Mesh constructor
		threedo.Mesh.call(this,options);

		this.type = "Cube";
	};

	threedo.Cube.prototype = Object.create(threedo.Mesh.prototype);
	threedo.Cube.constructor = threedo.Cube;
})();