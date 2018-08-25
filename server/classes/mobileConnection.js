class mobileConnection {
    constructor(newAddress, newPort, name) {
        this.port = newPort;
        this.ipAddress = newAddress;
        this.id = name;
    }

    setPort(newPort) {
        this.port = newPort;
    }
}

module.exports = mobileConnection;