(function(){
	threedo.Model = function(){

	};

	threedo.Model.prototype = {
		constructor : threedo.Model,
		extend : function(name,property){
			Object.defineProperty(this,name,property);
		}
	};
})();