var socket = io.connect('http://10.0.2.1');

var WIDTH;
var HEIGHT;
var context;
// var circle;
var name = '';
var circles = [];
var circlesCoords = [];

function start() {
	context = $('#canvas')[0].getContext("2d");
	WIDTH = $("#canvas").width();
	HEIGHT = $("#canvas").height();
	return setInterval(draw, 10); // draw every 10 msec
}

function clearCanvas() {
	context.fillStyle = "#fff";
	context.fillRect(0, 0, WIDTH, HEIGHT);
}

	
function draw() {
	clearCanvas();
	for (var i = circles.length - 1; i >= 0; i--) {
		circles[i].draw();
	};
}

socket.on('updateCircles', function (_circlesData) { // animate other circles
	circlesData = _circlesData;

	circles = [];
	for (var i = circlesData.length - 1; i >= 0; i--) {
		tmp = new Circle(circlesData[i].circle.coords.x, circlesData[i].circle.coords.y, context);
		tmp.color = circlesData[i].circle.color;
		circles.push(tmp);
	};
});

$(document).ready(function()
{
	start();
	circle = new Circle(50, 50, context);

	socket.emit('newCircle', {
		color: '#F00',
		coords: {
			x: circle.x,
			y: circle.y
		}
	})

	$('#canvas').mousemove(function(e) {
		// circle.x = e.pageX;
		// circle.y = e.pageY;
		socket.emit('dCirclePos', { x: e.pageX, y: e.pageY })
	})
});