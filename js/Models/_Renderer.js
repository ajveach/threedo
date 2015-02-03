(function(){
	threedo.Renderer = function(options){
		var options = options || {};

		options.name = options.name || "primary";
		threedo.Model.call(this,options);

		// TODO: add check for WebGL renderer and switch to CanvasRenderer if needed
		var _renderType = options.renderType || "WebGLRenderer";
		Object.defineProperty(this, "renderType", {
			get : function(){ return _renderType; }
		});

		var _$container = options.$container || threedo.$container.primary;
		Object.defineProperty(this, "$container", {
			get : function(){ return _$container; },
			set : function($newContainer){ _$container = $newContainer; }
		});

		var _scene = options.scene || threedo.scene;
		Object.defineProperty(this, "scene", {
			get : function(){ return _scene; },
			set : function(newScene){ _scene = newScene; }
		});

		var _camera = options.camera || threedo.scene.find("mainCamera");
		Object.defineProperty(this, "camera", {
			get : function(){ return _camera; },
			set : function(newCamera){ _camera = newCamera; }
		});

		var _width = options.width || _$container.width();
		Object.defineProperty(this, "width", {
			get : function(){ return _width; },
			set : function(newWidth){
				_width = newWidth;
				_camera.aspectRatio = _width / _height;
				_renderer.setSize(_width,_height);
			}
		});

		var _height = options.height || _$container.height();
		Object.defineProperty(this, "height", {
			get : function(){ return _height; },
			set : function(newHeight){
				_height = newHeight;
				_camera.aspectRatio = _width / _height;
				_renderer.setSize(_width,_height);
			}
		});

		var _backgroundColor = options.backgroundColor || new THREE.Color(.2,0,.2);
		Object.defineProperty(this, "backgroundColor", {
			get : function(){ return _backgroundColor; },
			set : function(newBackgroundColor){
				_backgroundColor = newBackgroundColor;
				_renderer.setClearColor(_backgroundColor,_backgroundAlpha);
			}
		});

		var _backgroundAlpha = options.backgroundAlpha || 1;
		Object.defineProperty(this, "backgroundAlpha", {
			get : function(){ return _backgroundAlpha; },
			set : function(newBackgroundAlpha){
				_backgroundAlpha = newBackgroundAlpha;
				_renderer.setClearColor(_backgroundColor,_backgroundAlpha);
			}
		});

		this.render = function(){
			_renderer.render(_scene.scene,_camera.Camera);
		};

		// Create and setup THREE.js renderer
		var _renderer = new THREE[_renderType]();
		_camera.aspectRatio = _width / _height;
		_renderer.setSize(_width,_height);
		_renderer.setClearColor(_backgroundColor,_backgroundAlpha);
		_$container.html(_renderer.domElement);

		this.type = "Renderer";
	};

	threedo.Renderer.prototype = Object.create(threedo.Model.prototype);
	threedo.Renderer.constructor = threedo.Renderer;
})();