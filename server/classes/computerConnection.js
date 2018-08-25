class computerConnection {
    constructor(newSocket, name) {
        this.websocket = newSocket;
        this.id = name;
    }

}

module.exports = computerConnection;