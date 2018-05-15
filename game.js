// Creating game here
let Game = new Terra.Game(500, 500);

// Define Entities & Attach Components
let ball = new Terra.Entity('Ball', Game, [
    new Terra.Component('Transform', {x: 0, y: 0, w: 10, h: 10})
])


let paddle1 = new Terra.Entity('Paddle1', Game, [
    new Terra.Component('Transform', {x: 0, y: 0, w: 100, h: 30}),
    new Terra.Component('Paddle', {type: 'Square', color: 'orange'})
])

let paddle2 = new Terra.Entity('Paddle2', Game, [
    new Terra.Component('Transform', {x: 0, y: 0, w: 100, h: 100}),
    new Terra.Component('Paddle', {type: 'Square', color: 'orange'})
])

ball.attachComponent(new Terra.Component('Ball', {type: 'Square', color: 'blue'}));

Game.createEntities([
    ball,
    paddle1,
    paddle2    
]);

// Create Systems
Game.createSystem(new Terra.System('BallSystem', 
    (system) => {
        let ball = Game.getEntitiesWith(['Ball', 'Transform'])[0];

        if(ball != undefined) {
            let tf = ball.getComponent('Transform').data;
            let b = ball.getComponent('Ball').data;
    
            let ballEl = document.createElement('div');
            ballEl.setAttribute('style', `position: absolute; left: ${tf.x}px; top: ${tf.y}px; width: ${tf.w}px; height: ${tf.h}px; background: ${b.color}`);
            document.body.appendChild(ballEl);

            system.ball = ball;
            system.ballEl = ballEl;
        }
        
    },
    (system, time) => {
        if(system.ball != undefined) {
            let tf = system.ball.getComponent('Transform').data;

            system.ballEl.setAttribute('style', `position: absolute; left: ${tf.x}px; top: ${tf.y}px; width: ${tf.w}px; height: ${tf.h}px; background: ${b.color}`);
        }
    }
));

// Game Loop
Game.onUpdate = function(time) {
    //console.log('onUpdate loop');
    let transform = Game.getComponentFromEntity('Paddle1', 'Transform').data;
    //console.log(transform.x)
}

Game.start();