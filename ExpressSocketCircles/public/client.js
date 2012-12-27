$(function() {
	var socket = io.connect('http://localhost');

	var canvas = $('#canvas');
	var context = canvas[0].getContext("2d");
	// canvasWidth = $("#canvas").width();
	// canvasHeight = $("#canvas").height();
	var circles = {};
	var id = { 
			id : '', 
			circle : ''
		};
	// var clients = {};

	// function draw() {
	// 	context.fillStyle = "#fff";
	// 	context.fillRect(0, 0, canvasWidth, canvasHeight);

	// 	// here draw own and other clients circles
	// }

	socket.on('initClient', function(newId) {
		id = newId;
		circles[id] = id;
		circles[id][circle] = 'new Circle(0,0,context)';
		// circles[id].circle = new Circle(0,0,context);
		console.log(circles)
	});

	socket.on('moving', function(data) {
		// here draw circles on canvas etc
	});
	// setInterval(draw, 10); // draw every 10 msec

	// circle = new Circle(50, 50, context);

	// socket.emit('newCircle', {
	// 	color: '#F00',
	// 	x: circle.x,
	// 	y: circle.y
	// })
	// console.log(circles);

	canvas.mousemove(function(e) {
		socket.emit('mousemove', {
			'id' : id,
			'x' : e.pageX,
			'y' : e.pageY,
			'color' : '#000'
		});
	});
});