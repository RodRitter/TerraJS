export class Component {
    constructor(id, data) {
        this.id = id;
        this.data = data;
        this.entity = null;
    }

    onAttach(entity) {
        console.log(`Attached '${this.id}' to '${entity.id}'`);
    }
}