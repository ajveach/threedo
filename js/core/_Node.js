(function(){
	var Node = function(attributes,options){
		var attributes = attributes || {},
			options = options || {};

		if(!attributes['name'])
			attributes.push("name");
		if(!attributes['baseType'])
			attributes.push('baseType');

		options.baseType = "Node";

		var obj = new threedo.Model(attributes,options);

		return obj;
	};

	threedo.Node = Node;
})();