(function(){
	var spaces = function(Space){
		// If string was provided, attempt to return space with matching name
		if(typeof Space === "string"){
			if(threedo._spaces[Space])
				return threedo._spaces[Space];
			else
				return null;
		}
		else if(typeof Space === "object" && Space['name']){
			threedo._spaces[Space['name']()] = Space;
		}
		return threedo._spaces;
	};

	threedo.spaces = spaces;
	threedo._spaces = {};
})();