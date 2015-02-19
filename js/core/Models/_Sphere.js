(function(){
	threedo.Sphere = function(options){
		var options = options || {};

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
		options.Mesh = new THREE.Mesh(geometry,material);

		// Call Mesh constructor
		threedo.Mesh.call(this,options);

		this.type = "Sphere";
	};

	threedo.Sphere.prototype = Object.create(threedo.Mesh.prototype);
	threedo.Sphere.constructor = threedo.Sphere;
})();