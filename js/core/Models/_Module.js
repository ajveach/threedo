(function(){
	threedo.Module = function(options,next){
		threedo.Model.call(this);

		/**
		 * The name of this module
		 * @type {string}
		 */
		var _name = name;
		Object.defineProperty(this,"name",{
			get:function(){ return _name; },
			set:function(value){ _name = value; }
		});
		// Apply name to this module
		this.name = options.name;

		/**
		 * The modules on which this module depends
		 * @type {Array}
		 */
		var _requirements = [];
		Object.defineProperty(this,"requirement",{
			set : function(value){
				if(typeof value === "object"){
					for(var i in value)
						if(value.hasOwnProperty(i) && _requirements.indexOf(value[i]) < 0)
							_requirements.push(value);
				}
				else if(_requirements.indexOf(value) < 0)
					_requirements.push(value);
			}
		});
		Object.defineProperty(this,"requirements",{
			get:function(){ return _requirements; }
		});
		// Apply requirements to this module
		if(typeof options.requirements === "object"){
			for(var i in options.requirements)
				if(options.requirements.hasOwnProperty(i))
					this.requirement = options.requirements[i];
		}
		else if(typeof options.requirements === "string"){
			this.requirement = options.requirements;
		}
	};

	threedo.Module.prototype = Object.create(threedo.Model.prototype);
	threedo.Module.prototype.constructor = threedo.Module;
})();