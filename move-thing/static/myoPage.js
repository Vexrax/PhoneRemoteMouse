Myo.connect('localhost:3000');

Myo.on('status', function(data){
	$('.events').prepend(JSON.stringify(data, null, 2));
})
