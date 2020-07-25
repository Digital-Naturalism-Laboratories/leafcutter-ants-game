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
	this.groundImage2xCoordinate = leafcutterGame.canvas.width;

	this.fungusNestXCoordinate = leafcutterGame.canvas.width;
	this.fungusNestWidth = leafcutterGame.canvas.width*0.6;
	this.fungusNestStartingXMidpoint = this.fungusNestXCoordinate + this.fungusNestWidth/2;
	this.fungusNestTotalTravelDistance = this.fungusNestStartingXMidpoint - leafcutterGame.canvas.width/2;

	this.scrollGroundImages = function()
	{
		
		if (leafcutterGame.timeLeft < 31 && leafcutterGame.timeLeft > 0)
		{
			this.groundImage1xCoordinate--;
			this.groundImage2xCoordinate--;
		}

		if (leafcutterGame.timeLeft < 16 && leafcutterGame.timeLeft > 0)
		{
			this.fungusNestXCoordinate -= leafcutterGame.canvas.width * 0.001;
		}

		if (this.groundImage1xCoordinate + leafcutterGame.canvas.width < 0)
		{
			this.groundImage1xCoordinate = leafcutterGame.canvas.width;
		}
		if (this.groundImage2xCoordinate + leafcutterGame.canvas.width< 0)
		{
			this.groundImage2xCoordinate = leafcutterGame.canvas.width;
		}
	
	}

	this.update = function()
	{
		this.scrollGroundImages();
	}

	this.draw = function()
	{
		leafcutterGame.canvasContext.drawImage(this.skyImage, 0,0, leafcutterGame.canvas.width,leafcutterGame.canvas.height);
		leafcutterGame.canvasContext.drawImage(this.groundImage1, this.groundImage1xCoordinate,leafcutterGame.canvas.height*0.2, leafcutterGame.canvas.width*1.01,leafcutterGame.canvas.height);
		leafcutterGame.canvasContext.drawImage(this.groundImage2, this.groundImage2xCoordinate,leafcutterGame.canvas.height*0.2, leafcutterGame.canvas.width*1.01,leafcutterGame.canvas.height);
	
		// leafcutterGame.canvasContext.drawImage(this.leftArrowButtonImage, 0,0, leafcutterGame.canvas.width,leafcutterGame.canvas.height);
		// leafcutterGame.canvasContext.drawImage(this.rightArrowButtonImage, 0,0, leafcutterGame.canvas.width,leafcutterGame.canvas.height);
		// leafcutterGame.canvasContext.drawImage(this.swatButtonImage, 0,0, leafcutterGame.canvas.width,leafcutterGame.canvas.height);

		
		leafcutterGame.canvasContext.drawImage(this.fungusNestImage, this.fungusNestXCoordinate,leafcutterGame.canvas.height*0.33, 
												   leafcutterGame.canvas.width*0.6,leafcutterGame.canvas.height*0.6);
	}
}