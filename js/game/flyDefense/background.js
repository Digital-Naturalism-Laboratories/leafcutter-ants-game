function Background()
{
	
	this.groundImage1 = undefined;
	this.groundImage2 = undefined;
	this.pheremoneStrip1Image = undefined;
	this.pheremoneStrip2Image = undefined;
	this.fungusNestImage = undefined;

	this.initialize = function()
	{
		
		this.groundImage1 = groundBackgroundImage;
		this.groundImage2 = groundBackground2Image;

		this.pheremoneStrip1Image = pheremoneStripImage1;
		this.pheremoneStrip2Image = pheremoneStripImage2;

		this.fungusNestImage = fungusNestImage;
	}

	this.groundImage1xCoordinate = 0;
	this.groundImage2xCoordinate = renderer.canvas.width;

	this.pheremoneStrip1ImageXCoordinate = 0;
	this.pheremoneStrip2ImageXCoordinate = renderer.canvas.width;

	this.fungusNestXCoordinate = renderer.canvas.width;
	this.fungusNestWidth = renderer.canvas.width*0.6;
	this.fungusNestStartingXMidpoint = this.fungusNestXCoordinate + this.fungusNestWidth/2;
	this.fungusNestTotalTravelDistance = this.fungusNestStartingXMidpoint - renderer.canvas.width/2;

	this.scrollGroundImages = function()
	{
		
		if (defenseGame.timeLeft < 31 && defenseGame.timeLeft > 0)
		{
			this.groundImage1xCoordinate--;
			this.groundImage2xCoordinate--;
			this.pheremoneStrip1ImageXCoordinate--;
			this.pheremoneStrip2ImageXCoordinate--;
		}

		if (defenseGame.timeLeft < 16 && defenseGame.timeLeft > 0)
		{
			this.fungusNestXCoordinate -= gameWidth * 0.001;
		}

		if (this.groundImage1xCoordinate + gameWidth < 0)
		{
			this.groundImage1xCoordinate = gameWidth;
		}
		if (this.groundImage2xCoordinate + gameWidth < 0)
		{
			this.groundImage2xCoordinate = gameWidth;
		}
		if(this.pheremoneStrip1ImageXCoordinate + gameWidth < 0)
		{
			this.pheremoneStrip1ImageXCoordinate = gameWidth;
		}
		if(this.pheremoneStrip2ImageXCoordinate + gameWidth < 0)
		{
			this.pheremoneStrip2ImageXCoordinate = gameWidth;
		}
	
	}

	this.update = function()
	{
		this.scrollGroundImages();
	}

	this.draw = function()
	{
		
		
		renderer.drawImage(this.groundImage1, this.groundImage1xCoordinate,0, renderer.canvas.width*1.01,renderer.canvas.height);
		renderer.drawImage(this.groundImage2, this.groundImage2xCoordinate,0, renderer.canvas.width*1.01,renderer.canvas.height);

		renderer.drawImage(this.pheremoneStrip1Image, this.pheremoneStrip1ImageXCoordinate,renderer.canvas.height*0.875, renderer.canvas.width*1.01,renderer.canvas.height*0.075);
		renderer.drawImage(this.pheremoneStrip2Image, this.pheremoneStrip2ImageXCoordinate,renderer.canvas.height*0.875, renderer.canvas.width*1.01,renderer.canvas.height*0.075);
	
		// defenseGame.canvasContext.drawImage(this.leftArrowButtonImage, 0,0, defenseGame.canvas.width,defenseGame.canvas.height);
		// defenseGame.canvasContext.drawImage(this.rightArrowButtonImage, 0,0, defenseGame.canvas.width,defenseGame.canvas.height);
		// defenseGame.canvasContext.drawImage(this.swatButtonImage, 0,0, defenseGame.canvas.width,defenseGame.canvas.height);

		
		renderer.drawImage(this.fungusNestImage, this.fungusNestXCoordinate,renderer.canvas.height*0.33, 
												   renderer.canvas.width*0.6,renderer.canvas.height*0.6);
	}
}