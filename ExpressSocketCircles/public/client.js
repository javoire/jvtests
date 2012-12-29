$(function() {
	var socket = io.connect('http://localhost');
	var canvas = $('#canvas');
	var context = canvas[0].getContext("2d");
	var canvasWidth = $("#canvas").width();
	var canvasHeight = $("#canvas").height();
	var circles = {};
	var myData = {
		color : '#000', // TODO: randomize color
		x : 0,
		y : 0
	};

	console.log(myData.color);

	function draw() {
		context.fillStyle = "#fff";
		context.fillRect(0, 0, canvasWidth, canvasHeight);
		if(!(typeof circles[myData.id] == 'undefined')) {
			for (var id in circles) {
				drawCircle(circles[id].x, circles[id].y, circles[id].color);
			}
		}
	}

	function drawCircle (x, y, color) {
		context.beginPath();
		context.fillStyle = color;
		context.arc(x, y-30, 20, 0, Math.PI*2, true); // TODO: varför -30?
		context.closePath();
		context.fill();
	}

	socket.on('initClient', function(id) {
		myData['id'] = id;
		$('p').html(id);
		setTimeout(setInterval(draw, 10), 1000); // draw every 10 msec // TODO: weird that we have to wait 1 sec
	});

	socket.on('moving', function(data) {
		// TODO: unnecessary to update color var since it's static
		circles[data.id] = data; // update all (x, y color) data from other clients
	});
	

	canvas.on('removeClient', function(clientID) {
		// TODO: delete client form circles
	})

	var lastEmit = $.now();

	canvas.mousemove(function(e) {
		myData['x'] = e.pageX;
		myData['y'] = e.pageY;
		if(	!(typeof myData == 'undefined')) {
			circles[myData.id] = myData; // update my own data
		}
		if($.now() - lastEmit > 30){
			socket.emit('mousemove', myData ); // emit my data to all other clients
		}
		lastEmit = $.now();
	});
});