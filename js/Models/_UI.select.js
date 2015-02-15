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
			_options.push(option);
			$("<div />").html(option.name).attr('data-value',option.value).attr('data-index',_options.length - 1).addClass('option').appendTo(_$options);
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