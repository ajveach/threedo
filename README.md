# threedo
A wrapper game engine for the three.js library

## Installation

## Basic Usage

### Spaces
Spaces in threedo are similar to namespaces, and are not related to any 2D or 3D space. Spaces are containers for nodes, and can include other functionality as well. Use spaces to organize your code structure, and to easily chain calls to individual nodes.

**Creating a space**

*NOTE: You can create and manage a space on your own, but by calling threedo.spaces() threedo will track the space for you.*

```
// Create the space
var space = new threedo.Space({name:"myFirstSpace"});
// Add it to threedo's spaces library
threedo.space.add(space);

// This is the shorthand method
threedo.space({name:"myFirstSpace"});
```

### Nodes
Nodes are the primary building block for game objects in threedo. There will be a number of different types of nodes available that will all inherit from the threedo.Node object. You can create and manage nodes on your own, but they will be more effective and organized if created/added inside a space. By adding a node to a space, its update() method will automatically be fired every frame. If you don't add a node to a space, you will have to manually register its update method with threedo.update().

**Creating a node**

```
// Create a 3D node
var node = new threedo.Node3D({name:"bigMonster"});
// Add the node to a space
threedo.space('myFirstSpace').node.add(node);

// This is the shorthand method
threedo.space('myFirstSpace').node({name : "bigMonster", type : threedo.Node3D});
```

*NOTE: You can chain node and space creation together*

```
threedo
	.space.add(new threedo.Space({name:"myFirstSpace"}))
	.node.add(new threedo.Node3D({name:"bigMonster"}))
		.name;

// This is the combined shorthand method
threedo.space({name : "myFirstSpace"}).node({name : "bigMonster", type : threedo.Node3D});
```

**Using nodes in the space**

```
threedo.space('myFirstSpace').node('bigMonster').name;
```

### Scenes
TODO: Add support and documentation for multi-scene handling

**Creating a scene**
```
threedo.scene.init(callback)
```

## Next Steps
