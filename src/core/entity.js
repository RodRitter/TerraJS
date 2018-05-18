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
        
        if(components) {
            for(let i=0; i<components.length; i++) {
                this.attachComponent(components[i]);
            }
        }
    }

    /**
     * Attach a Component to this Entity
     * @param {Component} component
     */
    attachComponent(component) {
        if(this.componentMap[component.id] === undefined) {
            this.componentMap[component.id] = component;

            if(this.game.components[component.id] === undefined) {
                this.game.components[component.id] = [];
            } 
            this.game.components[component.id].push(component);
            component.onAttach();
            
        } else {
            throw(`There is already a component with the ID '${component.id}'`);
        }
    }

    /**
     * Get a specific Component from this Entity
     * @param {string} id - ID of the component
     * @return {Component}
     */
    getComponent(id) {
        if(this.componentMap[id] !== undefined) {
            return this.componentMap[id];
        }
        throw(`Cannot find Component '${id}' on Entity '${this.id}'`);
    }

}