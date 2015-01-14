(function(){
	var hooks = {};
	var lastUpdate = new Date().getTime();

	var update = function(){
		// Update delta time
		var now = new Date().getTime();
		threedo.update.deltaTime = now - lastUpdate;
		lastUpdate = now;

		for (var k in hooks) {
			if (hooks.hasOwnProperty(k) && typeof hooks[k] === 'function') {
				hooks[k]();
			}
		}
	};

	update.add = function(name,method){
		hooks[name] = method;
	};

	update.remove = function(name){
		delete hooks[name];
	};

	update.deltaTime = 0;


	threedo.update = update;
})();