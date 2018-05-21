// Creating game here
let Game = new Terra.Game(500, 500, {antialias: true});

// Entity
let circle = new Terra.Module.ShapeComponent('ShapeComponent', {type: 'circle', radius: 10, color: '0xFFFFFF'});
let entity = new Terra.Entity('Ball', Game, [circle]);
entity.x = 100;
entity.y = 50;

let rect = new Terra.Module.ShapeComponent('ShapeComponent', {type: 'rect', width: 50, height: 20, color: '0xFFFFFF'});
let entity2 = new Terra.Entity('Rect', Game, [rect]);
entity2.x = 200;
entity2.y = 50;

// Systems
let renderingSystem = new Terra.Module.RenderingSystem();


Game.addEntity(entity);
Game.addSystem(renderingSystem);



// Game Loop
Game.start();
