let chai = require('chai');
chai.should();

// Import dependencies
import { Game } from '../src/core/game.js';
import { Entity } from '../src/core/entity.js';
import { Component } from '../src/core/component.js';
import { System } from '../src/core/system.js';

describe('Game', function() {
    
    var game;
        
    beforeEach(function() {
        game = new Game(100,100);
    });

    it('should have a valid width & height', function() {
        game.width.should.equal(100);
        game.height.should.equal(100);
    });

    it('should have a renderer', function() {
        (typeof game.renderer).should.not.equal(undefined);
    });

    describe('createEntities()', function() {
        it('should add entities to the game', function() {
            let entities = [
                new Entity('TestEntity1', game, []),
                new Entity('TestEntity2', game, [])
            ];

            game.createEntities(entities);
            Object.keys(game.entities).length.should.equal(2);
        });

        it('should only accept valid entities', function() {
            let invalidEntities = ['string'];
            let createEntities = function() {game.createEntities(invalidEntities)};
            createEntities.should.throw(TypeError);
        });
    });

    describe('addSystem()', function() {
        it('should add a system to the game', function() {
            let system = new System('TestSystem', function(){}, function(){});
            game.addSystem(system);
            game.getSystem('TestSystem').should.equal(system);
        });

        it('should only accept a valid system', function() {
            let invalidSystem = new Entity('FakeSystem', game, []);
            let addSystem = function() {game.addSystem(invalidSystem)};
            addSystem.should.throw(TypeError);
        });
    });

    describe('addEntity()', function() {
        it('should return a valid entity', function() {
            let entity = new Entity('TestEntity', game, []);
            game.addEntity(entity);
            let get = game.getEntity('TestEntity');
            get.id.should.equal('TestEntity');
        });

        it('should throw an error if invalid entity', function() {
            let invalidEntity = 123;
            let addEntity = function() {game.addEntity(invalidEntity)};
            addEntity.should.throw(TypeError);
        });
    });

    describe('getComponentFromEntity()', function() {
        it('should return a valid component', function() {
            let comp1 = new Component('TestComp1', {foo: 1});
            let comp2 = new Component('TestComp2', {foo: 2});

            let entity = new Entity('TestEntity', game, [comp1, comp2]);
            game.addEntity(entity);

            let get = game.getComponentFromEntity('TestEntity', 'TestComp2');
            get.data.foo.should.equal(2);
        });

        it('should throw an error if component doesn\'t exist', function() {
            let comp1 = new Component('TestComp1', {foo: 1});
            let comp2 = new Component('TestComp2', {foo: 2});

            let entity = new Entity('TestEntity', game, [comp1, comp2]);
            game.addEntity(entity);

            let get = function() { game.getComponentFromEntity('TestEntity', 'NonExistantComp')};
            get.should.throw(Error);
        });
    });

    describe('getEntitiesWith()', function() {
        it('should return only entities with given component dependencies', function() {
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

        it('should return an empty array when no matches', function() {
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

describe('Component', function() {
    var game;
        
    beforeEach(function() {
        game = new Game(100,100, {});
    });

    describe('offlineAttach()', function() {
        it('should not throw error if dependencies ARE fulfilled', function() {
            let setup = function() {
                var component1 = new Component('TestComponent1', {});
                var component2 = new Component('TestComponent2', {});
                var entity = new Entity ('TestEntity', game, []);

                component1.setDependency('TestComponent2');
                entity.attach(component2);
                entity.attach(component1);
                game.addEntity(entity);
                return;
            }

            setup.should.not.throw(Error);
        });

        it('should throw an error if dependencies are NOT fulfilled', function() {
            let setup = function() {
                var component1 = new Component('TestComponent1', {});
                var entity = new Entity ('TestEntity', game, []);

                component1.setDependency('TestComponent2');
                entity.attach(component1);
                game.addEntity(entity);
                return;
            }

            setup.should.throw(Error);
        });
    });
});

describe('Entity', function() {
    var game;
        
    beforeEach(function() {
        game = new Game(100,100, {});
    });

    describe('set x & y', function() {
        it('should change both Entity & Pixi.Container\'s values', function() {
           let entity = new Entity('TestEntity', []);
           game.addEntity(entity);
           entity.x = 123;
           entity.y = 246;
           entity._x.should.equal(123);
           entity.container.x.should.equal(123);
           entity._y.should.equal(246);
           entity.container.y.should.equal(246);
        });
    });

    describe('attach()', function() {
        it('should throw an error if a component already exists', function() {
            let setup = function() {
                let comp1 = new Component('Comp1', {});
                let duplicate_comp1 = new Component('Comp1', {});
                let entity = new Entity('TestEntity', game, [comp1, duplicate_comp1]);
                game.addEntity(entity);
            }
            setup.should.throw(Error);
        });
    });

    describe('detach()', function() {
        it('should detach a given component', function() {
            let comp1 = new Component('Comp1', {});
            let comp2 = new Component('Comp2', {});
            let entity = new Entity('TestEntity', game, [comp1, comp2]);

            game.addEntity(entity);
            Object.keys(entity.components).length.should.equal(2);
            entity.detach('Comp1');
            Object.keys(entity.components).length.should.equal(1);
        });
    });

    describe('find()', function() {
        it('should find a specified component', function() {
            let comp1 = new Component('Comp1', {foo: 'bar'});
            let entity = new Entity('TestEntity', game, [comp1]);

            game.addEntity(entity);

            let comp = entity.find('Comp1');
            comp.data.foo.should.equal('bar');
        });
    });

    describe('destroy()', function() {
        it('should destroy & remove an entity from the game', function() {
            let entity = new Entity('TestEntity', game, []);

            game.addEntity(entity);
            Object.keys(game.entities).length.should.equal(1);
            entity.destroy();
            Object.keys(game.entities).length.should.equal(0);
        });
    });
});

describe('System', function() {
    var game;
        
    beforeEach(function() {
        game = new Game(100,100, {});
    });

    describe('getEntity()', function() {
        it('should find a specified entity', function() {
            let entity = new Entity('TestEntity', game, []);
            game.addEntity(entity);

            let system = new System('TestSystem', game, () => {}, () =>{});
            game.addSystem(system);

            let searchedEntity = system.getEntity('TestEntity');

            searchedEntity.should.equal(entity);
        });
    });

    describe('getComponentFromEntity()', function() {
        it('should find a component from specified entity', function() {
            let comp1 = new Component('Comp1', {foo: 'bar'});

            let entity = new Entity('TestEntity', game, [comp1]);
            game.addEntity(entity);

            let system = new System('TestSystem', game, () => {}, () =>{});
            game.addSystem(system);

            let searchedComponent = system.getComponentFromEntity('TestEntity', 'Comp1');
            
            searchedComponent.should.equal(comp1);
        });
    });

});