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

		// For now load Sol system
		/*var system = OT.planetarySystem(new OT.Model.PlanetarySystem({id:"53e6bab92512c89a0e6bb76e"}));

		system.load(function(){
			system.display().planetSelect().populate().focus();

			threedo.loading();
			if(typeof next === 'function')
				next(r);
		});*/

		threedo.loading(false);
	});
});