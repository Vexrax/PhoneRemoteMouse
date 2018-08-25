class mobileConnection {
    constructor(newSocket, name) {
        this.websocket = newSocket;
        this.id = name;
    }
}

module.exports = mobileConnection;