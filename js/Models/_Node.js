(function(){
	threedo.Node = function(name){
		threedo.Model.call(this);

		this.type = "Node";

		var _name = name;
		Object.defineProperty(this,"name",{
			get:function(){ return _name; },
			set:function(value){ _name = value; }
		});
	};

	threedo.Node.prototype = Object.create(threedo.Model.prototype);
	threedo.Node.prototype.constructor = threedo.Node;
})();