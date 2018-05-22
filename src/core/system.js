export class System {
    constructor(id, onStart, onUpdate) {
        /**
         * @type {string}
         */
        this.id = id;

        /**
         * @type {Game}
         */
        this.game = null;

        /**
         * @type {function}
         */

        this.onStart = onStart;
        this.onUpdate = onUpdate;
    }

    /**
     * Retrieves an Entity from the Game
     * @param {string} id - ID of the entity
     * @return {Entity}
     */
    getEntity(id) {
        if(this.game !== null) {
            return this.game.getEntity(id);
        }
    }

    /**
     * Retrieves a Components from a specific Entity
     * @param {string} entityId - The ID of the Entity
     * @param {string} componentId - The ID of the Component
     */
    getComponentFromEntity(entityId, componentId) {
        if(this.game) {
            let entity = this.game.getEntity(entityId);
            let component = entity.find(componentId)
            return component;
        }
    }

    listenSignal(signalId, callback) {
        this.game.signal.bind(signalId, this, callback);
    }

    sendSignal(signalId, data) {
        this.game.signal.send(signalId, data);
    }
}