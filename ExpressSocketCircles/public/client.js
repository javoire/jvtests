var socket = io.connect('http://localhost');

var canvasWidth;
var canvasHeight;
var context;
var canvas;
var circles = {};
var id = 'id';
// var clients = {};

// function draw() {
// 	context.fillStyle = "#fff";
// 	context.fillRect(0, 0, canvasWidth, canvasHeight);

// 	// here draw own and other clients circles
// }

socket.on('initClient', function(data) {
	id = data;
	console.log('new client ' + id);
	// circles[id].circle = new Circle(context);
});

socket.on('moving', function(data) {
	// here draw circles on canvas etc
	console.log('movint' + data);

});

$(document).ready(function()
{
	canvas = $('#canvas');
	context = canvas[0].getContext("2d");
	console.log(id);

	// canvasWidth = $("#canvas").width();
	// canvasHeight = $("#canvas").height();
	// setInterval(draw, 10); // draw every 10 msec

	// circle = new Circle(50, 50, context);

	// socket.emit('newCircle', {
	// 	color: '#F00',
	// 	x: circle.x,
	// 	y: circle.y
	// })

	canvas.mousemove(function(e) {
		socket.emit('mousemove', {
			'id' : id,
			'x' : e.pageX,
			'y' : e.pageY,
			'color' : '#000'
		})
	})
});