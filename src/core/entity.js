import { Component } from './component.js';

export class Entity {
    constructor(id, game, components) {
        /**
         * @type {string}
         */
        this.id = id;

        /**
         * @type {Object}
         */
        this.components = {};

        /**
         * @type {string[]}
         */
        this._components = components;

        /**
         * @type {Game}
         */
        this.game = game;

        /**
         * @type {number}
         */
        this._x = 0;

        /**
         * @type {number}
         */
        this._y = 0;

        /**
         * @type {Pixi.Container}
         */
        this.container;
        this.container = new PIXI.Container();
        this.container.gameId = this.id;
    }

    set x(value) {
        if(this.container) {
            this._x = value;
            this.container.x = value;
        }
    }

    get x() {
        return this._x;
    }

    set y(value) {
        if(this.container) {
            this._y = value;
            this.container.y = value;
        }
    }

    get y() {
        return this._y;
    }

    /**
     * Attach a Component to this Entity
     * @param {Component} component
     */
    attach(component) {
        if(this.components[component.id] === undefined) {
            this.components[component.id] = component;

            if(this.game.components[component.id] === undefined) {
                this.game.components[component.id] = [];
            }
            this.game.components[component.id].push(component);
            component.entity = this;

            this.componentCallback(component);
            
        } else if(!(component instanceof Component))  {
            throw new TypeError(`Not of type Component`);
        } else {
            throw new Error(`There is already a component with the ID '${component.id}'`);
        }
    }

    attachComponents() {
        if(this._components) {
            for(let i=0; i<this._components.length; i++) {
                this.attach(this._components[i]);
            }
        }
    }

    /**
     * Detatch a component from entity
     * @param {string} ID of component
     */
    detach(id) {
        this.components[id].onDetatch(); // First call onDetatch before removing it
        delete this.components[id]; // Remove from Entity map

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
        if(this.components[id] !== undefined) {
            return this.components[id];
        }
        throw new Error(`Cannot find Component '${id}' on Entity '${this.id}'`);
    }

    /**
     * Whenever a component is attached, it's callbacks are called
     * @param {Component} component 
     */
    componentCallback(component) {
        if(this.game.running) {
            component.onAttach();
        } else {
            component.offlineAttach(this);
        }
    }

    listenSignal(signalId, callback) {
        this.game.signal.bind(signalId, this, callback);
    }

    sendSignal(signalId, data) {
        this.game.signal.send(signalId, data);
    }

}