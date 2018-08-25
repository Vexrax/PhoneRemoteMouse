class connections {
    constructor() {
        this.connecs = {}
        this.unassignedMobiles = {}
        this.unassignedComputers = {}
    }

    addConnection(newConnection) {
        try {
            var t = newConnection.mobile.ipAddress;
            if(this.connecs[t]) {
                return -1; //this mobile address already exists
            }
            this.connecs[t] = newConnection;
        } catch (error) {
            console.log(error);
        }
    }

    //should get a connection with the ip address of a mobile connection
    getConnection(address) {
        return this.connecs[address];
    }
}

module.exports = connections;