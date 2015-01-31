(function(){
	/**
	 * Method to create text UI element
	 * Required Params:
	 * 	 text (String)
	 *
	 * Optional Params:
	 *   position (Vector2)
	 *   class (String)
	 *
	 */
	var text = function(params){
		var obj = threedo.UI.New("text",params);

		if(!params.text)
			return console.log("A \"text\" option must be provided for a text UI element");

		obj.$e = $("<div />").addClass("threedo-UI threedo-UI-text "+params.class).html("<span>"+params.text+"</span>").attr('data-name',params.name).prependTo(threedo.scene.renderers.primary.$container);
		obj.position();

		threedo.UI(obj);

		return obj;
	};

	threedo.UI.text = text;
})();