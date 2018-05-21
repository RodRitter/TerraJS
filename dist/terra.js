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

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),

/***/ "./src/core/component.js":
/*!*******************************!*\
  !*** ./src/core/component.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = exports.Component = function () {
  function Component(id, data) {
    _classCallCheck(this, Component);

    /**
     * @type {string}
     */
    this.id = id;

    /**
     * @type {Object}
     */
    this.data = data;

    /**
     * @type {Entity}
     */
    this.entity = null;
  }

  /**
   * This is called when it is attached to an Entity
   */


  _createClass(Component, [{
    key: "onAttach",
    value: function onAttach() {}

    /**
     * This is called when it is detatched from an Entity
     */

  }, {
    key: "onDetatch",
    value: function onDetatch() {}
  }]);

  return Component;
}();

/***/ }),

/***/ "./src/core/entity.js":
/*!****************************!*\
  !*** ./src/core/entity.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = exports.Entity = function () {
    function Entity(id, game, components) {
        _classCallCheck(this, Entity);

        /**
         * @type {string}
         */
        this.id = id;

        /**
         * @type {Object}
         */
        this.componentMap = {};

        /**
         * @type {Game}
         */
        this.game = game;

        /**
         * @type {number}
         */
        this.x = 0;

        /**
         * @type {number}
         */
        this.y = 0;

        if (components) {
            for (var i = 0; i < components.length; i++) {
                this.attach(components[i]);
            }
        }
    }

    /**
     * Attach a Component to this Entity
     * @param {Component} component
     */


    _createClass(Entity, [{
        key: "attach",
        value: function attach(component) {
            if (this.componentMap[component.id] === undefined) {
                this.componentMap[component.id] = component;

                if (this.game.components[component.id] === undefined) {
                    this.game.components[component.id] = [];
                }
                this.game.components[component.id].push(component);
                component.entity = this;
                component.onAttach();
            } else {
                throw "There is already a component with the ID '" + component.id + "'";
            }
        }

        /**
         * Detatch a component from entity
         * @param {string} ID of component
         */

    }, {
        key: "detatch",
        value: function detatch(id) {
            var _this = this;

            this.componentMap[id].onDetatch(); // First call onDetatch before removing it
            delete this.componentMap[id]; // Remove from Entity map

            // Remove from Game global component list
            this.game.components[id].forEach(function (component) {
                if (component.entity.id == _this.id) {
                    var index = _this.game.components[id].indexOf(component);
                    if (index > -1) {
                        _this.game.components[id].splice(index, 1);
                    }
                }
            });
        }

        /**
         * Find a specific Component from this Entity
         * @param {string} id - ID of the component
         * @return {Component}
         */

    }, {
        key: "find",
        value: function find(id) {
            if (this.componentMap[id] !== undefined) {
                return this.componentMap[id];
            }
            throw new Error("Cannot find Component '" + id + "' on Entity '" + this.id + "'");
        }
    }]);

    return Entity;
}();

/***/ }),

/***/ "./src/core/game.js":
/*!**************************!*\
  !*** ./src/core/game.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Game = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entity = __webpack_require__(/*! ./entity.js */ "./src/core/entity.js");

