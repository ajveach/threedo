(function(){
	threedo.Node3D = function(options){
		threedo.Node.call(this,options.name);

		this.type = "Node3D";
	};

	threedo.Node3D.prototype = Object.create(threedo.Node.prototype);
	threedo.Node3D.constructor = threedo.Node3D;
})();