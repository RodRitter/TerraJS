/**
 *   SETUP
 */

// Create Game Instance
let Game = new Terra.Game(500, 500, {antialias: true});

// Create & Load Core Terra Systems (Optional)
let coreSystems = [
    new Terra.Renderer('Renderer', Game) // Renders Shape & Sprite (WIP) Components
];
Game.addSystems([...coreSystems]);


/**
 *   GAME SEPCIFIC CODE HERE
 */

// Define Initial Entities & Components
let Entities = {
    Ball: new Terra.Entity('Ball', Game, [
        new Terra.Shape('ShapeComponent', {type: 'circle', radius: 10, color: '0xFFFFFF'})
    ]),
    Paddle: new Terra.Entity('Paddle', Game, [
        new Terra.Shape('ShapeComponent', {type: 'rect', width: 100, height: 10, color: '0xFFFFFF'})
    ])
}

Game.addEntities([Entities.Ball, Entities.Paddle]);

// Setup game systems (Ball, Paddle)
let ballSystem = new Terra.System('BallSystem', Game, ballStart, ballUpdate);
let paddleSystem = new Terra.System('PaddleSystem', Game, paddleStart, paddleUpdate);

// Callbacks
function ballStart(system) {
    let ball = Entities.Ball;
    
    ball.x = Game.width/2;
    ball.y = (Game.height/2);
}

function ballUpdate(system, time) {
    
}

function paddleStart(system) {
    let paddle = Entities.Paddle;
    paddle.container.pivot.x = paddle.width * 0.5;
    paddle.container.pivot.y = paddle.height;
    paddle.x = Game.width/2;
    paddle.y = Game.height - 10;

    system.paddleSpeed = 6;
    system.direction = 0;

    window.addEventListener("keypress", (e) => {
        if(e.key == 'd') {
            system.direction = 1;
        } else if(e.key == 'a') {
            system.direction = -1;
        }
    });

    window.addEventListener("keyup", (e) => {
        if(e.key == 'a' || e.key == 'd')
            system.direction = 0;
    });
}

function paddleUpdate(system, time) {
    movePaddle(system.direction, system.paddleSpeed);
}

function movePaddle(direction, speed) {
    let paddle = Entities.Paddle;
    let leftBoundary = 10;
    let rightBoundary = Game.width-10;

    if(direction == 1) {
        let move = (paddle.x + speed) + paddle.width/2;
        if(move > rightBoundary) {
            paddle.x = rightBoundary - paddle.width/2
        } else {
            paddle.x += speed;
        }
    } else if (direction == -1) {
        let move = (paddle.x - speed) - paddle.width/2;
        if(move < leftBoundary) {
            paddle.x = leftBoundary + paddle.width/2
        } else {
            paddle.x -= speed;
        }
    }
}

Game.addSystems([ballSystem, paddleSystem]);

/**
 *   GAME START
 */

Game.start();