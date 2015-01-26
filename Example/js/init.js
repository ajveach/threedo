$(function(){
	threedo.scene.init(function(){
		threedo.loading(true);

		threedo.scene.backgroundColor(0xccccff);

		threedo.scene.camera.position(0,0,10);

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

		threedo.space({
			name : "main"
		}).node(new threedo.Light({
			name : "light",
			color : 0xffffff,
			position : [0,0,10]
		}));

		threedo.space("main").node(new threedo.Cube({
			name : "myCube",
			color : 0xff00ff,
			scale : new THREE.Vector3(1,1,2),
			rotation : new THREE.Euler(1,1,1,'XYZ'),
			position : new THREE.Vector3(-1,-1,0)
		})).update = function(){
			this.Mesh.rotation.x += .01;
			this.Mesh.rotation.y += .01;
		};

		threedo.space("main").node(new threedo.Sphere({
			name : "mySphere",
			color : 0xff0000,
			position : new THREE.Vector3(1,1,0),
			segments : [16,16]
		})).update = function(){
			this.Mesh.rotation.y += .02;
			this.Mesh.rotation.z += .01;
			this.Mesh.scale.x = Math.abs(Math.sin(threedo.update.time));
		};
		
		threedo.loading(false);
	});
});