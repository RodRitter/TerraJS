// Creating game here
let Game = new Terra.Game(500, 500, {});

let test = new Terra.Component('Transform', {});
let shape = new Terra.Module.ShapeComponent('ShapeComponent', {type: 'circle', radius: 20, color: '0xFFFFFF'});

let entity = new Terra.Entity('TestEntity', Game, [test, shape]);

Game.addEntity(entity);



// Game Loop
Game.start();
