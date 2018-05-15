export class System {
    constructor(id, onStart, onUpdate) {
        this.id = id;
        this.game = null;
        this.onStart = onStart;
        this.onUpdate = onUpdate;
    }

    getEntity(id) {
        if(this.game !== null) {
            this.game.getEntity(id);
        }
    }

    getComponentFromEntity(entityId, componentId) {
        if(this.game) {
            return this.game.getEntity(entityId).getComponent(componentId);
        }
    }
}