import { Game } from './core/game.js';
import { Entity } from './core/entity.js';
import { Component } from './core/component.js';
import { System } from './core/system.js';

class Terra {
    constructor() {
        this.Game = Game;

        // Base Classes
        this.Entity = Entity;
        this.Component = Component;
        this.System = System;
    }
}

window.Terra = new Terra();