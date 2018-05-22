export class Component {
    constructor(id, data) {
        /**
         * @type {string}
         */
        this.id = id;

        /**
         * @type {Object}
         */
        this.data = data;

        /**
         * @type {Entity}
         */
        this.entity = null;

        /**
         * @type {string[]}
         */
        this.dependencies = [];
    }

    /**
     * This is called if attached while game is not running
     */
    offlineAttach(entity) {
        this._checkDependencies(entity);
    }

    /**
     * This is called when it is attached to an Entity
     */
    onAttach() {}

    /**
     * This is called when it is detatched from an Entity
     */
    onDetatch() {}

    setDependency(id) {
        this.dependencies.push(id);
    }

    /**
     * This will check if the entity it's being attached to, has this component's dependencies.
     */
    _checkDependencies(entity) {
        let missingDependencies = [];

        this.dependencies.forEach((dependency) => {
            let isMissing = true;

            for(let i=0; i < Object.keys(entity.components).length; i++) {
                if(Object.keys(entity.components)[i] == dependency) {
                    isMissing = false;
                }
            }

            if(isMissing) missingDependencies.push(dependency);
        });

        if(missingDependencies.length > 0) {
            throw new Error(`${this.id} requires ${missingDependencies.length} other component dependencies. Make sure ${this.id} is added after it's dependencies.`);
        }
    }
}