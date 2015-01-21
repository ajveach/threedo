(function(){
	var _spaces = {};
	Object.defineProperty(threedo,"spaces",{
		get : function(){ return _spaces; }
	});

	threedo.space = function(Space){
		// If string was provided, attempt to return space with matching name
		if(typeof Space === "string"){
			if(_spaces[Space])
				return _spaces[Space];
			else
				return null;
		}
	};

	threedo.space.add = function(Space){
		if(Space instanceof threedo.Space){
			_spaces[Space.name] = Space;
			return Space;
		};
		return false;
	};
})();