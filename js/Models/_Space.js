(function(){
	threedo.Space = function(options){
		threedo.Node.call(this,options.name);

		this.type = "Space";

		var _nodes = {};
		Object.defineProperty(this,"nodes",{
			get:function(){return _nodes;}
		});

		this.node = function(name){
			if(_nodes[name])
				return _nodes[name];
			return null;
		};

		this.node.add = function(Node){
			if(Node instanceof threedo.Node){
				_nodes[Node.name] = Node;
				return Node;
			}
			return false;
		};
	};

	threedo.Space.prototype = Object.create(threedo.Node.prototype);
	threedo.Space.prototype.constructor = threedo.Space;
})();