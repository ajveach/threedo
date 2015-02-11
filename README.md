# threedo
A wrapper game engine for the three.js library

## Learn More
You can follow the development of threedo at http://threedo.seventy5times.com.

## Installation

## Basic Usage
*View the init.js file in the example directory to see a working example*

### Scenes
TODO: Add support and documentation for multi-scene handling

**Creating your first scene**
```
/* threedo.init(options,callback); */
threedo.init({
	name : "DemoScene"
},function(){
	// Callback fired when scene is ready. You can create models within the scene here, but that is better done in separate files to maintain organization.
});
```

### Nodes
Nodes are the primary building block for game objects in threedo. There will be a number of different types of nodes available that will all inherit from the threedo.Node object. You can create and manage nodes on your own, but they will be more effective and organized if created/added inside a space. By adding a node to a space, its update() method will automatically be fired every frame. If you don't add a node to a space, you will have to manually register its update method with threedo.update().

Most Nodes used will actually inherit from Node3D. These includes Lights, Cameras, Meshes, and primitive Objects (Cube, Sphere, ...).

**Creating a node**

```
// Create a Light
new threedo.Light({
	name : "light",
	color : 0xffffff,
	position : [0,0,10]
});

// Create a cube
var demoCube = new threedo.Cube({
	name : "demoCube",
	color : 0xff00ff,
	scale : new THREE.Vector3(1,1,2),
	rotation : new THREE.Euler(1,1,1,'XYZ'),
	position : new THREE.Vector3(-2,-1,0)
});

// Apply movement to the cube
demoCube.update = function(){
	this.Mesh.rotation.x += .01;
	this.Mesh.rotation.y += .01;
	this.Mesh.scale.z = Math.abs(Math.sin(threedo.update.time));
	this.Mesh.position.y = Math.sin(threedo.update.time);
};
```

### UI
The threedo UI system will soon be rebuilt to properly reflect the changes to threedo's model structure. This documentation will be reflected to show those changes when implemented.

```
// Create a text UI element
threedo.UI.text({
	name : "threedoLogo",
	text:"threedo",
	class:"threedo-UI-logo"
});
```

## Next Steps
