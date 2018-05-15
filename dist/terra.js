/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/terra.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/component.js":
/*!*******************************!*\
  !*** ./src/core/component.js ***!
  \*******************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
class Component {
    constructor(id, data) {
        this.id = id;
        this.data = data;
        this.entity = null;
    }

    onAttach(entity) {
        console.log(`Attached '${this.id}' to '${entity.id}'`);
    }
}

/***/ }),

/***/ "./src/core/entity.js":
/*!****************************!*\
  !*** ./src/core/entity.js ***!
  \****************************/
/*! exports provided: Entity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Entity", function() { return Entity; });
class Entity {
    constructor(id, game, components) {
        this.id = id;
        this.componentMap = {};
        this.game = game;

        for (let i = 0; i < components.length; i++) {
            this.attachComponent(components[i]);
        }
    }

    attachComponent(component) {
        if (this.componentMap[component.id] === undefined) {
            this.componentMap[component.id] = component;

            if (this.game.components[component.id] === undefined) {
                this.game.components[component.id] = [];
            }
            this.game.components[component.id].push(component);
            component.onAttach(this);
        } else {
            throw `There is already a component with the ID '${component.id}'`;
        }
    }

    getComponent(id) {
        if (this.componentMap[id] !== undefined) {
            return this.componentMap[id];
        }
        throw `Cannot find Component '${id}' on Entity '${this.id}'`;
    }

}

/***/ }),

/***/ "./src/core/game.js":
/*!**************************!*\
  !*** ./src/core/game.js ***!
  \**************************/
/*! exports provided: Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return Game; });
class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.entities = {};
        this.components = {};
        this.systems = {}; // Is this needed? Callbacks below

        // System Callbacks
        this.callbacks = {};
        this.callbacks.onStart = [];
        this.callbacks.onUpdate = [];
    }

    start() {
        // Run start callbacks
        this.callbacks.onStart.forEach(systemObj => {
            systemObj.callback(systemObj.system);
        });

        // Start game loop
        window.requestAnimationFrame(this.update.bind(this));
    }

    update(time) {
        this.callbacks.onUpdate.forEach(systemObj => {
            systemObj.callback(systemObj.system, time);
        });

        this.onUpdate(time);
        window.requestAnimationFrame(this.update.bind(this));
    }

    onUpdate(time) {
        // Override
    }

    width() {
        return this.width;
    }

    height() {
        return this.height;
    }

    createEntities(entities) {
        for (let i = 0; i < entities.length; i++) {
            this.addEntity(entities[i]);
        }
    }

    createSystem(system) {
        if (this.systems[system.id] === undefined) {
            system.game = this;
            this.systems[system.id] = system;
            this.callbacks.onStart.push({ system: system, callback: system.onStart });
            this.callbacks.onUpdate.push({ system: system, callback: system.onUpdate });
            return system;
        }
    }

    addEntity(entity) {
        if (this.entities[entity.id] === undefined) {
            this.entities[entity.id] = entity;
            entity.game = this;
        }
    }

    getEntity(id) {
        if (this.entities[id] !== undefined) {
            return this.entities[id];
        }
        throw `Cannot find Entity with id '${id}'`;
    }

    getEntitiesWith(components) {
        let entities = [];

        for (let i = 0; i < Object.keys(this.entities).length; i++) {
            let entity = this.entities[Object.keys(this.entities)[i]];
            let count = 0;
            let target = components.length;

            for (let j = 0; j < Object.keys(entity.componentMap).length; j++) {
                let key = Object.keys(entity.componentMap)[j];
                let result = components.find(c => c == entity.componentMap[key].id);
                if (result) count++;
            }

            if (count == target) {
                entities.push(entity);
            }
        }
        return entities;
    }

    getComponents(id) {
        return this.components[id];
    }

    getComponentFromEntity(entityId, componentId) {
        return this.getEntity(entityId).getComponent(componentId);
    }
}

/***/ }),

/***/ "./src/core/system.js":
/*!****************************!*\
  !*** ./src/core/system.js ***!
  \****************************/
/*! exports provided: System */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "System", function() { return System; });
class System {
    constructor(id, onStart, onUpdate) {
        this.id = id;
        this.game = null;
        this.onStart = onStart;
        this.onUpdate = onUpdate;
    }

    getEntity(id) {
        if (this.game !== null) {
            this.game.getEntity(id);
        }
    }

    getComponentFromEntity(entityId, componentId) {
        if (this.game) {
            return this.game.getEntity(entityId).getComponent(componentId);
        }
    }
}

/***/ }),

/***/ "./src/terra.js":
/*!**********************!*\
  !*** ./src/terra.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/game.js */ "./src/core/game.js");
/* harmony import */ var _core_entity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/entity.js */ "./src/core/entity.js");
/* harmony import */ var _core_component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/component.js */ "./src/core/component.js");
/* harmony import */ var _core_system_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/system.js */ "./src/core/system.js");





class Terra {
    constructor() {
        this.Game = _core_game_js__WEBPACK_IMPORTED_MODULE_0__["Game"];

        // Base Classes
        this.Entity = _core_entity_js__WEBPACK_IMPORTED_MODULE_1__["Entity"];
        this.Component = _core_component_js__WEBPACK_IMPORTED_MODULE_2__["Component"];
        this.System = _core_system_js__WEBPACK_IMPORTED_MODULE_3__["System"];
    }
}

window.Terra = new Terra();

/***/ })

/******/ });
//# sourceMappingURL=terra.js.map