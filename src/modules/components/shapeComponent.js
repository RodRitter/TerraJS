import { Component } from '../../core/component.js';

export class ShapeComponent extends Component {
    constructor(id, data) {
        super(id, data);
        this.hasDependency('Transform');
    }
}