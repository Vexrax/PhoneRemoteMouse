class computerConnection {
    constructor() {
        this.port = -1;
        this.ipAddress = -1;
    }

    setPort(newPort) {
        this.port = newPort;
    }
}

module.exports = computerConnection;