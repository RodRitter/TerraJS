export class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.entities = {};
        this.components = {};
        this.systems = {}; // Is this needed? Callbacks below

        // System Callbacks
        this.callbacks = {};
        this.callbacks.onStart = [];
        this.callbacks.onUpdate = [];
    }

    start(callback) {
        // Run start callbacks
        this.callbacks.onStart.forEach((systemObj) => {
            systemObj.callback(systemObj.system);
        });

        if(callback) {
            callback();
        }

        // Start game loop
        window.requestAnimationFrame(this.update.bind(this));
    }

    update(time) {
        this.onUpdate(time);

        this.callbacks.onUpdate.forEach((systemObj) => {
            systemObj.callback(systemObj.system, time);
        });
        
        window.requestAnimationFrame(this.update.bind(this));
    }

    onUpdate(time) {
        // Override
    }

    width() {
        return this.width;
    }

    height() {
        return this.height;
    }

    createEntities(entities) {
        for(let i=0; i<entities.length; i++) {
            this.addEntity(entities[i]);
        }
    }

    createSystem(system) {
        if(this.systems[system.id] === undefined) {
            system.game = this;
            this.systems[system.id] = system;
            this.callbacks.onStart.push({system: system, callback: system.onStart});
            this.callbacks.onUpdate.push({system: system, callback: system.onUpdate});
            return system;
        }
    }

    addEntity(entity) {
        if(this.entities[entity.id] === undefined) {
            this.entities[entity.id] = entity;
            entity.game = this;
        }
    }

    getEntity(id) {
        if(this.entities[id] !== undefined) {
            return this.entities[id];
        }
        throw(`Cannot find Entity with id '${id}'`);
    }

    getEntitiesWith(components) {
        let entities = [];

        for(let i=0; i<Object.keys(this.entities).length; i++) {
            let entity = this.entities[Object.keys(this.entities)[i]];
            let count = 0;
            let target = components.length;
            
            for(let j=0; j<Object.keys(entity.componentMap).length; j++) {
                let key = Object.keys(entity.componentMap)[j];
                let result = components.find(c => c == entity.componentMap[key].id);
                if(result) count++
            }

            if(count == target) {
                entities.push(entity);
            }
        }
        return entities;
    }

    getComponents(id) {
        return this.components[id];
    }

    getSystem(id) {
        return this.systems[id];
    }

    getComponentFromEntity(entityId, componentId) {
        return this.getEntity(entityId).getComponent(componentId);
    }
}