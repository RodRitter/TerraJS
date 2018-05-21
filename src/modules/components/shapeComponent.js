import { Component } from '../../core/component.js';

export class ShapeComponent extends Component {
    constructor(id, data) {
        super(id, data);
    }

    onAttach() {
        let system = this.entity.game.systems['RenderingSystem'];
        system.renderShape(system, this.entity);
    }
}