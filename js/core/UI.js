(function(){
	var elements = {
		text : {},
		select : {}
	};

	var UI = function(type,id){
		if(elements[type] && elements[type][id])
			return elements[type][id];
		
		if(typeof type === "object"){
			var obj = type;
			elements[obj.type][obj.name] = obj;
			return obj;
		}

		return false;
	};

	UI.onResize = function(){
		$.each(elements,function(type,list){
			$.each(list,function(name,obj){
				obj.position();
			});
		});
	};

	UI.position = function(){
		console.log(this);
	};

	UI.New = function(type,params){
		if(typeof params !== "object")
			return false;

		if(!params.name)
			return false;

		var position = params.position || {
			top : 0,
			right : null,
			left : 0,
			bottom : null
		};

		params.class = params.class || "";

		var obj = {
			name : params.name,
			type : type,
			class : params.class
		};

		obj.position = function(){
			// Set position
			if(typeof obj.position.left === "number"){
				obj.$e.css("left",obj.position.left);
			}
			else if(typeof obj.position.right === "number"){
				obj.$e.css("left",threedo.scene.width() - obj.position.right);
			}

			if(typeof obj.position.top === "number"){
				obj.$e.css("top",obj.position.top);
			}
			else if(typeof obj.position.bottom === "number"){
				obj.$e.css("top",threedo.scene.height() - obj.position.bottom);
			}

			return obj;
		};

		obj.position.left = position.left;
		obj.position.right = position.right;
		obj.position.top = position.top;
		obj.position.bottom = position.bottom;

		return obj;
	};

	threedo.UI = UI;
	threedo.onResize(UI.onResize);
})();