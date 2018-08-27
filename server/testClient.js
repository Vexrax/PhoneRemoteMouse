var WebSocketClient = require('websocket').client;
var client = new WebSocketClient();

client.connect('ws://localhost:5000/', null, null, null, null);