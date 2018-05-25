import { System } from '../../core/system.js';

export class RenderingSystem extends System {
    constructor(id, game) {
        super(id, game, ()=>{}, ()=>{});
        this.onStart = this.start;
        this.onUpdate = this.update;

        this.listenSignal('shape.render', (data) => {
            this.renderShape(this, data.entity);
        });
    }

    start(system) {
        
    }

    update(system, time) {}


    /**
     * Renders a shape on an entity with a Shape component
     * @param {System} system 
     * @param {Entity} entity 
     */
    renderShape(system, entity) {
        let shape = entity.find('ShapeComponent');

        if(shape) {
            switch(shape.data.type) {
                case 'circle':
                    let circle = system._drawCircle(system, entity.x, entity.y, shape.data.radius, shape.data.color);
                    shape.graphic = circle;
                    entity.container.addChild(circle);
                    break;
                case 'rect':
                    let rect = system._drawRect(entity.x, entity.y, shape.data.width, shape.data.height, shape.data.color);
                    shape.graphic = rect;
                    entity.container.addChild(rect);
                    break;
            }
        }
    }

    /**
     * Creates a Circle Pixi Graphics object
     * @param {System} system 
     * @param {number} x 
     * @param {number} y 
     * @param {number} radius 
     * @param {color} color - eg. '0xFFFFFF' or 'white'
     * @returns {Pixi.Graphic} Pixi Graphics object
     */
    _drawCircle(system, x, y, radius, color) {
        let gfx = new this.game.PIXI.Graphics();
        gfx.beginFill(color);
        gfx.drawCircle(x, y, radius);
        gfx.endFill();
        gfx.x = 0;
        gfx.y = 0;
        return gfx;
    }

    /**
     * Creates a Rect Pixi Graphics object
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @param {color} color - eg. '0xFFFFFF' or 'white'
     * @returns {Pixi.Graphic} Pixi Graphics object
     */
    _drawRect(x, y, width, height, color) {
        let gfx = new this.game.PIXI.Graphics();
        gfx.beginFill(color);
        gfx.drawRect(x, y, width, height); 
        gfx.endFill();
        gfx.x = 0;
        gfx.y = 0;
        return gfx;
    }
}