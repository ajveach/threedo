(function(){
	threedo.Light = function(options){
		var options = options || {};

		// Skip THREE.Object3D creation in Node3D class
		options.noObject3D = true;

		threedo.Node3D.call(this,options);

		// create a point light
		var _color = options.color || 0xffffff,
			_light = new THREE.PointLight(_color);
		Object.defineProperty( this, "Light", {
			get : function(){ return _light; }
		});

		// set its position
		var _startPosition = options.position || [0,0,0];
		_light.position.x = _startPosition[0];
		_light.position.y = _startPosition[1];
		_light.position.z = _startPosition[2];

		// add to the scene
		threedo.scene.add(this);

		this.type = "Light";
	};

	threedo.Light.prototype = Object.create(threedo.Node3D.prototype);
	threedo.Light.constructor = threedo.Light;
})();