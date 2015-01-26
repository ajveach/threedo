(function(){
	threedo.Scene = function(name){
		threedo.Model.call(this);

		if(!name)
			throw "A valid name was not provided to create this scene";

		var _name = name;
		Object.defineProperty(this,"name",{
			get:function(){ return _name; },
			set:function(value){ _name = value; }
		});

		var _width;
		Object.defineProperty(this,"width",{
			get : function(){ return _width;},
			set : function(value){ 
				_width = value; 
				// Set aspect ratio when width is changed
				this.aspectRatio = _width/this.height;
				this.renderer.setSize( _width, this.height );
			}
		});

		var _height;
		Object.defineProperty(this,"height",{
			get : function(){ return _height;},
			set : function(value){ 
				_height = value; 
				// Set aspect ratio when height is changed
				this.aspectRatio(this.width/_height);
				this.renderer.setSize( this.width, _height );
			}
		});

		var _viewAngle = 45;
		Object.defineProperty(this,"viewAngle",{
			get : function(){ return _viewAngle;},
			set : function(value){ _viewAngle = value; }
		});

		var _aspectRatio;
		Object.defineProperty(this,"aspectRatio",{
			get : function(){ return _aspectRatio;},
			set : function(value){ 
				_aspectRatio = value; 
				if(this.camera){
					this.camera.aspect = _aspectRatio;
					this.camera.updateProjectionMatrix();
				}
			}
		});

		var _near = 0.1;
		Object.defineProperty(this,"near",{
			get : function(){ return _near;},
			set : function(value){ _near = value; }
		});

		var _far = 1000;
		Object.defineProperty(this,"far",{
			get : function(){ return _far;},
			set : function(value){ _far = value; }
		});

		var _renderer;
		Object.defineProperty(this,"renderer",{
			get : function(){ return _renderer;},
			set : function(value){ _renderer = value; }
		});

		var _camera;
		Object.defineProperty(this,"camera",{
			get : function(){ return _camera;},
			set : function(value){ _camera = value; }
		});

		var _cameraContainer;
		Object.defineProperty(this,"cameraContainer",{
			get : function(){ return _cameraContainer;},
			set : function(value){ _cameraContainer = value; }
		});

		var _scene;
		Object.defineProperty(this,"scene",{
			get : function(){ return _scene;},
			set : function(value){ _scene = value; }
		});

		var _backgroundColor;
		Object.defineProperty(this,"backgroundColor",{
			get : function(){ return _backgroundColor;},
			set : function(value){ _backgroundColor = value; }
		});

		var _backgroundAlpha;
		Object.defineProperty(this,"backgroundAlpha",{
			get : function(){ return _backgroundAlpha;},
			set : function(value){ _backgroundAlpha = value; }
		});

		var _skybox;
		Object.defineProperty(this,"skybox",{
			get : function(){ return _skybox;},
			set : function(value){ _skybox = value; }
		});

		var _$container = options.$container || threedo.$container.primary;
		Object.defineProperty(this,"$container",{
			get : function(){ return _$container;},
			set : function(value){ _$container = value; }
		});

		var _objects = {};


		this.type = "Scene";
	};

	threedo.Scene.prototype = Object.create(threedo.Model.prototype);
	threedo.Scene.prototype.constructor = threedo.Scene;
})();