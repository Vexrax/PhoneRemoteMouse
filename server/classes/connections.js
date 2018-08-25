class connections {
    constructor() {
        // key is mobile ip address
        this.connecs = {}

        // key is user id
        this.unassignedMobiles = {}

        // key is user id
        this.unassignedComputers = {}

        this.connections = require('./connection');
    }
    
    addMobile(mobileConnection) {
        // This user has connected a computer already
        if(this.unassignedComputers[mobileConnection.name]) {
            // Move connections to completed and create a new connection object
            this.connecs[mobileConnection.ipAddress] = new this.connections(mobileConnection, this.unassignedComputers[mobileConnection.name], mobileConnection.name);
            // Remove old connection
            delete this.unassignedComputers[mobileConnection.name];
        }
        // This user has not connected a computer yet
        else {
            // Move connections to completed and create a new connection object
            this.unassignedMobiles[mobileConnection.name] = mobileConnection;
        }
    }

    addComputer(computerConnection) {
        // User has connected a mobile connection already
        if(this.unassignedMobiles[computerConnection.name]) {
            mobileConnection = this.unassignedMobiles[computerConnection.name];
            // move connections to completed
            this.connecs[mobileConnection.ipAddress] = new this.connections(mobileConnection, computerConnection, computerConnection.name);;
            // Remove old connection
            delete this.unassignedMobiles[computerConnection.name];
        }
        // User doesn't have a mobile connection yet
        else {
            this.unassignedComputers[computerConnection.name] = computerConnection;
        }
    }

    //should get a connection with the ip address of a mobile connection
    getConnection(address) {
        return this.connecs[address];
    }
}

module.exports = connections;