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

		this.type = "Node3D";
	};

	threedo.Node3D.prototype = Object.create(threedo.Node.prototype);
	threedo.Node3D.constructor = threedo.Node3D;
})();