(function(){
	var DemoModule = function(options){
		threedo.Module.call(this,options);

	};

	DemoModule.prototype = Object.create(threedo.Module.prototype);
	DemoModule.prototype.constructor = DemoModule;


	// Add module to threedo
	threedo.extend({
		name : "DemoModule",
		Module : DemoModule
	});
})();