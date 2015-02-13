(function(){
	threedo.Node = function(name){
		threedo.Model.call(this);

		if(!name)
			throw "A valid name was not provided to create this node";

		this.type = "Node";

		var _name = name;
		Object.defineProperty(this,"name",{
			get:function(){ return _name; },
			set:function(value){ _name = value; }
		});

		var _active = true;
		Object.defineProperty(this,"active",{
			get:function(){ return _active; },
			set:function(value){ _active = value; }
		});

		var _update = null;
		Object.defineProperty(this,"update",{
			get:function(){ return _update; },
			set:function(value){
				if(!value){
					threedo.scene.update.remove(this);
					_update = null;
				}
				else if(typeof value !== "function")
					throw "The value provided for this node's \"update\" method must be a function";
				else{
					_update = value;
					threedo.scene.update.add(this);
				}
			}
		});

		var _fixedUpdate = null;
		Object.defineProperty(this,"fixedUpdate",{
			get:function(){ return _fixedUpdate; },
			set:function(value){
				if(!value){
					threedo.scene.fixedUpdate.remove(this);
					_fixedUpdate = null;
				}
				else if(typeof value !== "function")
					throw "The value provided for this node's \"fixedUpdate\" method must be a function";
				else{
					_fixedUpdate = value;
					threedo.scene.fixedUpdate.add(this);
				}
			}
		});
	};

	threedo.Node.prototype = Object.create(threedo.Model.prototype);
	threedo.Node.prototype.constructor = threedo.Node;
})();