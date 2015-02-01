(function(){
	var obj,
	loading = function(start){
		if(start){
			if(!obj){
				obj = threedo.UI.text({
					text:"Loading...",
					class:"threedo-UI-Loading",
					name:"loading"
				});
			}
			else{
				obj.$e.show();
			}
			obj.$e.children('span').css('line-height',threedo.scene.$container.height()+"px");
		}
		else{
			obj.$e.hide();
		}
	};

	threedo.loading = loading;
})();