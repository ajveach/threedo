(function(){
	var Node3D = function(options){
		var attributes = ["obj3D","type"];
		
		var options = options || {};
		options.type = "Node3D";

		var obj = new threedo.Node(attributes,options);

		obj.position = function(x,y,z){
			var o = this.mesh() || this.obj3D();
			if(!o)
				return this;

			o.position.x = x;
			o.position.y = y;
			o.position.z = z;

			return obj;
		};

		return obj;
	};

	threedo.Node3D = Node3D;
})();