# threedo
A wrapper game engine for the three.js library

## Installation

## Basic Usage

### Spaces
Spaces in threedo are similar to namespaces, and are not related to any 2D or 3D space. Spaces are containers for nodes, and can include other functionality as well. Use spaces to organize your code structure, and to easily chain calls to individual nodes.

**Creating a space**

*NOTE: You can create and manage a space on your own, but by calling threedo.spaces() threedo will track the space for you*

```
// Create the space
var space = new threedo.Space({name:"myFirstSpace"});
// Add it to threedo's spaces library
threedo.spaces(space);
```

### Nodes
Nodes are the primary building block for game objects in threedo. There will be a number of different types of nodes available that will all inherit from the threedo.Node object

**Creating a node**

*NOTE: You can create and manage nodes on your own, but they will be more effective and organized if created inside a space*

```
// Create a 3D node
var node = new threedo.Node3D({name:"bigMonster"});
// Add the node to a space
threedo.space('myFirstSpace').node.add(node);
```

### Scenes
TODO: Add support and documentation for multi-scene handling

**Creating a scene**
```
threedo.scene.init(callback)
```

## Next Steps
