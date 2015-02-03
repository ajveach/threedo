(function(){
	threedo.Camera = function(options){
		var options = options || {};

		options.name = options.name || "mainCamera";

		// Skip THREE.Object3D creation in Node3D class
		options.noObject3D = true;

		threedo.Node3D.call(this,options);

		var _aspectRatio = options.aspectRatio;
		Object.defineProperty(this,"aspectRatio",{
			get : function(){ return _aspectRatio;},
			set : function(value){
				_aspectRatio = value;
				if(_camera){
					_camera.aspect = _aspectRatio;
					_camera.updateProjectionMatrix();
				}
			}
		});

		// create a THREE.js camera
		var _camera = new THREE.PerspectiveCamera(
			options.viewAngle || 45,
			options.aspectRatio || 4/3,
			options.near || threedo.scene.near,
			options.far || threedo.scene.far
		);
		Object.defineProperty( this, "Camera", {
			get : function(){ return _camera; }
		});

		// Add the camera to the scene
		if(options.scene)
			options.scene.add(this);
		else
			threedo.scene.add(this);

		// set its position
		var _startPosition = options.position || new THREE.Vector3(0,0,0);
		_camera.position.set(_startPosition.x,_startPosition.y,_startPosition.z);

		this.type = "Camera";
	};

	threedo.Camera.prototype = Object.create(threedo.Node3D.prototype);
	threedo.Camera.constructor = threedo.Camera;
})();