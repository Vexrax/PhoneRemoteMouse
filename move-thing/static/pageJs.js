var socket = io();

var lastEvent;
$('#drag-area').on('touchstart', function(event) {
    lastEvent = event;
});

$('#drag-area').on('touchmove', function(event) {
    //just needs to always be updated because touchend doesn't give a pos
    var old = lastEvent.originalEvent.touches[0];
    var newV = event.originalEvent.touches[0];
    socket.emit('move', {"x": old.pageX - newV.pageX, "y":old.pageY - newV.pageY})
    lastEvent = event;
});

$('#drag-area').on('touchend', function(event) {
    console.log(lastEvent);
});

$('#r-area').on('touchstart', function(event) {
    socket.emit("rClick");
});

$('#l-area').on('touchstart', function(event) {
    // console.log("out");
    socket.emit("lClick");
});