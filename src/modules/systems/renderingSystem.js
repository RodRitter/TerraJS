import { System } from '../../core/system.js';

export class RenderingSystem extends System {
    constructor() {
        super('RenderingSystem', ()=>{}, ()=>{});
        this.onStart = this.start;
        this.onUpdate = this.update;
    }

    start(system) {
        
    }

    update() {
        
    }

    renderShape(system, entity) {
        let comp = entity.find('ShapeComponent');
        let gfx = new system.game.PIXI.Graphics();

        switch(comp.data.type) {
            case 'circle':
                gfx.beginFill(comp.data.color);
                gfx.drawCircle(entity.x, entity.y, comp.data.radius);
                gfx.endFill();
                entity.container.addChild(gfx);
                break;
            case 'rect':
                gfx.beginFill(comp.data.color);
                gfx.drawRect(entity.x, entity.y, comp.data.width, comp.data.height); 
                gfx.endFill();
                entity.container.addChild(gfx);
                break;
        }
    }

}