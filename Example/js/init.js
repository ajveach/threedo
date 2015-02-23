$(function(){
	threedo.init({
		name : "demo"
	},function(){
		// Disable context menu
		//threedo.scene.$container.on('contextmenu',function(e){e.preventDefault();});

		new threedo.UI.text({
			name:"logo",
			text:"test",
			class:"threedo-UI-logo"
		});

		// Position camera
		threedo.scene.renderer.camera.position = new THREE.Vector3(0,0,80);

		threedo.scene.renderer.backgroundColor = 0xaaaaaa;

		// Create skybox
		/*var prefix = "img/textures/skybox/";
		threedo.scene.skybox = [
			prefix + "xpos.png",
			prefix + "xneg.png",
			prefix + "ypos.png",
			prefix + "yneg.png",
			prefix + "zpos.png",
			prefix + "zneg.png"
		];*/

		// Create light
		new threedo.Light({
			name : "light",
			color : 0xffffff,
			position : [0,0,10]
		});

		// Create ground
		var ground = new threedo.Cube({
			name : "ground",
			color : 0x00ff00,
			scale : new THREE.Vector3(50,5,50),
			position : new THREE.Vector3(0,-20,0)
		});
		ground.collider = true;

		// Create cube
		var myCube = new threedo.Cube({
			name : "myCube",
			color : 0xff00ff,
			scale : new THREE.Vector3(1,1,1),
			position : new THREE.Vector3(-2,20,0)
		});
		myCube.rigidbody = true;

		new threedo.Sphere({
			name : "mySphere",
			color : 0xff0000,
			position : new THREE.Vector3(1,1,0),
			segments : [16,16]
		}).update = function(){
			this.Mesh.rotation.y += .02;
			this.Mesh.rotation.z += .01;
			this.Mesh.scale.x = Math.abs(Math.sin(threedo.update.time));
		};
	});
});