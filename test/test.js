
let chai = require('chai');
let expect = chai.expect;
chai.should();

// Import dependencies
import { Game } from '../src/core/game.js';
import { Entity } from '../src/core/entity.js';
import { Component } from '../src/core/component.js';
import { System } from '../src/core/system.js';

describe('Game', () => {
    
    var game;
        
    beforeEach(() => {
        game = new Game(100,100);
    });

    it('should have a valid width & height', () => {
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

        it('should only accept valid entities', () => {
            let invalidEntities = ['string'];
            let createEntities = () => game.createEntities(invalidEntities);
            createEntities.should.throw(TypeError);
        });
    });

    describe('addSystem()', () => {
        it('should add a system to the game', () => {
            let system = new System('TestSystem', ()=>{}, ()=>{});
            game.addSystem(system);
            game.getSystem('TestSystem').should.equal(system);
        });

        it('should only accept a valid system', () => {
            let invalidSystem = new Entity('FakeSystem', game, []);
            let addSystem = () => game.addSystem(invalidSystem);;
            addSystem.should.throw(TypeError);
        });
    });

    describe('addEntity()', () => {
        it('should return a valid entity', () => {
            let entity = new Entity('TestEntity', game, []);
            game.addEntity(entity);
            let get = game.getEntity('TestEntity');
            get.id.should.equal('TestEntity');
        });

        it('should throw an error if invalid entity', () => {
            let invalidEntity = 123;
            let addEntity = () => game.addEntity(invalidEntity);
            addEntity.should.throw(TypeError);
        });
    });

    describe('getComponentFromEntity()', () => {
        it('should return a valid component', () => {
            let comp1 = new Component('TestComp1', {foo: 1});
            let comp2 = new Component('TestComp2', {foo: 2});

            let entity = new Entity('TestEntity', game, [comp1, comp2]);
            game.addEntity(entity);

            let get = game.getComponentFromEntity('TestEntity', 'TestComp2');
            get.data.foo.should.equal(2);
        });

        it('should throw an error if component doesn\'t exist', () => {
            let comp1 = new Component('TestComp1', {foo: 1});
            let comp2 = new Component('TestComp2', {foo: 2});

            let entity = new Entity('TestEntity', game, [comp1, comp2]);
            game.addEntity(entity);

            let get = () => game.getComponentFromEntity('TestEntity', 'NonExistantComp');
            get.should.throw(Error);
        });
    });

    describe('getEntitiesWith()', () => {
        it('should return only entities with given component dependencies', () => {
            let comp1 = new Component('TestComp1', {foo: 'bar'});
            let comp2 = new Component('TestComp2', {foo: 'bar'});
            let comp3 = new Component('TestComp3', {foo: 'bar'});

            let entities = [
                new Entity('TestEntity1', game, [comp1]),
                new Entity('TestEntity2', game, [comp1, comp2]),
                new Entity('TestEntity3', game, [comp3, comp2]),
                new Entity('TestEntity4', game, [comp1, comp2, comp3])
            ];

            game.createEntities(entities);

            let get1 = game.getEntitiesWith(['TestComp1']);
            let get12 = game.getEntitiesWith(['TestComp1', 'TestComp2']);
            let get23 = game.getEntitiesWith(['TestComp2', 'TestComp3']);

            get1.length.should.equal(3);
            get12.length.should.equal(2);
            get23.length.should.equal(2);
        });

        it('should return an empty array when no matches', () => {
            let comp = new Component('TestComp', {foo: 'bar'});

            let entities = [ new Entity('TestEntity', game, [comp]) ]

            game.createEntities(entities);

            let getNonExistant = game.getEntitiesWith(['NonExistant']);
            let getExisting = game.getEntitiesWith(['TestComp']);

            getNonExistant.length.should.equal(0);
            getExisting.length.should.equal(1);
        });

    });

});