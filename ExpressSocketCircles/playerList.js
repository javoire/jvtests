function PlayerList() {
	this.players = [];
}

PlayerList.prototype.addPlayer = function(player) {
	this.players.push(player);
}

PlayerList.prototype.getPlayer = function(playerId) {
	var player = null;
	for(var i = 0; i < this.players.length; i++){
		if(this.players[i].id == playerId){
			player = this.players[i];
			break;
		}
	}
	return player;
};

PlayerList.prototype.removePlayer = function(player) {
	var playerIndex = -1;
	for(var i = 0; i < this.players.length; i++){
		if(this.players[i].id == player.id){
			playerIndex = i;
			break;
		}
	}
	this.players.splice(playerIndex, 1);
};

module.exports = PlayerList;