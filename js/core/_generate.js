(function(){
	/**
	 * threedo.generate is called on page ready to create object instances for each module and check dependecies
	 */
	var generate = function(){
		// Check each module's dependencies to verify each is present. If a required module is available, ensure the dependent is loading afterwards
		for(var i in this.extend.list){
			if(this.extend.list.hasOwnProperty(i)){
				var moduleOptions = this.extend.list[i];

				// Modules cannot use the names of core threedo properties
				if(threedo[moduleOptions.name])
					throw "Modules cannot use the names of core threedo properties. You cannot add a module named \""+moduleOptions.name+"\".";

				if(typeof moduleOptions.requirements === "object" && typeof moduleOptions.requirements.modules === "object" && moduleOptions.requirements.modules){
					var moduleRequirements = moduleOptions.requirements.modules;
					// Assume array of module names was provided
					for(var k in moduleRequirements){
						if(moduleRequirements.hasOwnProperty(k)){
							// Check if module is available
							if(!this.extend.list[moduleRequirements[k]])
								throw "The module \""+moduleOptions.name+"\" requires the module \""+moduleRequirements[k]+"\", but it was not included in this build.";
							else{
								// Module is available, add it (and its required module if necessary) to the load order
								addToLoadOrder(moduleOptions.name,moduleRequirements[k]);
							}
						}
					}
				}
				else if(typeof moduleOptions.requirements === "object" && typeof moduleOptions.requirements.modules === 'string'){
					var moduleRequirement = moduleOptions.requirements.modules;
					// A single module name was provided. Check to see if module is available
					if(!this.extend.list[moduleRequirement])
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

		// All modules are present and load order is generated. Create module objects
		createInstance(loadOrder);
	};

	var loadOrder = [];

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

	var createInstance = function(loadOrder,index){
		var index = index || 0;

		if(loadOrder[index]){
			var name = loadOrder[index],
					moduleOptions = threedo.extend.list[name];

			// Add callback data to moduleOptions for async load
			moduleOptions.generate = {
				next : createInstance,
				loadOrder : loadOrder,
				index : ++index
			};

			//Create object
			threedo[name] = new moduleOptions.Module(moduleOptions);
		}
	};

	threedo.generate = generate;
})();