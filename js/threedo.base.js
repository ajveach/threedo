(function(){
	var threedo = function(){
		this.utility = {};
		this.version = "0.0.1";

		// threedo.$containers
		var load$Containers = function(){
			var $e = $("#threedo,[data-threedoType='container']");
			$e.each(function(){
				var $container = $(this),
					name = $container.attr('data-threedoName');

				// DOM attribute data-threedoName is required unless this is the first $container (then it will be primary)
				if(!name && _$containers.primary)
					throw "A name was not provided for the threedo container";

				if(name)
					_$containers[name] = $container;

				// If this is the first $container make it the primary container
				if(!_$containers.primary)
					_$containers.primary = $container;

				// Ensure that it has the data-threedoType attribute
				$container.attr("data-threedoType","container");
			});
		};
		// Getter will automatically find DOM elements using jQuery on first request
		var _$containers = {};
		Object.defineProperty(this,"$container",{
			get:function(){
				// The first time $container is called, get all containers on the page
				if(!_$containers.primary)
					load$Containers();
				return _$containers.primary;
			}
		});
		Object.defineProperty(this,"$containers",{
			get:function(){
				// The first time $container is called, get all containers on the page
				if(!_$containers.primary)
					load$Containers();
				return _$containers;
			}
		});

		// init function to be called when switching scenes
		this.init = function(options,next){
			// If this is the first init call, fire the generate method to load all modules
			if(!this.initialized){
				this.generate();
				this.initialized = true;
			}

			// If scene is loaded, unload it before starting new one

			// Load new scene
			this.scene = new this.Scene(options);
			if(typeof next === 'function')
				next();
		};

		this.initialized = false;
	};

	window.threedo = new threedo();
})();