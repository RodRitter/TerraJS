<img src="http://projects.ritter.co.za/storage/TerraJS_banner.jpg" width="980">

TerraJS uses the [Entity-Component-System](https://en.wikipedia.org/wiki/Entity%E2%80%93component%E2%80%93system) (ECS) pattern to create lightweight games.

**Entity** - This is essentially an 'object' or thing within your game's world. (Enemy, Bullets, etc)

**Component** - Components are attached to Entities and provide a lego-like approach to assigning behavior to an  Entity. (Health, Position, etc)

**System** - This is where you logic will live. A System will control all Entities that pertain to itself. (BulletSystem, EnemySystem, etc)

## Setup
Include the [TerraJS](https://raw.githubusercontent.com/RodRitter/TerraJS/master/dist/terra.js) library script
```
<script src="path/to/terra.js"></script>
```

## Usage
### Create game instance
```
var Game = new Terra.Game(500, 300);
```

### Create a Component
```
var position = new Terra.Component('Position', {x: 0, y: 0});
var attack = new Terra.Component('Attack', {damage: 50});
```

### Create an Entity
```
var monsterEntity = new Terra.Entity('Monster', [position, attack]);
```

### Create a System
```
var monsterSystem = new Terra.System('BallSystem', monsterSystemStart, monsterSystemUpdate);

function monsterSystemStart(system) {} // Happens on startup
function monsterSystemUpdate(system, time) {} // Happens every frame
```

### Start the Game
```
Game.onStart = function() {} // Happens on game start
Game.onUpdate = function() {} // Happens every frame of the game.

Game.start();
```

## Building & Contributing
Once you make changes to the code, you need to build
```
npm run webpack
```
