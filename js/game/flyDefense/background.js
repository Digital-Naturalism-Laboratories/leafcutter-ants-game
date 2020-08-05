function Background()
{
	
	this.groundLayerImage1 = undefined;
	this.groundLayerImage2 = undefined;
	this.grassLayerImage1 = undefined;
	this.grassLayerImage2 = undefined;
	this.leavesLayerImage1 = undefined;
	this.leavesLayerImage2 = undefined;
	this.forageLayerImage1 = undefined;
	this.forageLayerImage2 = undefined;
	this.pheremoneStrip1Image = undefined;
	this.pheremoneStrip2Image = undefined;
	this.currentIncomingPheremoneStripImage = undefined;
	this.pheremoneGapFillImage = undefined;
	this.fungusNestImage = undefined;

	this.groundImage1xCoordinate = undefined;
	this.groundImage2xCoordinate = undefined;
	
	this.pheremoneStrip1ImageXCoordinate = undefined;
	
	this.pheremoneGapWidth = undefined;
	this.pheremoneStripY = undefined;
	this.pheremoneStripHeight = undefined;

	this.pheremoneStrip2ImageXCoordinate = undefined;
	this.fungusNestWidth = undefined;
	this.fungusNestStartingXMidpoint = undefined;
	this.fungusNestTotalTravelDistance = undefined;

	this.currentPheremoneGapArrayIndex = undefined;
	this.currentPheremoneGap = undefined;

	this.stuckOnPheremoneGap = false;

	this.initialize = function()
	{
		
		this.groundLayerImage1 = groundLayerImage1;
		this.groundLayerImage2 = groundLayerImage2;
		this.grassLayerImage1 = grassLayerImage1;
		this.grassLayerImage2 = grassLayerImage2;
		this.leavesLayerImage1 = leavesLayerImage1;
		this.leavesLayerImage2 = leavesLayerImage2;
		this.forageLayerImage1 = forageLayerImage1;
		this.forageLayerImage2 = forageLayerImage2;
			

		this.pheremoneStrip1Image = pheremoneStripImage1;
		this.pheremoneStrip2Image = pheremoneStripImage2;
		this.currentIncomingPheremoneStripImage = this.pheremoneStrip2Image;
		this.pheremoneGapFillImage = pheremoneGapFillImage;

		this.fungusNestImage = fungusNestImage;

		this.groundImage1xCoordinate = 0;
		this.groundImage2xCoordinate = renderer.canvas.width;
		this.grassLayerImage1XCoordinate = 0;
		this.grassLayerImage2XCoordinate = renderer.canvas.width;
		this.leavesLayerImage1XCoordinate = 0;
		this.leavesLayerImage2XCoordinate = renderer.canvas.width;
		this.forageLayerImage1XCoordinate = 0;
		this.forageLayerImage2XCoordinate = renderer.canvas.width;

		this.pheremoneStrip1ImageXCoordinate = 0;

		this.pheremoneGapWidth = renderer.canvas.width*0.075;
		this.pheremoneStripY = renderer.canvas.height*0.875;
		this.pheremoneStripHeight = renderer.canvas.height*0.075;

		this.pheremoneStrip2ImageXCoordinate = renderer.canvas.width*1.01 + this.pheremoneGapWidth;

		this.fungusNestXCoordinate = renderer.canvas.width;
		this.fungusNestWidth = renderer.canvas.width*0.6;
		this.fungusNestStartingXMidpoint = this.fungusNestXCoordinate + this.fungusNestWidth/2;
		this.fungusNestTotalTravelDistance = this.fungusNestStartingXMidpoint - renderer.canvas.width/2;

		this.pheremoneGapManager = new PheremoneGapManager();
		this.pheremoneGap1 = new PheremoneGap(renderer.canvas.width*1.01);
		this.pheremoneGapManager.arrayOfPheremoneGaps.push(this.pheremoneGap1);
		this.pheremoneGap2 = new PheremoneGap(renderer.canvas.width*1.01 + this.pheremoneGapWidth + renderer.canvas.width*1.01);
		this.pheremoneGapManager.arrayOfPheremoneGaps.push(this.pheremoneGap2);

		this.currentPheremoneGapArrayIndex = 0;
		this.currentPheremoneGap = this.pheremoneGapManager.arrayOfPheremoneGaps[this.currentPheremoneGapArrayIndex];
	}

	this.scrollGroundImages = function()
	{
		if (!this.stuckOnPheremoneGap)
		{
			if (defenseGame.timeLeft < 31 && defenseGame.timeLeft > 0)
			{
				
				this.forageLayerImage1XCoordinate-=gameWidth*0.00025;
				this.forageLayerImage2XCoordinate-=gameWidth*0.00025;
				this.grassLayerImage1XCoordinate-=gameWidth*0.0005;
				this.grassLayerImage2XCoordinate-=gameWidth*0.0005;
				this.leavesLayerImage1XCoordinate-=gameWidth*0.00075;
				this.leavesLayerImage2XCoordinate-=gameWidth*0.00075;
				this.groundImage1xCoordinate-=gameWidth*0.001;
				this.groundImage2xCoordinate-=gameWidth*0.001;
				this.pheremoneStrip1ImageXCoordinate-=renderer.canvas.width*0.001;
				this.pheremoneStrip2ImageXCoordinate-=renderer.canvas.width*0.001;
				
			}

			if (!this.stuckOnPheremoneGap)
			{
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
					this.pheremoneStrip1ImageXCoordinate = this.pheremoneStrip2ImageXCoordinate + renderer.canvas.width*1.01 + this.pheremoneGapWidth;
				}
				if(this.pheremoneStrip2ImageXCoordinate + gameWidth < 0)
				{
					this.pheremoneStrip2ImageXCoordinate = this.pheremoneStrip1ImageXCoordinate + renderer.canvas.width*1.01 + this.pheremoneGapWidth;
				}
				if (this.grassLayerImage1XCoordinate + gameWidth < 0)
				{
					this.grassLayerImage1XCoordinate = gameWidth;
				}
				if (this.grassLayerImage2XCoordinate + gameWidth < 0)
				{
					this.grassLayerImage2XCoordinate = gameWidth;
				}
				if (this.leavesLayerImage1XCoordinate + gameWidth < 0)
				{
					this.leavesLayerImage1XCoordinate = gameWidth;
				}
				if (this.leavesLayerImage2XCoordinate + gameWidth < 0)
				{
					this.leavesLayerImage2XCoordinate = gameWidth;
				}
				if (this.forageLayerImage1XCoordinate + gameWidth < 0)
				{
					this.forageLayerImage1XCoordinate = gameWidth;
				}
				if (this.forageLayerImage2XCoordinate + gameWidth < 0)
				{
					this.forageLayerImage2XCoordinate = gameWidth;
				}
			}
		}
		
	
	}

	this.update = function()
	{
		this.scrollGroundImages();
	}

	this.touchStartCoordinates = vec2();
	this.fillInCurrentPheremoneGap = false;
	
	this.handleTouchStart = function()
	{
		this.touchStartCoordinates = vec2(touchPos[0].x - canvasStartX, touchPos[0].y - canvasStartY);
		let arrayOfPheremoneGaps = this.pheremoneGapManager.arrayOfPheremoneGaps;
		for (let i = 0; i < arrayOfPheremoneGaps.length; i++)
		{
			if (this.touchStartCoordinates.x >= arrayOfPheremoneGaps[i].x && this.touchStartCoordinates.x < arrayOfPheremoneGaps[i].x + arrayOfPheremoneGaps[i].width &&
			this.touchStartCoordinates.y >= arrayOfPheremoneGaps[i].y && this.touchStartCoordinates.y < arrayOfPheremoneGaps[i].y + arrayOfPheremoneGaps[i].height &&
			arrayOfPheremoneGaps[i].isFilledIn === false)
			{
				defenseGame.groundMinimManager.toggleEnRouteStatusAfterUserClick();	
			}

		}
		// if (this.touchStartCoordinates.x >= this.pheremoneGap.x && this.touchStartCoordinates.x <= this.pheremoneGap.x + this.pheremoneGap.width &&
		// 	this.touchStartCoordinates.y >= this.pheremoneGap.y && this.touchStartCoordinates.y <= this.pheremoneGap.y + this.pheremoneGap.height)
		// {
			
		// 	this.fillInCurrentPheremoneGap = true;

			

		// 	if (this.currentIncomingPheremoneStripImage === this.pheremoneStrip2Image)
		// 			{
		// 				this.pheremoneGap.x = this.pheremoneStrip2ImageXCoordinate + gameWidth;
		// 			}
		// 			else if (this.currentIncomingPheremoneStripImage === this.pheremoneStrip1Image)
		// 			{
		// 				this.pheremoneGap.x = this.pheremoneStrip1ImageXCoordinate + gameWidth;
		// 			}
		// }
	}

	this.mouseDownCoordinates = vec2();
	this.handleMouseDown = function()
	{
		this.mouseDownCoordinates = vec2(touchPos[0].x - canvasStartX, touchPos[0].y - canvasStartY);
		let arrayOfPheremoneGaps = this.pheremoneGapManager.arrayOfPheremoneGaps;
		for (let i = 0; i < arrayOfPheremoneGaps.length; i++)
		{
			if (this.mouseDownCoordinates.x >= arrayOfPheremoneGaps[i].x && this.mouseDownCoordinates.x < arrayOfPheremoneGaps[i].x + arrayOfPheremoneGaps[i].width &&
			this.mouseDownCoordinates.y >= arrayOfPheremoneGaps[i].y && this.mouseDownCoordinates.y < arrayOfPheremoneGaps[i].y + arrayOfPheremoneGaps[i].height &&
			arrayOfPheremoneGaps[i].isFilledIn === false)
			{
				defenseGame.groundMinimManager.toggleEnRouteStatusAfterUserClick();	
			}
		}
	}

	this.draw = function()
	{

		renderer.drawImage(this.forageLayerImage1, this.forageLayerImage1XCoordinate,0, renderer.canvas.width*1.01,renderer.canvas.height);
		renderer.drawImage(this.forageLayerImage2, this.forageLayerImage2XCoordinate,0, renderer.canvas.width*1.01,renderer.canvas.height);
		renderer.drawImage(this.grassLayerImage1, this.grassLayerImage1XCoordinate,0, renderer.canvas.width*1.01,renderer.canvas.height);
		renderer.drawImage(this.grassLayerImage2, this.grassLayerImage2XCoordinate,0, renderer.canvas.width*1.01,renderer.canvas.height);
		renderer.drawImage(this.leavesLayerImage1, this.leavesLayerImage1XCoordinate,0, renderer.canvas.width*1.01,renderer.canvas.height);
		renderer.drawImage(this.leavesLayerImage2, this.leavesLayerImage2XCoordinate,0, renderer.canvas.width*1.01,renderer.canvas.height);
		renderer.drawImage(this.groundLayerImage1, this.groundImage1xCoordinate,0, renderer.canvas.width*1.01,renderer.canvas.height);
		renderer.drawImage(this.groundLayerImage2, this.groundImage2xCoordinate,0, renderer.canvas.width*1.01,renderer.canvas.height);

		renderer.drawImage(this.pheremoneStrip1Image, this.pheremoneStrip1ImageXCoordinate,this.pheremoneStripY, 
						   renderer.canvas.width*1.01,this.pheremoneStripHeight);
		renderer.drawImage(this.pheremoneStrip2Image, this.pheremoneStrip2ImageXCoordinate,this.pheremoneStripY, 
						   renderer.canvas.width*1.01,this.pheremoneStripHeight);

		this.pheremoneGapManager.drawPheremoneGaps();
	
		// defenseGame.canvasContext.drawImage(this.leftArrowButtonImage, 0,0, defenseGame.canvas.width,defenseGame.canvas.height);
		// defenseGame.canvasContext.drawImage(this.rightArrowButtonImage, 0,0, defenseGame.canvas.width,defenseGame.canvas.height);
		// defenseGame.canvasContext.drawImage(this.swatButtonImage, 0,0, defenseGame.canvas.width,defenseGame.canvas.height);

		
		renderer.drawImage(this.fungusNestImage, this.fungusNestXCoordinate,renderer.canvas.height*0.33, 
												   renderer.canvas.width*0.6,renderer.canvas.height*0.6);

		
		if (defenseGame.debugOn)
		{
			
			renderer.strokeStyle = 'red';
			renderer.lineWidth = 5;
			renderer.moveTo(this.pheremoneStrip1ImageXCoordinate + gameWidth,this.pheremoneStripY - 10);
			renderer.lineTo(this.pheremoneStrip1ImageXCoordinate  + gameWidth,this.pheremoneStripY + 10);
			renderer.stroke();

			renderer.moveTo(this.pheremoneStrip2ImageXCoordinate  + gameWidth,this.pheremoneStripY - 10);
			renderer.lineTo(this.pheremoneStrip2ImageXCoordinate + gameWidth,this.pheremoneStripY + 10);
			renderer.stroke();
		}
	}
}

