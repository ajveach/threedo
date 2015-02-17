(function(){
	/**
	 * extend is the method used to apply a module to threedo. By calling threedo.extend a module will be queued and its dependecies checked before proceeding
	 * @param  {object} options [Module options]
	 */
	var extend = function(options){
		if(this.extend.list[options.name])
			throw "A module named \""+options.name+"\" already exists in threedo.";

		this.extend.list[options.name] = options;
	};

	extend.list = {};

	threedo.extend = extend;
})();