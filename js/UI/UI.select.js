(function(){
	var select = function(params){
		var obj = threedo.UI.New("select",params);

		obj.add = function(name,value,bindings){
			var $option = $("<div />").addClass("option").attr('data-value',value).html(name).appendTo(this.$e.children('.options'));

			var bindings = bindings || {};

			$option.on(bindings);

			return this;
		};

		obj.expand = function(){
			obj.$e.children('.options').show();
		};

		obj.collapse = function(){
			obj.$e.children('.options').hide();
		};

		params.options = params.options || [];

		obj.$e = $("<div />").addClass("threedo-UI threedo-UI-select "+params.class).attr('data-name',params.name).prependTo(threedo.scene.$container);
		obj.position();

		var $label = $("<div />").addClass('label').html(params.text).appendTo(obj.$e);
		$("<div />").addClass('arrow-down').prependTo($label);
		$("<div />").addClass('options').appendTo(obj.$e);
		for(var i = 0; i < params.options.length; i += 1)
			obj.$e.children('.options').append("<div class='option' data-value='"+params.options[i].value+"'>"+params.options[i].name+"</div>");

		obj.$e.children('.label').click(function(e){
			obj.$e.children('.options').toggle();
		});

		obj.$e.hover(function(){
			obj.$e.addClass('hover');
		},
		function(){
			obj.collapse();
			obj.$e.removeClass('hover');
		});

		threedo.UI(obj);

		return obj;
	};

	threedo.UI.select = select;
})();