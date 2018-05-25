
export class Signal {
    constructor() {
        this.signals = {};
    }

    /**
     * Listen for a specific signal with ID and call the function
     * @param {string} id - An ID of the signal
     * @param {System} system 
     * @param {function} callback 
     */
    bind(id, system, callback) {
        if(!this.signals[id]) {
            this.signals[id] = [];
        }

        this.signals[id].push({ system: system, callback: callback });
    }

    /**
     * Unbind a message & Remove it from the list of signals
     * @param {string} id 
     * @param {System} system 
     */
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

    /**
     * Send a signal with data
     * @param {string} id 
     * @param {Object} data 
     */
    send(id, data) {
        if(this.signals[id]) {
            this.signals[id].forEach((signal) => {
                signal.callback(data);
            });
        }
    }
}