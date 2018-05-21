export class Entity {
    constructor(id, game, components) {
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
        
        if(components) {
            for(let i=0; i<components.length; i++) {
                this.attach(components[i]);
            }
        }
    }

    /**
     * Attach a Component to this Entity
     * @param {Component} component
     */
    attach(component) {
        if(this.componentMap[component.id] === undefined) {
            this.componentMap[component.id] = component;

            if(this.game.components[component.id] === undefined) {
                this.game.components[component.id] = [];
            }
            this.game.components[component.id].push(component);
            component.entity = this;

            this.componentCallback(component);
            
        } else {
            throw(`There is already a component with the ID '${component.id}'`);
        }
    }

    /**
     * Detatch a component from entity
     * @param {string} ID of component
     */
    detatch(id) {
        this.componentMap[id].onDetatch(); // First call onDetatch before removing it
        delete this.componentMap[id]; // Remove from Entity map

        // Remove from Game global component list
        this.game.components[id].forEach((component) => {
            if(component.entity.id == this.id) {
                let index = this.game.components[id].indexOf(component);
                if(index > -1) {
                    this.game.components[id].splice(index, 1);
                }
            }
        });
    }

    /**
     * Find a specific Component from this Entity
     * @param {string} id - ID of the component
     * @return {Component}
     */
    find(id) {
        if(this.componentMap[id] !== undefined) {
            return this.componentMap[id];
        }
        throw new Error(`Cannot find Component '${id}' on Entity '${this.id}'`);
    }

    componentCallback(component) {
        if(this.game.running) {
            component.beforeAttach(this);
            component.onAttach();
        }
    }

}