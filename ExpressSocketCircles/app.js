var express 			= require('express')
	, app 					= express()
	, server 				= require('http').createServer(app)
	, io 						= require('socket.io').listen(server)
	, Player 				= require('./player.js')
	, PlayerList 		= require('./playerList.js');

var playerList = new PlayerList();
var circles = [];

server.listen(3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
	playerList.addPlayer(new Player(socket.id));
	console.log('player connect ' + socket.id);

	socket.on('newCircle', function (newCircle) {
		playerList.getPlayer(socket.id).circle = newCircle;
	})

	socket.on('dCirclePos', function(coords) {
		playerList.getPlayer(socket.id).circle.coords.x = coords.x;
		playerList.getPlayer(socket.id).circle.coords.y = coords.y;

		var circles = [];
		for (var i = 0; i < playerList.players.length; i++) {
			circles[i] = {  id: socket.id, circle: playerList.players[i].circle }
		};

		io.sockets.emit('updateCircles', circles);
	})

	socket.on('disconnect', function () {
		playerList.removePlayer(playerList.getPlayer(socket.id));
		console.log('placer disconnected ' + socket.id);
	});
});