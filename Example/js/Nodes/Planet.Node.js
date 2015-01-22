(function(){
	window.Planet = function(options){
		threedo.Node3D.call(this,options);

		this.type = "Planet";

		// This will be called every frame
		this.update = function(){

		};
	};

	window.Planet.prototype = Object.create(threedo.Node3D.prototype);
	window.Planet.prototype.constructor = window.Planet;
})();