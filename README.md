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
Nodes are the primary building block for game objects in threedo. There will be a number of different types of nodes available that will all inherit from the threedo.Node object. You can create and manage nodes on your own, but they will be more effective and organized if added to a scene. By adding a node to a scene, its update() and fixedUpdate() methods will automatically be added to the queue.

The Node model will provide all inheriting objects with a name property, and update and fixedUpdate methods.

Most Nodes used will actually inherit from Node3D. These includes Lights, Cameras, Meshes, and primitive Objects (Cube, Sphere, ...). By default, all core threedo Models inheriting Node3D automatically add their object instances to the current scene.

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
The threedo UI system is being rebuilt to inherit from the threedo.Node model. Currently threedo.UI.text is the only option available. It supports positioning, custom text content, custom classes, and all of the inherited properties and methods from the Node model (name, update(), fixedUpdate(), ...).

```
// Create a text UI element
new threedo.UI.text({
	name : "threedoLogo",
	text : "threedo",
	class : "threedo-UI-logo",
	position : {
		top : 10,
		right : null,
		bottom : null,
		left : null
	}
});
```

## Next Steps
