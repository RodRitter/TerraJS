import { Entity } from './entity.js';
import { System } from './system.js';

export class Game {

    /**
     * The Game class takes in dimensions of the game screen
     * @param {number} width width of game screen
     * @param {number} height height of game screen
     */
    constructor(width, height) {
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
    start() {
        this.onStart();

        // Run start callbacks
        this.callbacks.onStart.forEach((systemObj) => {
            systemObj.callback(systemObj.system);
        });

        // Start game loop
        window.requestAnimationFrame(this.update.bind(this));
    }

    /**
     * The game update function. Use onUpdate() callback to hook into here
     */
    update(time) {
        this.onUpdate(time);

        this.callbacks.onUpdate.forEach((systemObj) => {
            systemObj.callback(systemObj.system, time);
        });
        
        window.requestAnimationFrame(this.update.bind(this));
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
        } else {
            throw new TypeError(`Trying to add an entity which is not of type 'Entity'`);
        }
        
    }

    /**
     * Register a system in the game instance
     * @param {System} system
     * @return {System}
     */
    addSystem(system) {
        if(this.systems[system.id] === undefined && system instanceof System) {
            system.game = this;
            this.systems[system.id] = system;
            this.callbacks.onStart.push({system: system, callback: system.onStart});
            this.callbacks.onUpdate.push({system: system, callback: system.onUpdate});
            return system;
        } else {
            throw(new TypeError(`Trying to add system which is not type of 'System'`));
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
            
            for(let j=0; j<Object.keys(entity.componentMap).length; j++) {
                let key = Object.keys(entity.componentMap)[j];
                let result = components.find(c => c == entity.componentMap[key].id);
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
        return this.getEntity(entityId).getComponent(componentId);
    }
}