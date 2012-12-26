function Player(id) {
	this.id = id;
	this.circle = { 
		color: '#000',
		coords: {
			x: 0,
			y: 0
		}
	};
}

module.exports = Player;