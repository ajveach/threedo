(function(){
	threedo.UI.select = function(options){
		var thisSelect = this;

		this.typeSpecificClass = "threedo-UI-select";

		threedo.UI.call(this,options);

		// Bind events to $
		this.$.hover(function(){
			thisSelect.$.addClass('hover');
		},
		function(){
			thisSelect.collapse();
			thisSelect.$.removeClass('hover');
		});

		// Add options container to DOM
		var _$options = $("<div />").addClass('options').appendTo(this.$);

		this.expand = function(){
			thisSelect.$.children('.options').show();
		};

		this.collapse = function(){
			thisSelect.$.children('.options').hide();
		};

		this.toggle = function(){
			if(thisSelect.expanded())
				thisSelect.collapse();
			else
				thisSelect.expand();
		};

		this.expanded = function(){
			return thisSelect.$.children('.options').is(":visible");
		};

		/**
		 * the value property will be updated when the user clicks on an option, or when other scripts modify it directly. Upon changing, the event listener is fired as well as updates to the DOM
		 */
		var _value;
		Object.defineProperty(this,"value",{
			get : function(){ return _value; },
			set : function(val){
				// Check if change occurred
				if(val !== _value){
					var selectedOption;
					_value = val;
					for(var i in _options){
						if(_options.hasOwnProperty(i) && typeof _options[i] === "object"){
							_options[i].$.removeClass('selected');
							_options[i].selected = false;
							if(_options[i].value == _value){
								_options[i].selected = true;
								_options[i].$.addClass('selected');
								selectedOption = _options[i];
							}
						}
					}
					this.label = selectedOption.name;
					this.collapse();
					if(typeof this.onChange === 'function')
						this.onChange(_value);
				}
			}
		});

		/**
		 * Bind an event to the select object container jQuery object
		 * @param  {string} event The name of the event to bind. Refer to http://api.jquery.com/on/ for more information
		 * @param  {function} func  The method to call when the event is triggered
		 */
		this.on = function(event,func){
			// If a bind to the change event is requested, apply to custom onChange method because this is not a native select element
			if(event == "change")
				this.onChange = func;
			else
				thisSelect.$.on(event,func);
		};

		this.onChange = null;

		if(!options.label)
			throw "A label is required to create a UI.select object";

		var _label = null,
				_$label = null;
		Object.defineProperty(this, "label",{
			get : function(){ return _label; },
			set : function(value){
				_label = value;
				this.refreshLabel();
			}
		});

		this.refreshLabel = function(){
			if(!_$label){
				_$label = $("<div />").addClass('label').prependTo(thisSelect.$);
				$("<span />").html(thisSelect.label).appendTo(_$label);
				$("<div />").addClass('arrow-down').prependTo(_$label);
				_$label.on('click',thisSelect.toggle);
			}
			else
				_$label.children('span').html(thisSelect.label);
		};
		this.label = options.label;

		var _options = [];
		Object.defineProperty(this,"options",{
			get : function(){ return _options; }
		});

		this.options.add = function(option){
			var option = option;
			if(typeof option === 'string')
				var option = { name : option, value : option };
			option.index = _options.length;
			option.$ = $("<div />")
										.html(option.name)
										.attr('data-value',option.value)
										.attr('data-index',option.index)
										.addClass('option')
										.appendTo(_$options)
										.on('click',function(){
											thisSelect.value = thisSelect.options[option.index].value;
										});
			_options.push(option);
		};

		this.options.remove = function(index){
			_$options.children('[data-index="'+index+'"]').remove();
			delete _options[index];
			return this.options;
		};

		this.options.clear = function(){
			_options = [];
			_$options.children('.option').remove();
			return this.options;
		};

		// Populate options
		if(options.options)
			for(var i in options.options)
				if(options.options.hasOwnProperty(i))
					this.options.add(options.options[i]);

		if(this.context === "global")
			this.$.prependTo(threedo.scene.renderer.$container);
		else
			this.$.prependTo(this.context);

		this.type = "UI.select";
	};

	threedo.UI.select.prototype = Object.create(threedo.UI.prototype);
	threedo.UI.select.prototype.constructor = threedo.UI.select;
})();