// Creating game here
let Game = new Terra.Game(500, 500, {antialias: true});

// Systems
let coreSystems = [
    new Terra.Renderer('Renderer')
];

// Entity
let circle = new Terra.Shape('ShapeComponent', {type: 'circle', radius: 10, color: '0xFFFFFF'});
let rect = new Terra.Shape('ShapeComponent', {type: 'rect', width: 50, height: 20, color: '0xFFFFFF'});

let entity = new Terra.Entity('Ball', Game, [circle]);
let entity2 = new Terra.Entity('Rect', Game, [rect]);


Game.addEntities([entity, entity2]);
Game.addSystems([...coreSystems]);

// Game Loop
Game.start();

entity.x = 100;
entity.y = 50;
