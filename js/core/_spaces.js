(function(){
	var _spaces = {};
	threedo.spaces = function(Space){
		// If string was provided, attempt to return space with matching name
		if(typeof Space === "string"){
			if(_spaces[Space])
				return _spaces[Space];
			else
				return null;
		}
		else if(Space instanceof threedo.Space){
			_spaces[Space.name] = Space;
		}
		return _spaces;
	};
})();