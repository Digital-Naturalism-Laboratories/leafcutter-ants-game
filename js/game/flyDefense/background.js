function Background()
{
	this.skyImage = undefined;
	this.groundImage1 = undefined;
	this.groundImage2 = undefined;
	this.fungusNestImage = undefined;

	this.initialize = function()
	{
		this.skyImage = skyBackgroundImage;
		this.groundImage1 = groundBackgroundImage;
		this.groundImage2 = groundBackground2Image;

		// this.leftArrowButtonImage = leftArrowButtonImage;
		// this.rightArrowButtonImage = rightArrowButtonImage;
		// this.swatButtonImage = swatButtonImage;

		this.fungusNestImage = fungusNestImage;
	}

	this.groundImage1xCoordinate = 0;
	this.groundImage2xCoordinate = renderer.canvas.width;

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
	
	}

	this.update = function()
	{
		this.scrollGroundImages();
	}

	this.draw = function()
	{
		
		renderer.drawImage(this.skyImage, 0,0, gameWidth,gameHeight);
		renderer.drawImage(this.groundImage1, this.groundImage1xCoordinate,renderer.canvas.height*0.2, renderer.canvas.width*1.01,renderer.canvas.height);
		renderer.drawImage(this.groundImage2, this.groundImage2xCoordinate,renderer.canvas.height*0.2, renderer.canvas.width*1.01,renderer.canvas.height);
	
		// defenseGame.canvasContext.drawImage(this.leftArrowButtonImage, 0,0, defenseGame.canvas.width,defenseGame.canvas.height);
		// defenseGame.canvasContext.drawImage(this.rightArrowButtonImage, 0,0, defenseGame.canvas.width,defenseGame.canvas.height);
		// defenseGame.canvasContext.drawImage(this.swatButtonImage, 0,0, defenseGame.canvas.width,defenseGame.canvas.height);

		
		renderer.drawImage(this.fungusNestImage, this.fungusNestXCoordinate,renderer.canvas.height*0.33, 
												   renderer.canvas.width*0.6,renderer.canvas.height*0.6);
	}
}