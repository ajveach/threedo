(function(){
	threedo.Sphere = function(options){
		var options = options || {};

		// Skip THREE.Object3D creation in Node3D class
		options.noObject3D = true;

		threedo.Node3D.call(this,options);

		// 
		// Create sphere mesh
		// 

		// Start with geometry
		var radius = options.radius || 1,
			segments = options.segments || [8,6],
			phi = options.phi || [0, Math.PI * 2],
			theta = options.theta || [0, Math.PI],
			geometry = new THREE.SphereGeometry(radius,segments[0],segments[1],phi[0],phi[1],theta[0],theta[1]);

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


		this.type = "Sphere";
	};

	threedo.Sphere.prototype = Object.create(threedo.Node3D.prototype);
	threedo.Sphere.constructor = threedo.Sphere;
})();