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
    }

    /**
     * This is called when it is attached to an Entity
     */
    onAttach() {
        
    }
}