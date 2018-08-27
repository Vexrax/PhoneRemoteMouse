var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var robot = require("robotjs");


app.use('/static', express.static('static'))


app.get('/', function(req, res){
  res.sendfile('page.html');
});

app.get('/myo', function(req, res){
    res.sendfile('page2.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('move', function(msg){
        var curPos = robot.getMousePos();
        robot.moveMouse(curPos.x - msg.x, curPos.y - msg.y);
        
    });
    socket.on('lClick', function(msg){
        robot.mouseClick("left", false);
    });
    socket.on('rClick', function(msg){
        robot.mouseClick("right", false);
    });
});