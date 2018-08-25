

var express = require('express');
var io = require('socket.io');

var socket = io.connect('http://62326ee1.ngrok.io/');

// var msg = document.getElementById("message");
// var hndl = document.getElementById("handle");
// var btn = document.getElementById("send");

// btn.addEventListener('click', function(){
//     socket.emit('chat', {
//         message: msg.value,
//         handle: hndl.value
//     });
// });