(function(){
	threedo.Scene = function(options){
		threedo.Model.call(this);

		if(!options.name)
			throw "A valid name was not provided to create this scene";

		var _name = options.name;
		Object.defineProperty(this,"name",{
			get:function(){ return _name; },
			set:function(value){ _name = value; }
		});

		var _viewAngle = 45;
		Object.defineProperty(this,"viewAngle",{
			get : function(){ return _viewAngle;},
			set : function(value){ _viewAngle = value; }
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

		var _renderers = {};
		Object.defineProperty(this,"renderers",{
			get : function(){ return _renderers;},
		});

		Object.defineProperty(this,"renderer",{
			get : function(){ return _renderers.primary;}
		});

		var _scene = new THREE.Scene();
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

		var _skybox = {};
		Object.defineProperty(this,"skybox",{
			get : function(){ return _skybox;},
			set : function(images){
				_skybox.materials = [];
				for(var i = 0; i < images.length; ++i){
					_skybox.materials.push(new THREE.MeshBasicMaterial({
						map: THREE.ImageUtils.loadTexture(images[i]),
						side : THREE.BackSide
					}));
				}

				if(!_skybox.mesh){
					_skybox.mesh = new THREE.Mesh(
					    new THREE.BoxGeometry( _far, _far, _far),
					    new THREE.MeshFaceMaterial( _skybox.materials )
					);
					_scene.add(_skybox.mesh);
				}
			}
		});

		var _$container = options.$container || threedo.$container.primary;
		Object.defineProperty(this,"$container",{
			get : function(){ return _$container;},
			set : function(value){ _$container = value; }
		});

		/**
		* 	Scene node handling
		**/
		var _nodes = {};
		Object.defineProperty(this, "nodes", {
			get : function(){ return _nodes; }
		});

		this.add = function(node){
			if(!_nodes[node.name]){
				_nodes[node.name] = node;
				var sceneObj = node.Camera || node.Mesh || node.Object3D || node.Light;
				_scene.add(sceneObj);
				return node;
			}

			throw "A node already exists in this scene named \""+node.name+"\"";
		};

		this.find = function(name){
			return _nodes[name] || null;
		};

		this.update = function(){
			// TODO: Look into caching update calls to avoid looping through all nodes
			// Call update method on nodes in scene
			for(var i in _nodes)
				if(_nodes.hasOwnProperty(i) && typeof _nodes[i].update === "function")
					_nodes[i].update();
		};

		/**
		 * 	Animation handler
		 */
		var _animate = function(){
			requestAnimationFrame(_animate);
			stats.begin();
				threedo.update();
				if(threedo.scene)
					threedo.scene.update();
				for(var i in _renderers){
					if(_renderers.hasOwnProperty(i))
						_renderers[i].render();
				}
			stats.end();
		};

		this.type = "Scene";

		/**
		 *		Create basic scene components (camera, renderer)
		 */
		var mainCamera = new threedo.Camera({
			name : "mainCamera",
			near : _near,
			far : _far,
			scene : this
		});

		_renderers['primary'] = new threedo.Renderer({
			name : "primary",
			camera : mainCamera,
			scene : this
		});

		// Start animating
		_animate();
	};

	threedo.Scene.prototype = Object.create(threedo.Model.prototype);
	threedo.Scene.prototype.constructor = threedo.Scene;
})();