class connections {
    constructor(eventEmitter) {
        // key is mobile websocket
        this.connecs = {}

        // key is user id
        this.unassignedMobiles = {}

        // key is user id
        this.unassignedComputers = {}

        this.connections = require('./connection');

        this.emitter = eventEmitter;
    }
    
    addMobile(mobileConnection) {
        // This user has connected a computer already
        if(this.unassignedComputers[mobileConnection.id]) {
            // Move connections to completed and create a new connection object
            this.connecs[mobileConnection.websocket] = new this.connections(mobileConnection, this.unassignedComputers[mobileConnection.id], mobileConnection.id);
            // Remove old connection
            delete this.unassignedComputers[mobileConnection.id];
            console.log("New Pair Added");
            this.emitter.emit('connectionMade', this.connecs[mobileConnection.websocket])
        }
        // This user has not connected a computer yet
        else {
            // Move connections to completed and create a new connection object
            this.unassignedMobiles[mobileConnection.id] = mobileConnection;
            console.log("Unassigned Mobile Added");
        }
    }

    addComputer(computerConnection) {
        // User has connected a mobile connection already
        if(this.unassignedMobiles[computerConnection.id]) {
            var mobileConnection = this.unassignedMobiles[computerConnection.id];
            // move connections to completed
            this.connecs[mobileConnection.websocket] = new this.connections(mobileConnection, computerConnection, computerConnection.id);;
            // Remove old connection
            delete this.unassignedMobiles[computerConnection.id];
            console.log("New Pair Added");
            this.emitter.emit('connectionMade', this.connecs[mobileConnection.websocket])

        }
        // User doesn't have a mobile connection yet
        else {
            this.unassignedComputers[computerConnection.name] = computerConnection;
            console.log("Unassigned Computer Added");
        }
    }

    //should get a connection with the ip address of a mobile connection
    getConnection(address) {
        return this.connecs[address];
    }
}

module.exports = connections;