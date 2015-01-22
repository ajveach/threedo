(function(){
	var _spaces = {};
	Object.defineProperty(threedo,"spaces",{
		get : function(){ return _spaces; }
	});

	threedo.space = function(name){
		// If string was provided, attempt to return space with matching name
		if(typeof name === "string"){
			if(_spaces[name])
				return _spaces[name];
		}
		else if(name instanceof threedo.Space){
			// Space object provided. Add to spaces list
			var Space = name;
			if(Space instanceof threedo.Space){
				_spaces[Space.name] = Space;
				return Space;
			};
		}
		else if(typeof name === 'object' && name.name){
			// options object provided. Create space from options
			var options = name;
			_spaces[options.name] = new threedo.Space(options);
			return _spaces[options.name];
		}
		return null;
	};

	threedo.space.add = function(Space){
		return this(Space);
	};
})();