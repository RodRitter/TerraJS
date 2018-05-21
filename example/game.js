// Creating game here
let Game = new Terra.Game(500, 500);
let testComp = new Terra.Component('TestComp', {x: 0, y: 0});
let entity = new Terra.Entity('TestEntity', Game, [testComp]);
Game.addEntity(entity);



// Game Loop
Game.start();