var _system = __webpack_require__(/*! ./system.js */ "./src/core/system.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = exports.Game = function () {

    /**
     * The Game class takes in dimensions of the game screen
     * @param {number} width width of game screen
     * @param {number} height height of game screen
     */
    function Game(width, height) {
        _classCallCheck(this, Game);

        /**
         * @type {number}
         */
        this.width = width;

        /**
         * @type {number}
         */
        this.height = height;

        /**
         * @type {Object}
         */
        this.entities = {};

        /**
         * @type {Object}
         */
        this.components = {};

        /**
         * @type {Object}
         */
        this.systems = {};

        /**
         * @type {Object}
         */
        this.callbacks = {};

        /**
         * @type {Array}
         */
        this.callbacks.onStart = [];

        /**
         * @type {Array}
         */
        this.callbacks.onUpdate = [];
    }

    /**
     * The game start function. Use onStart() callback to hook in here
     */


    _createClass(Game, [{
        key: 'start',
        value: function start() {
            // Renderer Setup
            this.setupCanvas();

            this.onStart();

            // Run start callbacks
            this.callbacks.onStart.forEach(function (systemObj) {
                systemObj.callback(systemObj.system);
            });

            // Start game loop
            window.requestAnimationFrame(this.update.bind(this));
        }

        /**
         * The game update function. Use onUpdate() callback to hook into here
         */

    }, {
        key: 'update',
        value: function update(time) {
            this.onUpdate(time);

            this.callbacks.onUpdate.forEach(function (systemObj) {
                systemObj.callback(systemObj.system, time);
            });

            window.requestAnimationFrame(this.update.bind(this));
        }

        /**
         * The game update that happens every game frame/tick.
         */

    }, {
        key: 'onUpdate',
        value: function onUpdate(time) {}
        // Override


        /**
         * The intialization function for the game.
         */

    }, {
        key: 'onStart',
        value: function onStart() {}
        // Override


        /**
         * Create an array of entities & add them to the game
         * @param {Entity[]} entities An array of entities
         */

    }, {
        key: 'createEntities',
        value: function createEntities(entities) {
            for (var i = 0; i < entities.length; i++) {
                if (entities[i] instanceof _entity.Entity) {
                    this.addEntity(entities[i]);
                } else {
                    throw new TypeError('Trying to add an entity which is not of type \'Entity\'');
                }
            }
        }

        /**
         * Create & add a single entity
         * @param {Entity} entity
         */

    }, {
        key: 'addEntity',
        value: function addEntity(entity) {
            if (entity instanceof _entity.Entity) {
                this.entities[entity.id] = entity;
                entity.game = this;
            } else {
                throw new TypeError('Trying to add an entity which is not of type \'Entity\'');
            }
        }

        /**
         * Register a system in the game instance
         * @param {System} system
         * @return {System}
         */

    }, {
        key: 'addSystem',
        value: function addSystem(system) {
            if (this.systems[system.id] === undefined && system instanceof _system.System) {
                system.game = this;
                this.systems[system.id] = system;
                this.callbacks.onStart.push({ system: system, callback: system.onStart });
                this.callbacks.onUpdate.push({ system: system, callback: system.onUpdate });
                return system;
            } else {
                throw new TypeError('Trying to add system which is not type of \'System\'');
            }
        }

        /**
         * Retrieve an entity
         * @param {string} id - The ID of the entity
         * @return {Entity} Returns the matching entity
         */

    }, {
        key: 'getEntity',
        value: function getEntity(id) {
            if (this.entities[id] !== undefined) {
                return this.entities[id];
            }
        }

        /**
         * Retrieves all entities that have all provided components.
         * @param {string[]} components - A list of component ID's to match against
         * @return {Entity[]}
         */

    }, {
        key: 'getEntitiesWith',
        value: function getEntitiesWith(components) {
            var _this = this;

            var entities = [];

            var _loop = function _loop(i) {
                var entity = _this.entities[Object.keys(_this.entities)[i]];
                var count = 0;
                var target = components.length;

                var _loop2 = function _loop2(j) {
                    var key = Object.keys(entity.componentMap)[j];
                    var result = components.find(function (c) {
                        return c == entity.componentMap[key].id;
                    });
                    if (result) count++;
                };

                for (var j = 0; j < Object.keys(entity.componentMap).length; j++) {
                    _loop2(j);
                }

                if (count == target) {
                    entities.push(entity);
                }
            };

            for (var i = 0; i < Object.keys(this.entities).length; i++) {
                _loop(i);
            }
            return entities;
        }

        /**
         * Retrive a system in the game
         * @param {string} id - The ID of the system
         */

    }, {
        key: 'getSystem',
        value: function getSystem(id) {
            return this.systems[id];
        }

        /**
         * Retrieves a component from a specific entity
         * @param {string} entityId - The entity to retrieve the component from
         * @param {string} componentId - The component ID
         * @return {Component}
         */

    }, {
        key: 'getComponentFromEntity',
        value: function getComponentFromEntity(entityId, componentId) {
            return this.getEntity(entityId).find(componentId);
        }
    }, {
        key: 'setupCanvas',
        value: function setupCanvas() {
            var canvas = document.createElement('canvas');
            canvas.setAttribute('width', this.width + 'px');
            canvas.setAttribute('height', this.height + 'px');
            document.body.appendChild(canvas);
            Game.ctx = canvas.getContext('2d');
        }
    }]);

    return Game;
}();

/***/ }),

/***/ "./src/core/system.js":
/*!****************************!*\
  !*** ./src/core/system.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var System = exports.System = function () {
    function System(id, onStart, onUpdate) {
        _classCallCheck(this, System);

        /**
         * @type {string}
         */
        this.id = id;

        /**
         * @type {Game}
         */
        this.game = null;

        /**
         * @type {function}
         */

        this.onStart = onStart;
        this.onUpdate = onUpdate;
    }

    /**
     * Retrieves an Entity from the Game
     * @param {string} id - ID of the entity
     * @return {Entity}
     */


    _createClass(System, [{
        key: "getEntity",
        value: function getEntity(id) {
            if (this.game !== null) {
                return this.game.getEntity(id);
            }
        }

        /**
         * Retrieves a Components from a specific Entity
         * @param {string} entityId - The ID of the Entity
         * @param {string} componentId - The ID of the Component
         */

    }, {
        key: "getComponentFromEntity",
        value: function getComponentFromEntity(entityId, componentId) {
            if (this.game) {
                return this.game.getEntity(entityId).getComponent(componentId);
            }
        }
    }]);

    return System;
}();

/***/ }),

/***/ "./src/terra.js":
/*!**********************!*\
  !*** ./src/terra.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _game = __webpack_require__(/*! ./core/game.js */ "./src/core/game.js");

var _entity = __webpack_require__(/*! ./core/entity.js */ "./src/core/entity.js");

var _component = __webpack_require__(/*! ./core/component.js */ "./src/core/component.js");

var _system = __webpack_require__(/*! ./core/system.js */ "./src/core/system.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This is the global class for accessing the framework from your document
 */
var Terra = function Terra() {
    _classCallCheck(this, Terra);

    this.Game = _game.Game;

    // Base Classes
    this.Entity = _entity.Entity;
    this.Component = _component.Component;
    this.System = _system.System;
};

global.Terra = new Terra();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ })

/******/ });
//# sourceMappingURL=terra.js.map