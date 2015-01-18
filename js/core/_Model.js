(function(){
	var Model = function(attributes,options){
		var obj = {};

		var f = function(val){
			if(val)
				this._value = val;
			return this._value;
		};
			
		for(var i = 0; i < attributes.length; i += 1){
			obj[attributes[i]] = f.bind({_value:options[attributes[i]]});
		}

		return obj;
	};

	threedo.Model = Model;
})();