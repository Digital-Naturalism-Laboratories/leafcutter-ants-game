function ExitButton()
{
	this.width = gameWidth*0.2;
	this.height = gameHeight*0.1;
	this.x = 0;
	this.y = gameHeight - this.height;

	this.horizontalMidpoint = this.width/2;

	this.draw = function()
	{
		//background
		renderer.fillStyle = 'gray';
		renderer.globalAlpha = 0.5;
		renderer.fillRect(this.x,this.y, this.width,this.height);
		renderer.globalAlpha = 1;

		renderer.fillStyle = 'white';
		renderer.font = '55px SmallBoldPixel';
		let textWidth = renderer.measureText(exitText).width;
		
		renderer.fillText(exitText, this.horizontalMidpoint - textWidth/2,gameHeight - 22.5);
	}

	this.hitBoxLeft = this.x;
	this.hitBoxTop = this.y;
	this.hitBoxRight = this.x + this.width;
	this.hitBoxBottom = this.y + this.height;
	this.handleInput = function(inputCoordinates)
	{
		if (inputCoordinates.x > this.hitBoxLeft && inputCoordinates.x < this.hitBoxRight && 
			inputCoordinates.y > this.hitBoxTop && inputCoordinates.y < this.hitBoxBottom)
		{
			defenseGame.passStats();
			defenseGame.reset();
			ui.stateIndex = COLONYGAMEUI;
		}
	}
}

let exitText = 'EXIT';