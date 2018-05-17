
let chai = require('chai');
let expect = chai.expect;
chai.should();

// Import dependencies
import { Game } from '../src/core/game.js';
import { Entity } from '../src/core/entity.js';
import { Component } from '../src/core/component.js';
import { System } from '../src/core/system.js';

describe('Game', () => {
    
    let game;
        
    beforeEach(() => {
        game = new Game(100,100);
    });

    it('should return a valid width & height', () => {
        game.width.should.equal(100);
        game.height.should.equal(100);
    });

    describe('createEntities()', () => {
        it('should add entities to the game', () => {
            let entities = [
                new Entity('TestEntity1', game, []),
                new Entity('TestEntity2', game, [])
            ];

            game.createEntities(entities);
            Object.keys(game.entities).length.should.equal(2);
        });

        it('should only accepts valid entities', () => {
            let invalidEntities = [
                'string',
                123
            ];

            let createEntities = () => {game.createEntities(invalidEntities)};
            createEntities.should.throw(TypeError);
        });
    });

});