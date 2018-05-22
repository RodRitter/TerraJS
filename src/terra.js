import { Game } from './core/game.js';
import { Entity } from './core/entity.js';
import { Component } from './core/component.js';
import { System } from './core/system.js';

// Components
import { ShapeComponent } from './modules/rendering/shapeComponent.js';
import { RenderingSystem } from './modules/rendering/renderingSystem.js';

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

        // Rendering Module
        this.Renderer = RenderingSystem;
        this.Shape = ShapeComponent;

        // Input Module
    }
}

global.Terra = new Terra();