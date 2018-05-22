
let Game = new Terra.Game(500, 500, {antialias: true});

let comp1 = new Terra.Component('Comp1', {});
let comp2 = new Terra.Component('Comp2', {});

let system = new Terra.System('TestSystem', () => {}, () =>{});

let entity = new Terra.Entity('TestEntity', Game, [comp1, comp2]);



// // Creating game here
// let Game = new Terra.Game(500, 500, {antialias: true});

// // Systems
// let renderer = new Terra.Renderer();

// // Entity
// let circle = new Terra.Shape.Component('ShapeComponent', {type: 'circle', radius: 10, color: '0xFFFFFF'});
// let rect = new Terra.Shape.Component('ShapeComponent', {type: 'rect', width: 50, height: 20, color: '0xFFFFFF'});

// let entity = new Terra.Entity('Ball', Game, [circle]);
// let entity2 = new Terra.Entity('Rect', Game, [rect]);


// Game.addEntities([entity, entity2]);
// Game.addSystems([renderer]);

// // Game Loop
// Game.start();

// entity.x = 100;
// entity.y = 50;
