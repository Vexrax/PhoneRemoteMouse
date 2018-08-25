var http = require('http');
var EventEmitter = require('events');
var WebSocketServer = require('websocket').server;

var connections = require('./classes/connections');
var computerConnection = require('./classes/computerConnection');
var mobileConnection = require('./classes/computerConnection');

const connectEmitter = new EventEmitter();

var store = new connections(connectEmitter);

var server = http.createServer(function(request, res) {
    if(request.method == "GET") {
        res.write("Not a get endpoint");
        res.end();
    }
    else if (request.method == "POST") {
        //get values and start storing
        var ip, port;
        try {
            ip = request;
        } catch (error) {
            
        }
        var body = '';
        request.on('data', function (data) {
            body += data;
            console.log(body);
            return;
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6) { 
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                request.connection.destroy();
            }

            requestAddress = request.connection.remoteAddress;
            jsonRes = JSON.parse(body);
            if(jsonRes.type == "COMPUTER") {
                store.addComputer(new computerConnection(requestAddress, jsonRes.port, jsonRes.name));
            }
            else if(jsonRes.type == "MOBILE") {
                store.addMobile(new mobileConnection(requestAddress, jsonRes.port, jsonRes.name));
            }
        });
        
        return 'lmao';
    }
});

wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('message', (data) => {
    console.log(data);
});

wsServer.on('request', (request) => {
    // For now accept all requests and save the connection
    console.log("connections"); 
    webConnection = request.accept();
    webConnection.on('message', (data) => {
        console.log(data);
    })

    id = "temp";
    // id = request.origin[0];?
    // console.log(request.origin[0]);
    // console.log(request.httpRequest);
    // get values and start storing
    // var ip, port;
    // try {
    //     ip = request;
    // } catch (error) {
        
    // }
    // var body = '';
    // request.on('data', function (data) {
    //     body += data;
    //     // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
    //     if (body.length > 1e6) { 
    //         // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
    //         request.connection.destroy();
    //     }

    //     requestAddress = request.connection.remoteAddress;
    //     jsonRes = JSON.parse(body);
    //     if(jsonRes.type == "COMPUTER") {
    //         store.addComputer(new computerConnection(requestAddress, jsonRes.port, jsonRes.name));
    //     }
    //     else if(jsonRes.type == "MOBILE") {
    //         store.addMobile(new mobileConnection(requestAddress, jsonRes.port, jsonRes.name));
    //     }
    // });    
});

connectEmitter.on("connectionMade", (connection) => {
    // wsServer.
    console.log('lmao');
});

server.listen(5000);