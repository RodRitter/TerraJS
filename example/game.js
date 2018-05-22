
// Creating game here
let Game = new Terra.Game(500, 500, {antialias: true});

// Define Initial Entities & Components
let Entities = {
    Ball: new Terra.Entity('Ball', Game, [
        new Terra.Shape('ShapeComponent', {type: 'circle', radius: 10, color: '0xFFFFFF'})
    ]),
    Paddle: new Terra.Entity('Paddle', Game, [
        new Terra.Shape('ShapeComponent', {type: 'rect', width: 30, height: 10, color: '0xFFFFFF'})
    ])
}

// Systems
let coreSystems = [
    new Terra.Renderer('Renderer') // Renders Shapes & Sprites (WIP)
];



Game.addEntities([Entities.Ball, Entities.Paddle]);
Game.addSystems([...coreSystems]);

// Game Loop
Game.start();


Entities.Ball.x = Game.width/2;
Entities.Ball.y = 10;
