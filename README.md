<img src="http://projects.ritter.co.za/storage/TerraJS_banner.jpg" width="980">


## What is ECS pattern?
TerraJS uses the [Entity-Component-System](https://en.wikipedia.org/wiki/Entity%E2%80%93component%E2%80%93system) (ECS) pattern to create lightweight games.

<!--**Entity** - This is essentially an 'object' or thing within your game's world. (Enemy, Bullets, etc)-->
<!--**Component** - Components are attached to Entities and provide a lego-like approach to assigning behavior to an  Entity. (Health, Position, etc)-->
<!--**System** - This is where you logic will live. A System will control all Entities that pertain to itself. (BulletSystem, EnemySystem, etc)-->

## Setup
Include the TerraJS library script
```
<script src="path/to/terra.js"></script>
```

## Usage
This is just a simple example with no rendering. Everything is happening within the game memory. This means you can use a renderer of your choice, whether it's Canvas, HTML Elements, PixiJS, etc.

First you need to create an instance of the Game world. Let's make the dimensions 500x300.
```
var Game = new Terra.Game(500, 300);
```

Now we can define a `Ball` Entity to live in the Game world. We can also give it a `Position` Component so we can track it's position in the world. *Remember, you can name these anything & give it any data you like.*
```
// Terra.Component(ComponentID, data)
let ballPosition = new Terra.Component('Position', {x: 0, y: 0});

// Terra.Entity(entityID, gameInstance, components)
// We give the entity the Position component that we created above
var ball = new Terra.Entity('Ball', Game, [ballPosition]); 
```

Now that we have an `Ball` Entity with a `Position` component, we can do something with it by creating a System. Let's call it `BallSystem`.

```
// Create the System. Note the onStart & onUpdate callbacks that we define below
var ballSystem = new Terra.System('BallSystem', onStart, onUpdate);
```
```
// onStart is when the System first starts.
function onStart(system) {
    // Let's get the ball and save it in the System
    // We can use getEntitiesWith() function to get an entity with specific components. In this case it's just one, the Ball component.
    system.ball = Game.getEntitiesWith(['Ball']);
}

// onUpdate happens every frame the game is running
function onUpdate(system, time) {
    
}
```
```
// Now we add the system to the game
Game.createSystem(ballSystem);
```
Everything is now set up. Let's start the Game!
```
Game.onUpdate = () => {
    // This is the master game loop
    // You can put your rendering specific stuff here
}

Game.start(() => {
    // You can do any pre-start setup in this callback
});
// The game is now running
```
