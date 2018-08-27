var Myo = require('myo');

Myo.connect('com.stolksdorf.MyMyo', require('ws'));

Myo.on('fist', function(){
	console.log('Hello Myo!');
	this.vibrate();
});