// Creating game here
let Game = new Terra.Game(500, 500);

// Define Entities & Attach Components
let ball = new Terra.Entity('Ball', Game, [
    new Terra.Component('Transform', {x: 50, y: 100, w: 5, h: 5}),
    new Terra.Component('Ball', {type: 'Square', color: 'white'})
])

let paddle1 = new Terra.Entity('Paddle1', Game, [
    new Terra.Component('Transform', {x: 0, y: 0, w: 100, h: 30}),
    new Terra.Component('Paddle', {type: 'Square', color: 'orange'})
])

let paddle2 = new Terra.Entity('Paddle2', Game, [
    new Terra.Component('Transform', {x: 0, y: 0, w: 100, h: 100}),
    new Terra.Component('Paddle', {type: 'Square', color: 'orange'})
])

Game.createEntities([
    ball,
    paddle1,
    paddle2    
]);

// Create Systems
Game.createSystem(new Terra.System('BallSystem', 
    (system) => {
        let ball = Game.getEntitiesWith(['Ball', 'Transform'])[0];
        system.ball = ball;
        system.moveX = 4;
        system.moveY = 4;
        system.speedX = 6;
        system.speedY = 6;
    },
    (system, time) => {
        if(system.ball != undefined) {
            let tf = system.ball.getComponent('Transform').data;
            let b = system.ball.getComponent('Ball').data;

            // Collision
            if(tf.x + tf.w >= Game.width) {
                system.moveX = 0 - Math.abs(system.speedX);
            } if (tf.x - tf.w <= 0) {
                system.moveX = Math.abs(system.speedX);
            }

            if(tf.y + tf.h >= Game.height) {
                system.moveY = 0 - Math.abs(system.speedY);
            } if (tf.y - tf.h <= 0) {
                system.moveY = Math.abs(system.speedY);
            }

            tf.x += system.moveX;
            tf.y += system.moveY;

            // Draw
            if(Game.ctx) {
                Game.ctx.beginPath();
                Game.ctx.arc(tf.x, tf.y, tf.w, 0, 2 * Math.PI);
                Game.ctx.fillStyle = b.color;
                Game.ctx.fill();
            }
        }
    }
));

// Game Loop
Game.onUpdate = gameUpdate;
Game.start(setupCanvas);

function gameUpdate() {
    if(Game.ctx) {
        Game.ctx.clearRect(0, 0, Game.width, Game.height);
        Game.ctx.fillStyle = 'black';
        Game.ctx.fillRect(0, 0, Game.width, Game.height);
    }
}

function setupCanvas() {
    // Setup Canvas
    let canvas = document.createElement('canvas');
    canvas.setAttribute('width', `${Game.width}px`);
    canvas.setAttribute('height', `${Game.height}px`);
    document.body.appendChild(canvas);
    Game.ctx = canvas.getContext('2d');
}