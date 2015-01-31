(function(){
	threedo.Node3D = function(options){
		threedo.Node.call(this,options.name);

		// Some classes inherit from Node3D and do not want an object3D property
		if(!options.noObject3D){
			var _object3D;
			Object.defineProperty(this,"Object3D",{
				get:function(){ return _object3D; },
				set:function(value){ _object3D = value; }
			});
		}

		// Position property
		Object.defineProperty(this, "position", {
			get : function(){ 
				if(_object3D)
					return _object3D.position;
				else if(this.Mesh)
					return this.Mesh.position;
				else if(this.container)
					return this.container.position;
			},
			set : function(pos){
				if(_object3D)
					_object3D.position.set(pos.x,pos.y,pos.z);
				else if(this.Mesh)
					this.Mesh.position.set(pos.x,pos.y,pos.z);
				else if(this.container)
					this.container.position.set(pos.x,pos.y,pos.z);
			}
		});

		this.type = "Node3D";
	};

	threedo.Node3D.prototype = Object.create(threedo.Node.prototype);
	threedo.Node3D.constructor = threedo.Node3D;
})();