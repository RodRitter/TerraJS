
export class Signal {
    constructor() {
        this.signals = {};
    }

    bind(id, system, callback) {
        if(!this.signals[id]) {
            this.signals[id] = [];
        }

        this.signals[id].push({ system: system, callback: callback });
    }

    unbind(id, system) {
        if(this.signals[id]) {
            this.signals[id].forEach((signal) => {
                if(signal.system.id == system.id) {
                    let index = this.signals[id].indexOf(signal);
                    this.signals[id].splice(index, 1);
                }
            });
        }
    }

    send(id, data) {
        if(this.signals[id]) {
            this.signals[id].forEach((signal) => {
                signal.callback(data);
            });
        }
    }
}