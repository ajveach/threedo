(function(){
	var hooks = {};
	var lastUpdate = new Date().getTime();

	var update = function(){
		// Update delta time
		var now = new Date().getTime();
		threedo.update.delta = (now - lastUpdate)/1000;
		threedo.update.time = Math.round((threedo.update.time + threedo.update.delta) * 1000) / 1000;
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
	update.time = 0;

	threedo.update = update;
})();