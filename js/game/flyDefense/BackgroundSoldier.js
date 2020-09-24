function BackgroundSoldier()
{
	this.name = 'background soldier';
	this.image = bigAntWalkingSpriteSheetFlipped;
	this.imageSourceWidth = 553;
	this.imageSourceHeight = 320;
	this.currentSpritesheetIndex = 0;

	this.height = renderer.canvas.height*0.25;
	this.width = renderer.canvas.width*0.5;

	this.x = getRandomIntInclusive(renderer.canvas.width + this.width, renderer.canvas.width*2) ;
	this.y = renderer.canvas.height - this.height*1.66;

	this.resize = function()
	{
		this.height = renderer.canvas.height*0.25;
		this.width = renderer.canvas.width*0.5;

		this.x = getRandomIntInclusive(renderer.canvas.width + this.width, renderer.canvas.width*2) ;
		this.y = renderer.canvas.height - this.height*1.66;
	}
	
	this.cycleImages = function()
	{
		this.currentSpritesheetIndex++;
		if (this.currentSpritesheetIndex > 10)
		{
			this.currentSpritesheetIndex = 0;
		}
	}

	this.draw = function()
	{
		renderer.drawImage(this.image, this.currentSpritesheetIndex*this.imageSourceWidth,0, this.imageSourceWidth,this.imageSourceHeight,
						   this.x,this.y, this.width,this.height);
	}

	this.move = function()
	{
		this.x -= renderer.canvas.width*0.002;
		if (this.x < -gameWidth/2)
		{
			this.x = getRandomIntInclusive(renderer.canvas.width + this.width, renderer.canvas.width*2);
		}
		
	}

	this.update = function()
	{
		this.move();
		
	}

	this.initialize = function()
	{
		var _this = this;
		setInterval(function(){_this.cycleImages()},100);

	}
}