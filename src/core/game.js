import { Entity } from './entity.js';
import { System } from './system.js';
import { Signal } from './signal.js';
import * as PIXI from 'pixi.js';

export class Game {

    /**
     * The Game class takes in dimensions of the game screen
     * @param {number} width - width of game screen
     * @param {number} height - height of game screen
     * @param {Object} extra settings for the renderer
     */
    constructor(width, height, rendererSettings) {
        /**
         * @type {boolean}
         */
        this.running = false;

        /**
         * @type {boolean}
         */
        this.hasSetup = false;

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

        /**
         * @type {Object}
         */
        this.rendererSettings = rendererSettings;

        /**
         * @type {Signal}
         */
        this.signal = new Signal();
    }

    /**
     * The game start function. Use onStart() callback to hook in here
     */
    start() {
        this.running = true;
        this._rendererSetup(this.rendererSettings);

        // Run component attach callbacks
        for(let i=0; i < Object.keys(this.entities).length; i++) {
            let entity = this.entities[Object.keys(this.entities)[i]];
            this.addEntityToStage(entity);
            for(let j=0; j < Object.keys(entity.components).length; j++) {
                entity.componentCallback(entity.components[Object.keys(entity.components)[j]]);
            }
        };

        // Run start callbacks
        this.callbacks.onStart.forEach((systemObj) => {
            systemObj.callback(systemObj.system);
        });

        this.onStart();

        // Start game loop
        global.requestAnimationFrame(this.update.bind(this));
    }

    stop() {
        this.running = false;
    }

    /**
     * The game update function. Use onUpdate() callback to hook into here
     */
    update(time) {
        if(!this.running) return;

        this.onUpdate(time);

        this.callbacks.onUpdate.forEach((systemObj) => {
            systemObj.callback(systemObj.system, time);
        });
        
        if(this.renderer) this.renderer.render(this.stage);
        global.requestAnimationFrame(this.update.bind(this));
    }

    /**
     * The game update that happens every game frame/tick.
     */
    onUpdate(time) {
        // Override
    }

    /**
     * The intialization function for the game.
     */
    onStart() {
        // Override
    }

    /**
     * Create an array of entities & add them to the game
     * @param {Entity[]} entities An array of entities
     */
    createEntities(entities) {
        for(let i=0; i<entities.length; i++) {
            if(entities[i] instanceof Entity) {
                this.addEntity(entities[i]);
            } else {
                throw new TypeError(`Trying to add an entity which is not of type 'Entity'`);
            }
        }
    }

    /**
     * Create & add a single entity
     * @param {Entity} entity
     */
    addEntity(entity) {
        if(entity instanceof Entity) {
            this.entities[entity.id] = entity;
            entity.game = this;
            entity.attachComponents();
            this.addEntityToStage(entity);
        } else {
            throw new TypeError(`Trying to add an entity which is not of type 'Entity'`);
        }
        
    }

    destroyEntity(entity) {
        if(this.entities[entity.id] !== undefined) {
            delete this.entities[entity.id];
            if(this.stage) {
                this.stage.removeChild(entity.container);
            }
        }
    }

    /**
     * Create & add multiple entities
     * @param {Entity[]} array of entities
     */
    addEntities(entities) {
        entities.forEach((entity) => {
            if(entity instanceof Entity) {
                this.entities[entity.id] = entity;
                entity.game = this;
                entity.attachComponents();
                this.addEntityToStage(entity);
            } else {
                throw new TypeError(`Trying to add an entity which is not of type 'Entity'`);
            }
        });
    }



    /**
     * Remove entity from game
     * @param {string} ID of entity
     */
    removeEntity(id) {
        if(this.entities[id] !== undefined) {
            // Remove Pixi child for this entity
            this.stage.children.forEach((child) => {
                if(child.gameId == id) {
                    this.stage.removeChild(child);
                }
            });
            
            // Remove components in the game global list
            let entity = this.entities[id];
            let compIds = Object.keys(entity.components);

            compIds.forEach((compId) => {
                this.components[compId].forEach((comp) => {
                    if(comp.entity.id == id) {
                        let index = this.components[comp.id].indexOf(comp);
                        if(index > -1) {
                            this.components[comp.id].splice(index, 1);
                        }
                    }
                });
            });

            delete this.entities[id];
        }
    }

    /**
     * Register a system in the game instance
     * @param {System} system
     * @return {System}
     */
    addSystem(system) {
        if(this.systems[system.id] === undefined && system instanceof System) {
            this._registerSystem(system);
            return system;
        } else {
            throw(new TypeError(`Trying to add system which is not type of 'System'`));
        }
    }

    /**
     * Register multiple systems in the game instance
     * @param {System[]} systems
     */
    addSystems(systems) {
        systems.forEach((system) => {
            this.addSystem(system)
        });
    }

    _registerSystem(system) {
        this.systems[system.id] = system;

        if(system.onStart) {
            this.callbacks.onStart.push({system: system, callback: system.onStart});
        }

        if(system.onUpdate) {
            this.callbacks.onUpdate.push({system: system, callback: system.onUpdate});
        }
    }

    /**
     * Retrieve an entity
     * @param {string} id - The ID of the entity
     * @return {Entity} Returns the matching entity
     */
    getEntity(id) {
        if(this.entities[id] !== undefined) {
            return this.entities[id];
        }
    }

    /**
     * Retrieves all entities that have all provided components.
     * @param {string[]} components - A list of component ID's to match against
     * @return {Entity[]}
     */
    getEntitiesWith(components) {
        let entities = [];

        for(let i=0; i<Object.keys(this.entities).length; i++) {
            let entity = this.entities[Object.keys(this.entities)[i]];
            let count = 0;
            let target = components.length;
            
            for(let j=0; j<Object.keys(entity.components).length; j++) {
                let key = Object.keys(entity.components)[j];
                let result = components.find(c => c == entity.components[key].id);
                if(result) count++
            }

            if(count == target) {
                entities.push(entity);
            }
        }
        return entities;
    }

    /**
     * Retrive a system in the game
     * @param {string} id - The ID of the system
     */
    getSystem(id) {
        return this.systems[id];
    }

    /**
     * Retrieves a component from a specific entity
     * @param {string} entityId - The entity to retrieve the component from
     * @param {string} componentId - The component ID
     * @return {Component}
     */
    getComponentFromEntity(entityId, componentId) {
        return this.getEntity(entityId).find(componentId);
    }

    _rendererSetup(settings) {
        if(!this.hasSetup) {
            this.PIXI = PIXI;
            PIXI.utils.skipHello(); // Disables console log stuff;
            this.application = new PIXI.Application({
                width: this.width,
                height: this.height,
                antialias: settings.antialias ? settings.antialias : false,
                transparent: settings.transparent ? settings.transparent : false,
                resolution: settings.resolution ? settings.resolution : 1
            });
            this.stage = this.application.stage;
            this.renderer = this.application.renderer;
            this.renderer.autoResize = true;

            document.body.appendChild(this.application.view);
            this.hasSetup = true;
        };
    }

    addEntityToStage(entity) {
        if(this.stage) {
            this.stage.addChild(entity.container);
        }
    }
}