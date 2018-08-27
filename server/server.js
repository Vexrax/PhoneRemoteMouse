var http = require('http');
var EventEmitter = require('events');
var WebSocketServer = require('websocket').server;

var connections = require('./classes/connections');
var computerConnection = require('./classes/computerConnection');
var mobileConnection = require('./classes/computerConnection');
var currentdate = new Date();

const connectEmitter = new EventEmitter();

var store = new connections(connectEmitter);

var dataCache = [];
var mouseVelocity = {x: 0, y: 0, z: 0}
var lastID = -1, acceptableRange = 1;
var server = http.createServer(function(request, res) {
    if(request.method == "GET") {
        res.write("Not a get endpoint");
        res.end();
    }
    else if (request.method == "POST") {
        res.write(JSON.stringify({dataCache}));
        res.end();
        dataCache = [];
    }
});

wsServer = new WebSocketServer({
    httpServer: server
});

// wsServer.on('message', (data) => {
//     console.log(data);
// });

wsServer.on('request', (request) => {
    // For now accept all requests and save the connection
    console.log("connections"); 
    webConnection = request.accept();
    webConnection.on('message', (data) => {
        // Convert acceleration data to movement data
        try {
            data = data.utf8Data;
            data = JSON.parse(data);
        }
        catch(error) {
            return;
        }
        if (data.eventType == "EVENT_MOVE") {
            currentdate = new Date();
            var curTime = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds() + ":" + currentdate.getMilliseconds();
            var staticMul = 100000;
            data.x = data.x; //the 20 is liable to change
            data.y = data.y;
            data.z = data.z;
            dataCache.push({id: data.i, eventType: data.eventType, 
                data: 
                {
                    x: calculateDisplacement(mouseVelocity.x, data.x) * staticMul,
                    y: calculateDisplacement(mouseVelocity.y, data.y) * staticMul,
                    z: calculateDisplacement(mouseVelocity.z, data.z) * staticMul,
                    time: curTime
                }
            });
        }
        else {
            if(data.eventType) {
                dataCache.push({id: data.i, eventType: data.eventType, data: {}});
            }
        }
    })

    id = "temp";
    // id = request.origin[0];?
    console.log("testing");
    // console.log(request);
    var data = request.httpRequest.headers;
    if(data.type == "COMPUTER") {
        store.addComputer(new computerConnection(webConnection, data.name));
    }
    else if(data.type == "MOBILE") {
        store.addMobile(new mobileConnection(webConnection, data.name));
    }
    else {
        console.log("Unidentified data type");
    }  
});

 
connectEmitter.on("connectionMade", (connection) => {
    // wsServer.
    console.log('lmao');
});

function calculateDisplacement(iV, accel) {
    var time = 0.016;
    return (iV * time) + (0.5 * accel * time * time);
}

server.listen(5000);