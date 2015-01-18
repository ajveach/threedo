(function(){
	var Space = function(options){
		var attributes = ["name","nodes"],
			options = options || {};

		options.nodes = {};

		var obj = new threedo.Model(attributes,options);

		obj.node = function(name){
			if(typeof name === "string"){
				if(obj.nodes()[name])
					return obj.nodes()[name];
				else
					return null;
			}
			else if(typeof name === "object" && name['name']){
				var node = name;
				// Add object as new node
				obj.nodes()[node['name']()] = node;
				return node;
			}
			return false;
		};

		return obj;
	};

	threedo.Space = Space;
})();