(function(){
	/**
	 * threedo.package generates the application package during initialization. This is used to instantiate all modules
	 */
	var package = function(next){
		if(typeof next === "function")
			callback = next;

		generateLoadOrder();

		threedo.package.loadOrder = loadOrder;

		// An array load order has been created. This method will recursively instance all modules in the package
		threedo.package.instance(function(){
			threedo.initialized = true;
			if(typeof callback === "function")
				callback();
		});
	};

	var loadOrder = [];
	var list = null;
	var generateLoadOrder = function(){
		// Set the list of modules as variable "list"
		list = threedo.extend.list;

		// Check each module's dependencies to verify each is present. If a required module is available, ensure the dependent is loading afterwards
		for(var i in list){
			if(list.hasOwnProperty(i)){
				var moduleOptions = list[i];

				// Modules cannot use the names of core threedo properties
				if(threedo[moduleOptions.name])
					throw "Modules cannot use the names of core threedo properties. You cannot add a module named \""+moduleOptions.name+"\".";

				// Check if an array of requirements was provided
				if(typeof moduleOptions.requirements === "object" && typeof moduleOptions.requirements.modules === "object" && moduleOptions.requirements.modules){
					var moduleRequirements = moduleOptions.requirements.modules;
					// Assume array of module names was provided
					for(var k in moduleRequirements){
						if(moduleRequirements.hasOwnProperty(k)){
							// Check if module is available
							if(!list[moduleRequirements[k]])
								throw "The module \""+moduleOptions.name+"\" requires the module \""+moduleRequirements[k]+"\", but it was not included in this build.";
							else{
								// Module is available, add it (and its required module if necessary) to the load order
								addToLoadOrder(moduleOptions.name,moduleRequirements[k]);
							}
						}
					}
				}
				// Check if a single module name string was provided
				else if(typeof moduleOptions.requirements === "object" && typeof moduleOptions.requirements.modules === 'string'){
					var moduleRequirement = moduleOptions.requirements.modules;
					// A single module name was provided. Check to see if module is available
					if(!list[moduleRequirement])
						throw "The module \""+moduleOptions.name+"\" requires the module \""+moduleRequirement+"\", but it was not included in this build.";
					else
						addToLoadOrder(moduleOptions.name,moduleRequirement);
				}
				else{
					// Module has no requirements. Add it to load order
					addToLoadOrder(moduleOptions.name);
				}
			}
		}
	};

	var addToLoadOrder = function(module, requiredModule){
		var moduleIndex = loadOrder.indexOf(module);

		if(requiredModule){
			var requiredModuleIndex = loadOrder.indexOf(requiredModule);

			// If the required module doesn't already exist in the load order, add it to the end
			if(requiredModuleIndex < 0)
				requiredModuleIndex = loadOrder.push(requiredModule) - 1;

			if(moduleIndex < 0){
				// Module is not yet in load order. Add it to the end
				loadOrder.push(module);
			}
			else{
				// Module already exists in load order. Move it to end
				loadOrder.push(loadOrder.splice(moduleIndex,1));
			}
		}
		else{
			// This module has no dependencies. Only add it if it is not already in the load order
			if(moduleIndex < 0){
				// Module is not yet in load order. Add it to end
				loadOrder.push(module);
			}
		}
	};

	/**
	 * Method to individually instance each module via callbacks
	 */
	package.instance = function(next){
		// Find the next uninitialized package and initialize the module
		for(var i in loadOrder){
			if(loadOrder.hasOwnProperty(i) && !list[loadOrder[i]].initialized){
				list[loadOrder[i]].initialized = true;
				threedo[loadOrder[i]] = new list[loadOrder[i]].Module(list[loadOrder[i]],function(){
					threedo.package.instance(next);
				});
				return;
			}
		}

		// No more modules need to be instanced. Fire callback
		next();
	};

	var callback = null;

	threedo.package = package;
})();