var express 	= require('express')
	, app 		= express()
	, server 	= require('http').createServer(app)
	, io 		= require('socket.io').listen(server);

var clients = {};

server.listen(3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
	socket.emit('initClient', socket.id);

	socket.on('mousemove', function(data) {
		socket.broadcast.emit('moving', data);
	});

	socket.on('disconnect', function() {
		socket.broadcast.emit('removeClient', socket.id)
	})
});