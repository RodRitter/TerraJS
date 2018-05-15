export class Entity {
    constructor(id, game, components) {
        this.id = id;
        this.componentMap = {};
        this.game = game;

        for(let i=0; i<components.length; i++) {
            this.attachComponent(components[i]);
        }
    }

    attachComponent(component) {
        if(this.componentMap[component.id] === undefined) {
            this.componentMap[component.id] = component;

            if(this.game.components[component.id] === undefined) {
                this.game.components[component.id] = [];
            } 
            this.game.components[component.id].push(component);
            component.onAttach(this);
            
        } else {
            throw(`There is already a component with the ID '${component.id}'`);
        }
    }

    getComponent(id) {
        if(this.componentMap[id] !== undefined) {
            return this.componentMap[id];
        }
        throw(`Cannot find Component '${id}' on Entity '${this.id}'`);
    }

}