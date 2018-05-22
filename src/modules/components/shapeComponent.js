import { Component } from '../../core/component.js';

export class ShapeComponent extends Component {
    constructor(id, data) {
        super(id, data);
    }

    onAttach() {
        this.entity.sendSignal('shape.render', {entity: this.entity});
    }

    onDetatch() {}
}