function PheremoneGap(x)
{
	this.x = x;
	this.y = defenseGame.background.pheremoneStripY;
	this.width = defenseGame.background.pheremoneGapWidth;
	this.height = defenseGame.background.pheremoneStripHeight;

	this.isFilledIn = false;

	this.fillImage = pheremoneGapFillImage;

	this.update = function()
	{
		if (!defenseGame.background.stuckOnPheremoneGap && defenseGame.timeLeft > 0)
		{
			this.x -= renderer.canvas.width*0.001;
		}
	}

	this.draw = function()
	{
		if (this.isFilledIn)
		{
			renderer.drawImage(this.fillImage, this.x,this.y, this.width,this.height);
			if (defenseGame.debugOn)
			{
				if (defenseGame.debugOn)
				{
					renderer.strokeStyle = 'red';
					renderer.lineWidth = 5;
					renderer.strokeRect(this.x,this.y, this.width,this.height);
				}
			}
		}
	}
}

function PheremoneGapManager()
{
	this.arrayOfPheremoneGaps = [];

	this.updatePheremoneGaps = function()
	{
		for (let i = 0; i < this.arrayOfPheremoneGaps.length; i++)
		{
			this.arrayOfPheremoneGaps[i].update();
		}
	}

	this.drawPheremoneGaps = function()
	{
		for (let i = 0; i < this.arrayOfPheremoneGaps.length; i++)
		{
			this.arrayOfPheremoneGaps[i].draw();
		}
	}

	this.checkForGettingStuckOnPheremoneGaps = function()
	{
						

		for (let i = 0; i < this.arrayOfPheremoneGaps.length; i++)
		{
			
			if (!this.arrayOfPheremoneGaps[i].isFilledIn && 
				this.arrayOfPheremoneGaps[i].x - (defenseGame.parentAntObject.bigAntX + defenseGame.parentAntObject.bigAntWidth) < 5 )
			{
				
				defenseGame.background.stuckOnPheremoneGap = true;
				defenseGame.flyManager.toggleSwarm();
			}
		}
	}
}