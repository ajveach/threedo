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
				if(this._camera){
					this._camera.aspect = _aspectRatio;
					this._camera.updateProjectionMatrix();
				}
			}
		});

		// create a container element
		var _cameraContainer = new THREE.Object3D();
		Object.defineProperty( this, "container", {
			get : function(){ return _cameraContainer; }
		});

		// create a THREE.js camera
		var _camera = new THREE.PerspectiveCamera(
			options.viewAngle || 45,
			options.aspectRatio || 4/3,
			options.near || threedo.scene.near,
			options.far || threedo.scene.far
		);
		// Add the camera to the container
		_cameraContainer.add(_camera);
		Object.defineProperty( this, "camera", {
			get : function(){ return _camera; }
		});

		// set its position
		var _startPosition = options.position || new THREE.Vector3(0,0,0);
		_cameraContainer.position.set(_startPosition.x,_startPosition.y,_startPosition.z);

		this.type = "Camera";
	};

	threedo.Camera.prototype = Object.create(threedo.Node3D.prototype);
	threedo.Camera.constructor = threedo.Camera;
})();