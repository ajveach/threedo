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

		var _renderer = {};
		Object.defineProperty(this,"renderer",{
			get : function(){ return _renderer;},
			set : function(newRenderer){
				_renderer = newRenderer;
			}
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

		var _$container = options.$container || threedo.$container;
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

		var _updateQueue = {},
				_fixedUpdateQueue = {};
		this.update = function(){
			// Call update method on nodes in scene
			for(var i in _updateQueue)
				if(_updateQueue.hasOwnProperty(i) && _updateQueue[i].active)
					_updateQueue[i].update();
		};
		this.update.add = function(node){
			if(_updateQueue[node.name])
				throw "A node named \""+node.name+"\" already exists in this scene's update queue";
			_updateQueue[node.name] = node;
		};
		this.update.remove = function(node){
			if(typeof node === "string" && _updateQueue[node])
				delete _updateQueue[node];
			else if(node instanceof threedo.Node && _updateQueue[node.name])
				delete _updateQueue[node.name];
		};

		this.fixedUpdate = function(){
			// Check for updates to render container dimensions
			_renderer.updateDimensions();

			// Call fixedUpdate on all queued nodes
			for(var i in _fixedUpdateQueue)
				if(_fixedUpdateQueue.hasOwnProperty(i) && _fixedUpdateQueue[i].active)
					_fixedUpdateQueue[i].fixedUpdate();

			// Update lastFixedUpdate value
			lastFixedUpdate = threedo.update.time;
		};
		this.fixedUpdate.add = function(node){
			if(_fixedUpdateQueue[node.name])
				throw "A node named \""+node.name+"\" already exists in this scene's update queue";
			_fixedUpdateQueue[node.name] = node;
		};
		this.fixedUpdate.remove = function(node){
			if(typeof node === "string" && _fixedUpdateQueue[node])
				delete _fixedUpdateQueue[node];
			else if(node instanceof threedo.Node && _fixedUpdateQueue[node.name])
				delete _fixedUpdateQueue[node.name];
		};

		/**
		 * 	Animation handler
		 */
		var fixedUpdateInterval = .1;
		var lastFixedUpdate = -fixedUpdateInterval;
		var _animate = function(){
			requestAnimationFrame(_animate);
			stats.begin();
				threedo.update();

				if(threedo.scene){
					// Call update on every node
					threedo.scene.update();

					// Call fixedUpdate every .1 seconds
					var callFixedUpdate = threedo.update.time - lastFixedUpdate >= fixedUpdateInterval ? true : false;
					if(callFixedUpdate)
						threedo.scene.fixedUpdate();
				}
				_renderer.render();
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

		_renderer = new threedo.Renderer({
			camera : mainCamera,
			scene : this
		});

		// Start animating
		_animate();
	};

	threedo.Scene.prototype = Object.create(threedo.Model.prototype);
	threedo.Scene.prototype.constructor = threedo.Scene;
})();