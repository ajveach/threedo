(function(threedo){
	var _width = 0,
		_height = 0,
		_viewAngle = 45,
		_aspectRatio = null,
		_near = 0.1,
		_far = 10000,
		_renderer = null,
		_camera = null,
		_cameraContainer = null,
		_scene = null,
		_backgroundColor = 0x333333,
		_backgroundAlpha = 1,
		_skybox = null;

	var _objects = {};

	var scene = function(){
		return _scene;
	};

	scene.$container = null;

	/**
	 * GETTERS/SETTERS
	 */
	scene.width = function(width){
		var width = width || false;
		if(width){
			_width = width;
			// Set aspect ratio when width is changed
			scene.aspectRatio(_width/_height);
			_renderer.setSize( _width, _height );
		}
		else{
			return _width;
		}
	};
	scene.height = function(height){
		var height = height || false;
		if(height){
			_height = height;
			scene.aspectRatio(_width/_height);
			_renderer.setSize( _width, _height );
		}
		else{
			return _height;
		}
	};
	scene.viewAngle = function(angle){
		var angle = angle || false;
		if(angle){
			_viewAngle = angle;
		}
		else{
			return _viewAngle;
		}
	};
	scene.aspectRatio = function(ratio){
		var ratio = ratio || false;
		if(ratio){
			_aspectRatio = ratio;
			if(_camera){
				_camera.aspect = _aspectRatio;
	    		_camera.updateProjectionMatrix();
	    	}
		}
		else{
			return _aspectRatio;
		}
	};
	scene.near = function(near){
		var near = near || false;
		if(near){
			_near = near;
		}
		else{
			return _near;
		}
	};
	scene.far = function(far){
		var far = far || false;
		if(far){
			_far = far;
		}
		else{
			return _far;
		}
	};
	scene.backgroundColor = function(color){
		var color = color;

		if(typeof color === "number"){
			_backgroundColor = color;
			// Set background color
			_renderer.setClearColor( _backgroundColor, _backgroundAlpha );
		}
		else{
			return _backgroundColor;
		}
	};
	scene.backgroundAlpha = function(alpha){
		var alpha = alpha;

		if(typeof alpha === "number"){
			_backgroundAlpha = alpha;
			// Set background color
			_renderer.setClearColor( _backgroundColor, _backgroundAlpha );
		}
		else{
			return _backgroundAlpha;
		}
	};
	scene.skybox = function(images){
		if(!images)
			return _skybox;

		if(!_skybox)
			_skybox = {};

		if(images){
			_skybox.materials = [];
			for(var i = 0; i < 6; i += 1){
				_skybox.materials.push(new THREE.MeshBasicMaterial({
					map: THREE.ImageUtils.loadTexture(images[i]),
					side : THREE.BackSide
				}));
			}
		}

		if(!_skybox.mesh){
			_skybox.mesh = new THREE.Mesh(
			    new THREE.BoxGeometry( scene.far(), scene.far(), scene.far()),
			    new THREE.MeshFaceMaterial( _skybox.materials )
			);
			_cameraContainer.add(_skybox.mesh);
		}
	};

	/**
	 * GETTER ONLY
	 */
	scene.renderer = function(){
		return _renderer;
	};
	scene.camera = function(){
		return _camera;
	};
	scene.camera.position = function(x,y,z){
		_cameraContainer.position.set(x,y,z);
	};
	scene.find = function(name){
		return _objects[name];
	};

	/**
	 * WRAPPER METHODS
	 */
	scene.add = function(name,object){
		if(!_objects[name]){
			_objects[name] = object;
			_scene.add(object);
			return object;
		}

		throw "An object already exists in this scene named \""+name+"\"";
	};

	/**
	 * PRIMARY METHODS
	 */
	scene.init = function(next){
		scene.$container 	= $("#threedo");
		_width 				= scene.$container.width();
		_height 			= scene.$container.height();
		scene.aspectRatio(_width/_height);

		_renderer = new THREE.WebGLRenderer();
		_camera = new THREE.PerspectiveCamera(
			_viewAngle,
			_aspectRatio,
			_near,
			_far
		);

		_scene = new THREE.Scene();
		_cameraContainer = new THREE.Object3D();
		_cameraContainer.add(_camera);
		_scene.add(_cameraContainer);

		_renderer.setSize(_width, _height);
		_renderer.setClearColor( _backgroundColor, _backgroundAlpha );

		scene.$container.append(_renderer.domElement);

		// Add loader utility (must be done during init)
		threedo.utility.loader = new THREE.JSONLoader();

		// Bind on resize event
		$(window).resize(threedo.onResize);

		_animate();

		next();
	};

	var _animate = function(){
		requestAnimationFrame(_animate);
		stats.begin();
			threedo.update();
			_renderer.render(_scene, _camera);
		stats.end();
	};

	threedo.scene = scene;
})(threedo);