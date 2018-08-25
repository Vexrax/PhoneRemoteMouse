var http = require('http');
var connections = require('./classes/connections');
var store = new connections();

var server = http.createServer(function(request, res) {
    if(request.method == "GET") {
        res.write("Not a get endpoint");
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
            body = data;
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6) { 
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                request.connection.destroy();
            }

            requestAddress = request.connection.remoteAddress;
            
            console.log(requestAddress);
        });
        
        return 'lmao';
    }
});

function findComputer() {

}

server.listen(5000);