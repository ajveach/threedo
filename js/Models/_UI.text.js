(function(){
	threedo.UI.text = function(options){
		this.typeSpecificClass = "threedo-UI-text";

		threedo.UI.call(this,options);

		if(!options.text)
			throw "A text UI object cannot be created without providing a text value";

		/**
		 * A UI.text object's text value, when set, will automatically update the DOM
		 * @type {string}
		 */
		var _text = null;
		Object.defineProperty(this,"text",{
			get : function(){ return _text; },
			set : function(value){
				_text = value;
				this.$.html("<span>"+_text+"</span>");
			}
		});
		this.text = options.text;

		if(this.context === "global")
			this.$.prependTo(threedo.scene.renderer.$container);
		else
			this.$.prependTo(this.context);

		this.type = "UI.text";
	};

	threedo.UI.text.prototype = Object.create(threedo.UI.prototype);
	threedo.UI.text.prototype.constructor = threedo.UI.text;
})();