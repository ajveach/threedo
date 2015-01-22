(function(){
	threedo.Space = function(options){
		threedo.Node.call(this,options.name);

		this.type = "Space";

		var _nodes = {};
		Object.defineProperty(this,"nodes",{
			get:function(){return _nodes;}
		});

		/**
		 * Method registered with threedo's frame update list. It will be called once every frame
		 */
		var _update = function(){
			for (var index in _nodes){
				var node = _nodes[index];
				if (node instanceof threedo.Node && typeof node.update === 'function')
					node.update();
			}
		};
		threedo.update.add("threedo.space[\""+this.name+"\"].update",_update);

		this.node = function(name){
			if(typeof name === 'string'){
				// String was provided. Assume it is node name and fetch associated node in this space
				if(_nodes[name])
					return _nodes[name];
			}
			else if(name instanceof threedo.Node){
				// Node type object provided. Add it to nodes list
				var Node = name;
				_nodes[Node.name] = Node;
				return Node;
			}
			else if(typeof name === 'object'){
				// Object was provided. Create new Node with attributes in object
				var options = name;
				if(options.type && options.name){
					// A type was provided that matches something in threedo. Assume it is a valid Node type
					// TODO: Add check to see if threedo[options.type] is a valid Node type
					var Node = null;
					if(typeof options.type === 'function')
						Node = new options.type(options);
					else if(options.type === 'string' && typeof threedo[options.type] === 'function')
						Node = new threedo[options.type](options);
					
					if(Node)
						_nodes[options.name] = Node;
					
					return Node;
				}
			}

			return null;
		};

		this.node.add = function(Node){
			return this(Node);
		};
	};

	threedo.Space.prototype = Object.create(threedo.Node.prototype);
	threedo.Space.prototype.constructor = threedo.Space;
})();