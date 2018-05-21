import { Game } from './core/game.js';
import { Entity } from './core/entity.js';
import { Component } from './core/component.js';
import { System } from './core/system.js';

// Components
import { ShapeComponent } from './modules/components/shapeComponent.js';

/**
 * This is the global class for accessing the framework from your document
 */
class Terra {
    constructor() {
        this.Game = Game;

        // Base Classes
        this.Entity = Entity;
        this.Component = Component;
        this.System = System;

        this.Module = {
            ShapeComponent: ShapeComponent
        }
    }
}

global.Terra = new Terra();