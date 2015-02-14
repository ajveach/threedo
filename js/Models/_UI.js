(function(){
	threedo.UI = function(options){
		var options = options || {};
		threedo.Node.call(this,options.name);

		/**
		 * A UI object's persist property will determine if it is destroyed on scene change
		 * @type {Boolean}
		 */
		var _persist = false;
		Object.defineProperty(this,"persist",{
			get : function(){ return _persist; },
			set : function(value){
				if(typeof value !== "boolean")
					throw "This UI object's persist property must be of type boolean";
				_persist = value;
			}
		});
		this.persist = options.persist || false;

		/**
		 * The context property will determine in what area the UI element is rendered. It can be "global" or a jQuery object container. If no context is provided global will be assumed
		 * @type {mixed}
		 */
		var _context = "global";
		Object.defineProperty(this,"context",{
			get : function(){ return _context; },
			set : function(value){
				if(!value)
					_context = "global";
				else if(value !== "global" && !(value instanceof jQuery))
					throw "This UI object must be provided a jQuery container or \"global\" string as context";
				else
					_context = value;
			}
		});
		this.context = options.context || "global";

		/**
		 * The $ property is the jQuery object used to manage this UI element in the DOM
		 * @type {[type]}
		 */
		var _$ = $("<div />").addClass("threedo-UI").attr('data-name',this.name);
		Object.defineProperty(this,"$",{
			get : function(){ return _$; }
		});

		/**
		 * The class property will populate the DOM's containing div element with both its custom class(es) and any additional classes assigned by inheriting UI object types
		 * @type {String}
		 */
		var _class = "";
		Object.defineProperty(this,"class",{
			get : function(){ return _class; },
			set : function(value){
				_class = value;
				this.$.removeClass().addClass('threedo-UI '+ (this.typeSpecificClass ? this.typeSpecificClass : "") + " " + _class);
			}
		});
		if(typeof options.class === "string")
			this.class = options.class;

		/**
		 * The position property is of type object (top,right,bottom,left). It can be provided an array or object with properties top,right,left,bottom
		 * @type {object}
		 */
		var _position = {
			top:0,
			right:null,
			bottom:null,
			left:0
		};
		Object.defineProperty(this,"position",{
			get : function(){ return _position; },
			set : function(value){
				if(typeof value !== "object")
					throw "This UI object must be provided a position as an array or object";
				else if(Object.prototype.toString.call( value ) === '[object Array]'){
					// value is an array. It will be assumed to be in the format of [top,right,bottom,left]
					_position.top 		= typeof value[0] === 'number' ? value[0] : null;
					_position.right 	= typeof value[1] === 'number' ? value[1] : null;
					_position.bottom 	= typeof value[2] === 'number' ? value[2] : null;
					_position.left 		= typeof value[3] === 'number' ? value[3] : null;
				}
				else{
					// value is an object. Assume it has properties for top,right,bottom,left (or combination of some properties)
					_position.top 		= typeof value.top 		=== 'number' ? value.top : null;
					_position.right 	= typeof value.right 	=== 'number' ? value.right : null;
					_position.bottom 	= typeof value.bottom === 'number' ? value.bottom : null;
					_position.left 		= typeof value.left 	=== 'number' ? value.left: null;
				}
				// The only requirements here are that either top or bottom is set and either left or right is set. If neither is set of either option, 0 will be set for top/left
				if(_position.top === null && _position.bottom === null)
					_position.top = 0;
				if(_position.left === null && _position.right === null)
					_position.left = 0;

				// Reposition via CSS
				this.position.refresh();
			}
		});
		/**
		 * The position.refresh method can be called to place the DOM element in the correct location. It will automatically be fired whenever the position property is updated and when the renderer's container is resized
		 */
		this.position.refresh = function(){
			if(typeof _position.left === "number")
				_$.css("left",_position.left);
			else if(typeof _position.right === "number")
				_$.css("left",threedo.scene.renderer.width - _position.right);

			if(typeof _position.top === "number")
				_$.css("top",_position.top);
			else if(typeof _position.bottom === "number")
				_$.css("top",threedo.scene.renderer.height - _position.bottom);
		};

		this.position = options.position || [];


		// TODO: Add width and height properties

		threedo.scene.add(this);

		this.type = "UI";
	};

	threedo.UI.prototype = Object.create(threedo.Node.prototype);
	threedo.UI.prototype.constructor = threedo.UI;
})();