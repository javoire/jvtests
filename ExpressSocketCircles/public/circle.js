function Circle(x, y, context)
{
	this.x = x;
	this.y = y;
	this.r = 20;
	this.context = context;
	this.color = '#000';
}

Circle.prototype.draw = function(context) {
	this.context.beginPath();
	this.context.fillStyle = this.color;
	this.context.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
	this.context.closePath();
	this.context.fill();
}