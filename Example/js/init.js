$(function(){
	threedo.scene.init(function(){
		threedo.loading(true);

		threedo.scene.backgroundColor(0x000000);

		threedo.UI.text({
			name : "threedoLogo",
			text:"threedo",
			class:"threedo-UI-logo"
		});

		// Disable context menu
		threedo.scene.$container.on('contextmenu',function(e){e.preventDefault();});

		// Create skybox
		var prefix = "img/textures/skybox/";
		threedo.scene.skybox([
			prefix + "xpos.png",
			prefix + "xneg.png",
			prefix + "ypos.png",
			prefix + "yneg.png",
			prefix + "zpos.png",
			prefix + "zneg.png"
		]);

		// Create threedo space
		threedo.space({
			name : "solarSystem"
		}).node({
			name : "Earth",
			type : window.Planet
		});
		
		threedo.loading(false);
	});
});