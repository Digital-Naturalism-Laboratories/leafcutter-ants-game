var gapCircleIndicatorTimer = 60;

function Background()
{
	
	this.groundLayerImage1 = undefined;
	this.groundLayerImage2 = undefined;

	this.groundLayerImage3 = undefined;

	this.grassLayerImage1 = undefined;
	this.grassLayerImage2 = undefined;

	this.grassLayerImage3 = undefined;

	this.leavesLayerImage1 = undefined;
	this.leavesLayerImage2 = undefined;

	this.leavesLayerImage3 = undefined;

	this.forageLayerImage1 = undefined;
	this.forageLayerImage2 = undefined;

	this.forageLayerImage3 = undefined;

	this.pheremoneStrip1Image = undefined;
	this.pheremoneStrip2Image = undefined;

	this.pheremoneStrip3Image = undefined;

	this.currentIncomingPheremoneStripImage = undefined;
	this.pheremoneGapFillImage = undefined;
	this.colonyMoundImage = undefined;

	this.colonyMoundXCoordinate = undefined;
	this.colonyMoundYCoordinate = undefined;
	this.colonyMoundWidth = undefined;
	this.colonyMoundHeight = undefined;

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

	this.bigAntTallyOfInfections = 0;
	this.slowDownRateFromInfections = 0;

	this.exitButton = new ExitButton();


	this.calculateSlowDownRateFromInfections = function()
	{
		this.slowDownRateFromInfections = this.bigAntTallyOfInfections*0.15;
		
		if (this.slowDownRateFromInfections >  5 *0.15)
		{
			this.slowDownRateFromInfections =  5 *0.15;
		}
	}

	this.stuckOnPheremoneGap = false;

	this.initialize = function()
	{
		
		this.groundLayerImage1 = groundLayerImage1;
		this.groundLayerImage2 = groundLayerImage2;

		this.groundLayerImage3 = groundLayerImage2;

		this.grassLayerImage1 = grassLayerImage1;
		this.grassLayerImage2 = grassLayerImage2;

		this.grassLayerImage3 = grassLayerImage2;

		this.leavesLayerImage1 = grassLayerImage2;
		this.leavesLayerImage2 = grassLayerImage1;

		this.leavesLayerImage3 = grassLayerImage1;

		this.forageLayerImage1 = forageLayerImage1;
		this.forageLayerImage2 = forageLayerImage2;

		this.forageLayerImage3 = forageLayerImage2;
			

		this.pheremoneStrip1Image = pheremoneStripImage1;
		this.pheremoneStrip2Image = pheremoneStripImage2;

		this.pheremoneStrip3Image = pheremoneStripImage2;

		this.currentIncomingPheremoneStripImage = this.pheremoneStrip2Image;
		this.pheremoneGapFillImage = pheremoneGapFillImage;

		this.colonyMoundImage = colonyMoundImage;

		this.groundImage1xCoordinate = 0;
		this.groundImage2xCoordinate = renderer.canvas.width;

		this.groundImage3xCoordinate = -renderer.canvas.width;

		this.grassLayerImage1XCoordinate = 0;
		this.grassLayerImage2XCoordinate = renderer.canvas.width;

		this.grassLayerImage3XCoordinate = -renderer.canvas.width;

		this.leavesLayerImage1XCoordinate = 0;
		this.leavesLayerImage2XCoordinate = renderer.canvas.width;

		this.leavesLayerImage3XCoordinate = -renderer.canvas.width;

		this.forageLayerImage1XCoordinate = 0;
		this.forageLayerImage2XCoordinate = renderer.canvas.width;

		this.forageLayerImage3XCoordinate = -renderer.canvas.width;

		this.pheremoneStrip1ImageXCoordinate = 0;

		this.pheremoneGapWidth = renderer.canvas.width*0.075;
		this.pheremoneStripY = renderer.canvas.height*0.875;
		this.pheremoneStripHeight = renderer.canvas.height*0.075;

		this.pheremoneStrip2ImageXCoordinate = renderer.canvas.width*1.01 + this.pheremoneGapWidth;


		//this.colonyMoundXCoordinate = (renderer.canvas.width + this.pheremoneGapWidth)*4;

		this.colonyMoundWidth = renderer.canvas.width*0.85;
		this.colonyMoundHeight = renderer.canvas.height*0.7;
		this.colonyMoundXCoordinate = 2.7*renderer.canvas.width;
		this.colonyMoundYCoordinate = renderer.canvas.height - this.colonyMoundHeight*0.85;
		this.colonyMoundMidpoint = this.colonyMoundXCoordinate + this.colonyMoundWidth/2;
		
		this.pheremoneGapManager = new PheremoneGapManager();
		this.pheremoneGapManager.instantiatePheremoneGaps();
		this.flashAlertInterval = new frameInterval(defenseGame.background.pheremoneGapManager.toggleAlertMessageVisibility, 300);

		

		this.currentPheremoneGapArrayIndex = 0;
		this.currentPheremoneGap = this.pheremoneGapManager.arrayOfPheremoneGaps[this.currentPheremoneGapArrayIndex];

		this.fungusSporeFeedbackAnimationManager = new FungusSporeFeedbackAnimationManager();
	}

	this.resize = function()
	{
		this.groundImage1xCoordinate = 0;
		this.groundImage2xCoordinate = renderer.canvas.width;

		this.groundImage3xCoordinate = -renderer.canvas.width;

		this.grassLayerImage1XCoordinate = 0;
		this.grassLayerImage2XCoordinate = renderer.canvas.width;

		this.grassLayerImage3XCoordinate = -renderer.canvas.width;

		this.leavesLayerImage1XCoordinate = 0;
		this.leavesLayerImage2XCoordinate = renderer.canvas.width;

		this.leavesLayerImage3XCoordinate = -renderer.canvas.width;

		this.forageLayerImage1XCoordinate = 0;
		this.forageLayerImage2XCoordinate = renderer.canvas.width;

		this.forageLayerImage3XCoordinate = -renderer.canvas.width;

		this.pheremoneStrip1ImageXCoordinate = 0;

		this.pheremoneGapWidth = renderer.canvas.width*0.075;
		this.pheremoneStripY = renderer.canvas.height*0.875;
		this.pheremoneStripHeight = renderer.canvas.height*0.075;

		this.pheremoneStrip2ImageXCoordinate = renderer.canvas.width*1.01 + this.pheremoneGapWidth;

		this.colonyMoundWidth = renderer.canvas.width*0.85;
		this.colonyMoundHeight = renderer.canvas.height*0.7;
		this.colonyMoundXCoordinate = 2.7*renderer.canvas.width;
		this.colonyMoundYCoordinate = renderer.canvas.height - this.colonyMoundHeight*0.85;
		this.colonyMoundMidpoint = this.colonyMoundXCoordinate + this.colonyMoundWidth/2;
	}

	this.transitionOveride = 1;
	this.scrollGroundImages = function()
	{
		if (!this.stuckOnPheremoneGap && !defenseGame.colonyReached && !defenseGame.transitioningToUninfectedAnt)
		{
			if (defenseGame.timeLeft < 121 && defenseGame.timeLeft > 0)
			{
				this.forageLayerImage1XCoordinate-=gameWidth*0.00025 - (gameWidth*0.00025 * this.slowDownRateFromInfections);
				this.forageLayerImage2XCoordinate-=gameWidth*0.00025 - (gameWidth*0.00025 * this.slowDownRateFromInfections);
				
								this.forageLayerImage3XCoordinate-=gameWidth*0.00025 - (gameWidth*0.00025 * this.slowDownRateFromInfections);

				this.grassLayerImage1XCoordinate-=gameWidth*0.00075 - (gameWidth*0.00075 * this.slowDownRateFromInfections);
				this.grassLayerImage2XCoordinate-=gameWidth*0.00075 - (gameWidth*0.00075 * this.slowDownRateFromInfections);
				
								this.grassLayerImage3XCoordinate-=gameWidth*0.00075 - (gameWidth*0.00075 * this.slowDownRateFromInfections);

				this.leavesLayerImage1XCoordinate-=gameWidth*0.0005 - (gameWidth*0.0005 * this.slowDownRateFromInfections);
				this.leavesLayerImage2XCoordinate-=gameWidth*0.0005 - (gameWidth*0.0005 * this.slowDownRateFromInfections);
				
								this.leavesLayerImage3XCoordinate-=gameWidth*0.0005 - (gameWidth*0.0005 * this.slowDownRateFromInfections);

				this.groundImage1xCoordinate-=gameWidth*0.001 - (gameWidth*0.001 * this.slowDownRateFromInfections);
				this.groundImage2xCoordinate-=gameWidth*0.001 - (gameWidth*0.001 * this.slowDownRateFromInfections);
				
								this.groundImage3xCoordinate-=gameWidth*0.001 - (gameWidth*0.001 * this.slowDownRateFromInfections);

				this.pheremoneStrip1ImageXCoordinate-=gameWidth*0.001 - (gameWidth*0.001 * this.slowDownRateFromInfections);
				this.pheremoneStrip2ImageXCoordinate-=gameWidth*0.001 - (gameWidth*0.001 * this.slowDownRateFromInfections);
				this.colonyMoundXCoordinate-=gameWidth*0.001 - (gameWidth*0.001 * this.slowDownRateFromInfections);
				this.colonyMoundMidpoint = this.colonyMoundXCoordinate + this.colonyMoundWidth/2;
				// this.pheremoneStrip3ImageXCoordinate-=renderer.canvas.width*0.001;
				// this.pheremoneStrip4ImageXCoordinate-=renderer.canvas.width*0.001;
				// this.pheremoneStrip5ImageXCoordinate-=renderer.canvas.width*0.001;
				
				if (defenseGame.bigAntManager.currentActiveAnt.bigAntX + defenseGame.bigAntManager.currentActiveAnt.bigAntWidth >= this.colonyMoundMidpoint)
				{
					console.log('colony reached');
					defenseGame.colonyReached = true;
					defenseGame.bigAntManager.changeToIdleSpriteSheets();
				}
			}

			if (!this.stuckOnPheremoneGap)
			{
				if (defenseGame.timeLeft < 16 && defenseGame.timeLeft > 0)
				{
					//this.fungusNestXCoordinate -= gameWidth * 0.001;
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
			}//end of if not stuck on pheremone gap			
		}

		if (defenseGame.transitioningToUninfectedAnt)
			{
					console.log('this.slowDownRateFromInfections: ' + this.slowDownRateFromInfections);
					this.forageLayerImage1XCoordinate+=gameWidth*0.0006 - (gameWidth*0.0006 * this.slowDownRateFromInfections); 
					this.forageLayerImage2XCoordinate+=gameWidth*0.0006 - (gameWidth*0.0006 * this.slowDownRateFromInfections);
					
									this.forageLayerImage3XCoordinate+=gameWidth*0.0006 - (gameWidth*0.0006 * this.slowDownRateFromInfections);

					this.grassLayerImage1XCoordinate+=gameWidth*0.0018 - (gameWidth*0.0018 * this.slowDownRateFromInfections);
					this.grassLayerImage2XCoordinate+=gameWidth*0.0018 - (gameWidth*0.0018 * this.slowDownRateFromInfections);
					
									this.grassLayerImage3XCoordinate+=gameWidth*0.0018 - (gameWidth*0.0018 * this.slowDownRateFromInfections);

					this.leavesLayerImage1XCoordinate+=gameWidth*0.0015 - (gameWidth*0.0015 * this.slowDownRateFromInfections);
					this.leavesLayerImage2XCoordinate+=gameWidth*0.0015 - (gameWidth*0.0015 * this.slowDownRateFromInfections);
					
									this.leavesLayerImage3XCoordinate+=gameWidth*0.0015 - (gameWidth*0.0015 * this.slowDownRateFromInfections);

					this.groundImage1xCoordinate+=gameWidth*0.0025 - (gameWidth*0.0025 * this.slowDownRateFromInfections);
					this.groundImage2xCoordinate+=gameWidth*0.0025 - (gameWidth*0.0025 * this.slowDownRateFromInfections);
					
									this.groundImage3xCoordinate+=gameWidth*0.0025 - (gameWidth*0.0025 * this.slowDownRateFromInfections);

					this.pheremoneStrip1ImageXCoordinate+=gameWidth*0.0025 - (gameWidth*0.0025 * this.slowDownRateFromInfections);
					this.pheremoneStrip2ImageXCoordinate+=gameWidth*0.0025 - (gameWidth*0.0025 * this.slowDownRateFromInfections);
					this.colonyMoundXCoordinate+=gameWidth*0.0025 - (gameWidth*0.0025 * this.slowDownRateFromInfections);
					this.colonyMoundMidpoint = this.colonyMoundXCoordinate + this.colonyMoundWidth/2;
			}// end of if for transitioning	
	}

	this.update = function()
	{
		gapCircleIndicatorTimer--
		if (gapCircleIndicatorTimer <= 0) {
			gapCircleIndicatorTimer = 60;
		}

		this.scrollGroundImages();
		this.fungusSporeFeedbackAnimationManager.update();
	}

	this.fungusTallyDiv = 
	{
		x: renderer.canvas.width * 0.01,
		y: renderer.canvas.height * 0.05,

		tallyOfEatenFungusSpores: 0,
		label: string_LEAF_CONTAMINANTS_CLEANED[currentLanguage],
		labelWidth: renderer.measureText(this.label).width,
		labelHeight: 30,
		draw: function()
		{
			//console.log('currentLanguage: ' + currentLanguage);
			renderer.fillStyle = 'white';
			renderer.font = (45 * pixelSize) + 'px SmallBoldPixel';
			if (defenseResults == null) renderer.fillText(string_LEAF_CONTAMINANTS_CLEANED[currentLanguage] + this.tallyOfEatenFungusSpores, this.x,this.y);
		}
	}

	this.infectionTallyDiv = 
	{
		x: renderer.canvas.width * 0.01,
		y: renderer.canvas.height * 0.125,

		label: string_PARASITE_INFECTIONS[currentLanguage],
		labelWidth: renderer.measureText(this.label).width,
		labelHeight: 30,
		draw: function()
		{
			renderer.fillStyle = 'white';//dark violet, medium orchid
			renderer.font = (45 * pixelSize) + 'px SmallBoldPixel';
			renderer.textAlign = "left";
			if (defenseResults == null) renderer.fillText(string_PARASITE_INFECTIONS[currentLanguage] + defenseGame.background.bigAntTallyOfInfections, this.x,this.y);
		}
	}

	this.touchStartCoordinates = vec2();
	this.fillInCurrentPheremoneGap = false;
	this.touchInsidePheremoneGap = false;
	this.handleTouchStart = function()
	{
		this.touchStartCoordinates = vec2(touchPos[0].x - canvasStartX, touchPos[0].y - canvasStartY);
		
		defenseGame.fullScreenButton.handleInput(this.touchStartCoordinates);
		let arrayOfPheremoneGaps = this.pheremoneGapManager.arrayOfPheremoneGaps;
		for (let i = 0; i < arrayOfPheremoneGaps.length; i++)
		{
			if (this.touchStartCoordinates.x >= arrayOfPheremoneGaps[i].x && this.touchStartCoordinates.x < arrayOfPheremoneGaps[i].x + arrayOfPheremoneGaps[i].width &&
			this.touchStartCoordinates.y >= arrayOfPheremoneGaps[i].y && this.touchStartCoordinates.y < arrayOfPheremoneGaps[i].y + arrayOfPheremoneGaps[i].height &&
			arrayOfPheremoneGaps[i].isFilledIn === false)
			{
				this.touchInsidePheremoneGap = true;
				defenseGame.groundMinimManager.toggleEnRouteStatusAfterUserClick();	
			}
		}
	}

	this.clickInsidePheremoneGap = false;
	this.mouseDownCoordinates = vec2();
	this.handleMouseDown = function()
	{
		this.mouseDownCoordinates = vec2(touchPos[0].x - canvasStartX, touchPos[0].y - canvasStartY);
		
		//defenseGame.muteButton.handleInput(this.mouseDownCoordinates);
		defenseGame.fullScreenButton.handleInput(this.mouseDownCoordinates);
		//defenseGame.background.exitButton.handleInput(this.mouseDownCoordinates);
		let arrayOfPheremoneGaps = this.pheremoneGapManager.arrayOfPheremoneGaps;
		for (let i = 0; i < arrayOfPheremoneGaps.length; i++)
		{
			if (this.mouseDownCoordinates.x >= arrayOfPheremoneGaps[i].x && this.mouseDownCoordinates.x < arrayOfPheremoneGaps[i].x + arrayOfPheremoneGaps[i].width &&
			this.mouseDownCoordinates.y >= arrayOfPheremoneGaps[i].y && this.mouseDownCoordinates.y < arrayOfPheremoneGaps[i].y + arrayOfPheremoneGaps[i].height &&
			arrayOfPheremoneGaps[i].isFilledIn === false)
			{
				this.clickInsidePheremoneGap = true;
				defenseGame.groundMinimManager.toggleEnRouteStatusAfterUserClick();	
			}
		}
	}

	this.draw = function()
	{

		renderer.drawImage(this.forageLayerImage1, this.forageLayerImage1XCoordinate,0, renderer.canvas.width*1.01,renderer.canvas.height);
		renderer.drawImage(this.forageLayerImage2, this.forageLayerImage2XCoordinate,0, renderer.canvas.width*1.01,renderer.canvas.height);
		
				renderer.drawImage(this.forageLayerImage3, this.forageLayerImage3XCoordinate,0, renderer.canvas.width*1.01,renderer.canvas.height);

		renderer.drawImage(this.leavesLayerImage1, this.leavesLayerImage1XCoordinate,-renderer.canvas.height*0.1, renderer.canvas.width*1.01,renderer.canvas.height*1.25);
		renderer.drawImage(this.leavesLayerImage2, this.leavesLayerImage2XCoordinate,-renderer.canvas.height*0.1, renderer.canvas.width*1.01,renderer.canvas.height*1.25);
		
				renderer.drawImage(this.leavesLayerImage3, this.leavesLayerImage3XCoordinate,-renderer.canvas.height*0.1, renderer.canvas.width*1.01,renderer.canvas.height*1.25);

		renderer.drawImage(this.grassLayerImage1, this.grassLayerImage1XCoordinate,0, renderer.canvas.width*1.01,renderer.canvas.height);
		renderer.drawImage(this.grassLayerImage2, this.grassLayerImage2XCoordinate,0, renderer.canvas.width*1.01,renderer.canvas.height);
		
				renderer.drawImage(this.grassLayerImage3, this.grassLayerImage3XCoordinate,0, renderer.canvas.width*1.01,renderer.canvas.height);

		renderer.drawImage(this.groundLayerImage1, this.groundImage1xCoordinate,0, renderer.canvas.width*1.01,renderer.canvas.height);
		renderer.drawImage(this.groundLayerImage2, this.groundImage2xCoordinate,0, renderer.canvas.width*1.01,renderer.canvas.height);


				renderer.drawImage(this.groundLayerImage3, this.groundImage3xCoordinate,0, renderer.canvas.width*1.01,renderer.canvas.height);

		renderer.drawImage(this.pheremoneStrip1Image, this.pheremoneStrip1ImageXCoordinate,this.pheremoneStripY, 
						   renderer.canvas.width*1.01,this.pheremoneStripHeight);
		renderer.drawImage(this.pheremoneStrip2Image, this.pheremoneStrip2ImageXCoordinate,this.pheremoneStripY, 
						   renderer.canvas.width*1.01,this.pheremoneStripHeight);

		this.pheremoneGapManager.drawPheremoneGaps();

		renderer.drawImage(this.colonyMoundImage, this.colonyMoundXCoordinate,this.colonyMoundYCoordinate, 
				           this.colonyMoundWidth,this.colonyMoundHeight);

		// renderer.drawImage(this.fungusNestImage, this.fungusNestXCoordinate,renderer.canvas.height*0.33, 
		// 										   renderer.canvas.width*0.6,renderer.canvas.height*0.6);

		//this.exitButton.draw();

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

let pheremoneGapAlertMessage = string_CLICK_TO_REPAIR_PATH[currentLanguage];
function PheremoneGap(x)
{
	this.x = x;
	this.y = defenseGame.background.pheremoneStripY;
	this.width = defenseGame.background.pheremoneGapWidth*1.2;
	this.height = defenseGame.background.pheremoneStripHeight;

	this.isFilledIn = false;

	this.fillImage = pheremoneGapFillImage;

	this.alertMessage = 
	{
		x: this.x,
		y: this.y,
		
		width: renderer.measureText(pheremoneGapAlertMessage).width * 2.3
	}

	this.update = function()
	{
		if (!defenseGame.background.stuckOnPheremoneGap && defenseGame.timeLeft > 0 && !defenseGame.colonyReached && !defenseGame.transitioningToUninfectedAnt)
		{
			
			this.x -= (gameWidth*0.001 - (gameWidth*0.001 *defenseGame.background.slowDownRateFromInfections));
		}
		else if (defenseGame.transitioningToUninfectedAnt)
		{
			
			this.x += (gameWidth*0.0025 - (gameWidth*0.0025 *defenseGame.background.slowDownRateFromInfections));
		}
	}

	this.drawAlertMessage = function()
	{
		if (defenseGame.background.stuckOnPheremoneGap)
		{
			this.alertMessage.x = this.x;
			this.alertMessage.y = this.y;

			this.fontSize = 45;

			renderer.fillStyle = 'white';
			renderer.font = (24 * pixelSize) + 'px SmallBoldPixel';
			this.alertMessage.width = renderer.measureText(pheremoneGapAlertMessage).width;
			renderer.fillText(pheremoneGapAlertMessage, this.alertMessage.x - this.alertMessage.width,this.alertMessage.y + renderer.canvas.height*0.05);
		}
	}

	this.draw = function()
	{
		

		if (this.isFilledIn)
		{
			renderer.drawImage(this.fillImage, this.x*0.95,this.y, this.width*1.5,this.height);
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
	
	this.instantiatePheremoneGaps = function()
	{
		for (let i = 0; i < 6; i++)
		{
			let pheremoneGap = new PheremoneGap( renderer.canvas.width * 1.01 + (defenseGame.background.pheremoneGapWidth * i) + 
												(renderer.canvas.width * 1.01 * i) );

			this.arrayOfPheremoneGaps.push(pheremoneGap);
		}
	}

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

	
	this.alertMessageShouldBeVisible = true;
	this.toggleAlertMessageVisibility = function()
	{
		if (defenseGame.background.pheremoneGapManager.alertMessageShouldBeVisible)
		{
			defenseGame.background.pheremoneGapManager.alertMessageShouldBeVisible = false;
		}
		else 
		{
			defenseGame.background.pheremoneGapManager.alertMessageShouldBeVisible = true;
		}
	}

	this.drawAlertMessages = function()
	{
		for (let i = 0; i < this.arrayOfPheremoneGaps.length; i++)
		{
			if (defenseGame.background.pheremoneGapManager.alertMessageShouldBeVisible)
			{
				defenseGame.background.pheremoneGapManager.arrayOfPheremoneGaps[i].drawAlertMessage();
			}
			if (defenseGame.background.stuckOnPheremoneGap && (defenseGame.groundMinimManager.arrayOfGroundMinims[0].currentStatus != 'en route to repair' && defenseGame.groundMinimManager.arrayOfGroundMinims[0].currentStatus != 'repairing')){
				drawCustomCircle(defenseGame.background.currentPheremoneGap.x + (defenseGame.background.pheremoneGapWidth / 2), defenseGame.background.currentPheremoneGap.y + (defenseGame.background.pheremoneStripHeight / 2), (gapCircleIndicatorTimer / 60) * 30 * pixelSize, 4 * pixelSize, '#00FF00');
			}
		}
	}

	this.checkForGettingStuckOnPheremoneGaps = function()
	{
						

		for (let i = 0; i < this.arrayOfPheremoneGaps.length; i++)
		{
			let currentActiveAnt = defenseGame.bigAntManager.currentActiveAnt;
			if (!this.arrayOfPheremoneGaps[i].isFilledIn && 
				this.arrayOfPheremoneGaps[i].x - (currentActiveAnt.bigAntX + currentActiveAnt.bigAntWidth) < 5 )
			{
				defenseGame.background.stuckOnPheremoneGap = true;
				if (defenseGame.bigAntManager.currentActiveAnt.hasBeenInfected)
				{
					defenseGame.bigAntManager.currentActiveAnt.currentSpriteSheet = bigAntIdleInfectedSpriteSheet;
				}
				else
				{
					defenseGame.bigAntManager.currentActiveAnt.currentSpriteSheet = bigAntIdleSpriteSheet;
				}
				for (let i = 0; i < defenseGame.bigAntManager.arrayOfBigAnts.length; i++)
				{
					if (defenseGame.bigAntManager.arrayOfBigAnts[i] === defenseGame.bigAntManager.currentActiveAnt)
					{
						continue;
					}
					else
					{
						defenseGame.bigAntManager.arrayOfBigAnts[i].currentSpriteSheet = bigAntIdleSpriteSheet;
					}
					defenseGame.NPCBigAnt2.currentSpriteSheet = bigAntIdleSpriteSheet;
				}
				
				defenseGame.flyManager.toggleSwarm();
				defenseGame.background.flashAlertInterval.start();
				if (defenseGame.audioManager.sfxManager.stuckSwarmAlertSound.paused)
				{
					defenseGame.audioManager.sfxManager.stuckSwarmAlertSound.play();
				}
			}
		}
	}
}

function FungusSporeFeedbackAnimation(x,y)
{
	this.x = x;
	this.y = y;

	this.text = '+1';
	this.currentAlpha = 1;

	this.draw = function()
	{
		renderer.fillStyle = 'purple';
		renderer.font = (30 * pixelSize) + 'px Helvetica';
		renderer.save();
		renderer.globalAlpha = this.currentAlpha;
		renderer.fillText(this.text, this.x,this.y);
		renderer.restore();
	}
}

function FungusSporeFeedbackAnimationManager()
{
	this.arrayOfFungusSporeVisualFeedbackAnimations = [];

	this.update = function()
	{
		for (let i = 0; i < this.arrayOfFungusSporeVisualFeedbackAnimations.length; i++)
		{
			this.arrayOfFungusSporeVisualFeedbackAnimations[i].currentAlpha -= 0.025;
			if (this.arrayOfFungusSporeVisualFeedbackAnimations[i].currentAlpha <= 0)
			{
				this.arrayOfFungusSporeVisualFeedbackAnimations.splice(i, 1);
			}
			if (this.arrayOfFungusSporeVisualFeedbackAnimations[i] != undefined){
				this.arrayOfFungusSporeVisualFeedbackAnimations[i].y -= renderer.canvas.height * 0.0025;
			}
			
		}
	}

	this.draw = function()
	{
		for (let i = 0; i < this.arrayOfFungusSporeVisualFeedbackAnimations.length; i++)
		{
			this.arrayOfFungusSporeVisualFeedbackAnimations[i].draw();
		}
	}
}

function flyDefenseMuteButton()
{
	this.currentImage = undefined;

	this.initialize = function()
	{
		if (defenseGame.audioManager.isMutingEverything)
		{
			this.currentImage = mute_button;
		}
		else
		{
			this.currentImage = unmute_button;
		}
	}

	this.toggle = function()
	{
		if (defenseGame.audioManager.isMutingEverything)
		{
			this.currentImage = unmute_button;
		}
		else if (!defenseGame.audioManager.isMutingEverything)
		{
			this.currentImage = mute_button;
		}
		defenseGame.audioManager.toggleMuteForAllAudioTags();
	}

	this.draw = function()
	{
		renderer.drawImage(this.currentImage, 0,0, renderer.canvas.width,renderer.canvas.height);
		if (defenseGame.debugOn)
		{
			renderer.strokeStyle = 'black';
			renderer.strokeRect(gameWidth*0.85,gameHeight*0.15, gameWidth*0.15,gameHeight*0.15);
		}
	}

	this.hitBoxLeftX = gameWidth*0.85;
	this.hitBoxRightX = this.hitBoxLeftX + gameWidth*0.15;
	this.hitBoxTopY = gameHeight*0.15;
	this.hitBoxBottomY = this.hitBoxTopY + gameHeight*0.15;
	this.handleInput = function(inputCoordinates)
	{
		
		if (inputCoordinates.x > this.hitBoxLeftX && inputCoordinates.x < this.hitBoxRightX &&
			inputCoordinates.y > this.hitBoxTopY && inputCoordinates.y < this.hitBoxBottomY)
		{
			this.toggle();
		}
	}
}

function defenseGameFullScreenButton()
{
	this.currentImage = fullscreen_button;

	this.draw = function()
	{
		renderer.drawImage(this.currentImage, 0,0, renderer.canvas.width,renderer.canvas.height);
		if (defenseGame.debugOn)
		{
			renderer.strokeStyle = 'black';
			renderer.strokeRect(gameWidth*0.85,0, gameWidth*0.15,gameHeight*0.15);
		}
	}

	this.toggle = function()
	{
		
		if (fullScreenActive === false)
		{
			enableFullScreen(canvas);
		}
		else if (fullScreenActive === true)
		{
			
			disableFullscreen(canvas);
		}
	}

	this.hitBoxLeftX = gameWidth*0.85;
	this.hitBoxTopY = 0;
	this.hitBoxRightX = this.hitBoxLeftX + gameWidth*0.15;
	this.hitBoxBottomY = this.hitBoxTopY + gameHeight*0.15;
	this.handleInput = function(inputCoordinates)
	{
		// if (inputCoordinates.x > this.hitBoxLeftX && inputCoordinates.x < this.hitBoxRightX &&
		// 	inputCoordinates.y > this.hitBoxTopY && inputCoordinates.y < this.hitBoxBottomY)
		// {
		// 	this.toggle();
		// }
	}
}