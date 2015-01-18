(function(){
	var hooks = [];

	var onResize = function(f){
		if(typeof f === 'function'){
			var i = hooks.push(f);
			return i;
		}

		// Not adding a hook. Call all hooks and perform core tasks
		threedo.scene.width($(window).width());
		threedo.scene.height($(window).height());

		for(var i = 0; i < hooks.length; i += 1)
			hooks[i]();
	};

	threedo.onResize = onResize;
})();