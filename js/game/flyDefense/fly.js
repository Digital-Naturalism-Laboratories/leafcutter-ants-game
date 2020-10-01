function Fly(name,status)
{
	this.name = name;

	this.currentImageIndex = getRandomIntInclusive(0, 6);//make each fly slightly different visually
	this.currentSpriteSheet = flyFacingRightSpriteSheet;
	this.flySourceWidth = 100;
	this.flySourceHeight = 140;

	this.cycleImages = function(i)
	{
		this.currentImageIndex++;
		if (this.currentImageIndex > 6)
		{
			this.currentImageIndex = 0;
		}
		if (this.currentFacingStatus === 'facing left')
		{
			this.currentSpriteSheet = flyFacingLeftSpriteSheet;
		}
		else
		{
			this.currentSpriteSheet = flyFacingRightSpriteSheet;
		}
	}

	this.width = renderer.canvas.width/15;
	this.height = renderer.canvas.height * 0.075;

	this.resize = function()
	{
		this.width = renderer.canvas.width/15;
		this.height = renderer.canvas.height * 0.075;
	}

	this.status = status;
	this.eggHasBeenPlanted = false;

	this.x = undefined;
	this.y = undefined;

	this.currentTarget = defenseGame.parentAntObject.headTarget;

	this.assignRandomXYCoordinatesInARange = function()
	{
		let coinFlip = Math.random();
		if (coinFlip <= 0.5)
		{
			this.x = getRandomIntInclusive(-this.width*3,this.currentTarget.x - this.width*1.5);
			this.currentFacingStatus = 'facing right';
		}
		else
		{
			this.x = getRandomIntInclusive(this.currentTarget.x + this.width,renderer.canvas.width + this.width*3);
			this.currentFacingStatus = 'facing left';
		}
		this.y = getRandomIntInclusive( Math.floor( -5*(this.height) ),Math.floor ( -3*(this.height) ) );
	}
	
	this.draw = function()
	{
		//(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
		renderer.drawImage(this.currentSpriteSheet, 
			this.currentImageIndex*this.flySourceWidth,0, this.flySourceWidth,this.flySourceHeight,
			this.x,this.y, this.width,this.height);

		//collision box
		if (defenseGame.debugOn)
		{
			renderer.lineWidth = 5;
			renderer.strokeStyle = 'red';
			renderer.strokeRect(this.x,this.y, this.width,this.height);		
			
			renderer.beginPath(); 
		  // Staring point (10,45)
		   renderer.moveTo(this.x,this.y);
		  // End point (180,47)
		  renderer.lineTo(this.x,renderer.canvas.height);
		  // Make the line visible
		  renderer.stroke();	

		  renderer.fillStyle = 'brown';
		  renderer.font = (30 * pixelSize) + 'px Helvetica';
		  renderer.fillText(this.name, this.x,this.y);					
		}
	}

	
	

	this.velocityX = renderer.canvas.width * 0.0025;
	this.velocityY = renderer.canvas.width * 0.0025;
	
	this.move = function()
	{
		//outline: 1.check if there is room to move closer to the target for both x and y axis
			//		   2.check for jittering and correct if so
			//         3.check for swat collision with flies
			//		   4.check for fly/egg reaching target
		
			if (this.status === 'planting')
				{
					

					if (this.x > this.currentTarget.x)//move from right to left closer to targets x
					{
						this.x -= this.velocityX;		
					}
						
					
					else if (this.x + this.width < this.currentTarget.x)//move from left to right closer to targets x
					{
						this.x += this.velocityX;									
					}
						
					

					if (Math.abs(this.x - this.currentTarget.x) < renderer.canvas.width*0.005)
					{
						this.x = this.currentTarget.x;//stop jittering when x coordinate is very close to targets x
					}

					if (this.y < this.currentTarget.y)//descend closer to target if above it
					{
						this.y += this.velocityY;
					}

					
					//fly chased detection
					if (this.x < defenseGame.bigAntManager.currentActiveAnt.smallAntX + defenseGame.bigAntManager.currentActiveAnt.smallAntWidth*0.8 && //check for swat collisions with flies
					    this.x + this.width > defenseGame.bigAntManager.currentActiveAnt.smallAntX + defenseGame.bigAntManager.currentActiveAnt.smallAntWidth*0.1 &&
					    this.y < defenseGame.bigAntManager.currentActiveAnt.smallAntY + defenseGame.bigAntManager.currentActiveAnt.smallAntHeight*0.5 &&
					    this.y + this.height > defenseGame.bigAntManager.currentActiveAnt.smallAntY*1.25)
						{
							if (this.name === 'testFly4' && defenseGame.bigAntManager.currentActiveAnt.name === 1)
							{
								
							}
						    defenseGame.audioManager.sfxManager.playFlyChasedSound();
						    this.status = 'swatted';
						    if (defenseGame.flyManager.currentStatus !== 'swarming')
						    {
						    	defenseGame.flyManager.toggleNextFlysStatusToPlant();
						    }
						    
						}		

					if (this.x + this.width > this.currentTarget.x * 0.96 && this.x < this.currentTarget.x * 1.04 && 
						this.y > this.currentTarget.y * 0.96 && this.y < this.currentTarget.y * 1.04)//target reached
					{
						defenseGame.background.stuckOnPheremoneGap = false;
						console.log('defenseGame.background.stuckOnPheremoneGap: ' + defenseGame.background.stuckOnPheremoneGap);
						if (!isOutOfTime)
						{
							defenseGame.background.stuckOnPheremoneGap = false;
							
							if (defenseGame.bigAntManager.currentActiveAnt.name < -1)
							{
								let bigAntWidth = renderer.canvas.width*0.5;
								let firstBigAntX = renderer.canvas.width/2 - bigAntWidth/2;
								let newAnt = new NPCBigAnt( firstBigAntX - (bigAntWidth*2), '-3' );
								newAnt.initialize();
								defenseGame.bigAntManager.arrayOfBigAnts.push(newAnt);
							}

							defenseGame.bigAntManager.currentActiveAnt.hasBeenInfected = true;							
							
							if (defenseGame.background.stuckOnPheremoneGap)
							{
								defenseGame.bigAntManager.currentActiveAnt.currentSpriteSheet = bigAntIdleInfectedSpriteSheet;
							}
							
							window.parentAntSpriteSheetToggleInterval = 
							setInterval(function() {defenseGame.bigAntManager.arrayOfBigAnts[defenseGame.bigAntManager.currentIndex - 1].toggleSpriteSheet()},200);

							defenseGame.arrayOfIntervals.push(window.parentAntSpriteSheetToggleInterval);
						
							defenseGame.flyManager.updateStatusesAfterInfection();


						
							defenseGame.background.bigAntTallyOfInfections++;
							defenseGame.background.calculateSlowDownRateFromInfections();
							defenseGame.eggHasBeenPlanted = true;
							defenseGame.audioManager.sfxManager.antInfectionSound.play();
							if (!defenseGame.infectionAlertMessage.shouldBeVisible)
							{
								defenseGame.infectionAlertMessage.toggleVisibility();
								setTimeout(
									function() 
									{
										defenseGame.infectionAlertMessage.toggleVisibility();
									},2000);
							}
							
							defenseGame.transitioningToUninfectedAnt = true;
							defenseGame.background.transitionOveride = -1.1;

							defenseGame.bigAntManager.updateCurrentActiveAnt();
							defenseGame.flyManager.updateTargets();


							defenseGame.background.stuckOnPheremoneGap = false;
							if (defenseGame.background.currentPheremoneGap !== undefined)
							{
								defenseGame.background.currentPheremoneGap.isFilledIn = true;
								defenseGame.background.currentPheremoneGapArrayIndex++;
								defenseGame.background.currentPheremoneGap = defenseGame.background.pheremoneGapManager.arrayOfPheremoneGaps[defenseGame.background.currentPheremoneGapArrayIndex];
							}
							
							defenseGame.audioManager.sfxManager.stuckSwarmAlertSound.pause();
							defenseGame.audioManager.sfxManager.stuckSwarmAlertSound.currentTime = 0;
							defenseGame.audioManager.sfxManager.beefUpTrailFeedback.play();
							defenseGame.audioManager.sfxManager.fliesSwarming.pause();
							defenseGame.audioManager.sfxManager.flyBuzzingNormal.play();
							defenseGame.audioManager.sfxManager.groundMinimFootstepsAccelerated.pause();
							defenseGame.audioManager.sfxManager.groundMinimFootstepsAccelerated.currentTime = 0;
							defenseGame.audioManager.sfxManager.groundMinimFootsteps.play();
							for (let i = 0; i < defenseGame.groundMinimManager.arrayOfGroundMinims.length; i++)
							{
								defenseGame.groundMinimManager.arrayOfGroundMinims[i].coinFlipAMeanderDirection();
								defenseGame.groundMinimManager.arrayOfGroundMinims[i].velocity = getRandomIntInclusive(1,4);
							}
							 defenseGame.flyManager.currentStatus = 'normal';
							// defenseGame.flyManager.arrayOfFlies[0].status = 'swatted';
							// defenseGame.flyManager.arrayOfFlies[1].status = 'swatted';
							// defenseGame.flyManager.arrayOfFlies[2].status = 'swatted';
							// defenseGame.flyManager.arrayOfFlies[3].status = 'swatted';
							// defenseGame.flyManager.currentFlyIndex = -1;

							defenseGame.background.flashAlertInterval.stop();

							for (let i = 0; i < defenseGame.bigAntManager.arrayOfBigAnts.length; i++)
							{
								if (defenseGame.bigAntManager.arrayOfBigAnts[i].hasBeenInfected)
								{
									defenseGame.bigAntManager.arrayOfBigAnts[i].currentSpriteSheet = bigAntWalkingInfectedSpriteSheet;
								}
								else if (!defenseGame.bigAntManager.arrayOfBigAnts[i].hasBeenInfected)
								{
									defenseGame.bigAntManager.arrayOfBigAnts[i].currentSpriteSheet = bigAntWalkingSpriteSheet;
								}
							}// end of for loop to switch sprite sheets of big ants
						}//end of isOutOfTime check
					}//end of target reached				
				}//end of planting
			
				else if (this.status === 'swatted')
				{
					if (this.y + this.height > 0)
					{
						this.y -= this.velocityY*2;
						this.x -= this.velocityX*2;
						// if (this.egg !== undefined)
						// {
						// 	this.egg.y -= this.velocityY;
						// }
					}
					if (this.y + this.height < 0)
					{
						this.status = undefined;
						this.assignRandomXYCoordinatesInARange();
						
						if (defenseGame.flyManager.currentStatus === 'swarming')
						{
							this.status = 'planting';
						}

						let swattedTally = 0;
						for (let i = 0; i < defenseGame.flyManager.arrayOfFlies.length; i++)
						{
							
							if (defenseGame.flyManager.arrayOfFlies[i].status === 'swatted' || defenseGame.flyManager.arrayOfFlies[i].status == undefined)
							{
								swattedTally++;
							}

						}
						
						if (swattedTally === defenseGame.flyManager.arrayOfFlies.length)
						{
							
							defenseGame.flyManager.toggleNextFlysStatusToPlant();
						}
					}


				}
				else if (this.status === 'leaving after planting')
				{
					if (this.y > -this.height)
					{
						this.y -= this.velocityY;
					}

					if (this.y < -this.height * 0.98)
					{
						
						this.assignRandomXYCoordinatesInARange();
						this.status = 'planting';
					}
				}
				


			}
		
		
}

function FlyManager()
{
	this.arrayOfFlies = [];
	this.currentFlyIndex = 0;

	this.currentStatus = 'normal';

	this.resizeFlies = function()
	{
		for (let i = 0; i < this.arrayOfFlies.length; i++)
		{
			this.arrayOfFlies[i].resize();
		}
	}

	this.toggleNextFlysStatusToPlant = function()
	{
		

		if (this.currentFlyIndex < this.arrayOfFlies.length - 1)
		{
			this.currentFlyIndex++;
		}
		else if (this.currentFlyIndex >= this.arrayOfFlies.length - 1)
		{
			this.currentFlyIndex = 0;
		}
		
		
		this.arrayOfFlies[this.currentFlyIndex].status = 'planting';
		
		// for (let i = 0; i < this.arrayOfFlies.length; i++)
		// {
		// 	console.log('this.arrayOfFlies[i].name: ' + this.arrayOfFlies[i].name);
		// 	console.log('this.arrayOfFlies[i].status: ' + this.arrayOfFlies[i].status);
		// }
	}

	this.updateFlies = function()
	{
		for (let i = 0; i < this.arrayOfFlies.length; i++)
		{
			if (this.arrayOfFlies[i].status !== undefined)
			{
				this.arrayOfFlies[i].move();
			}
		}
	}

	this.drawFlies = function()
	{
		for (let i = 0; i < this.arrayOfFlies.length; i++)
		{
			this.arrayOfFlies[i].draw();
		}
	}

	this.toggleSwarm = function()
	{
		this.currentStatus = 'swarming';
		defenseGame.audioManager.sfxManager.flyBuzzingNormal.pause();
		defenseGame.audioManager.sfxManager.fliesSwarming.play();
		for (let i = 0; i < this.arrayOfFlies.length; i++)
		{
			// if (this.arrayOfFlies[i].egg !== undefined)
			// {
				this.arrayOfFlies[i].status = 'planting';
			// }
		}
	}

	this.initialize = function()
	{
		let _this = this;
		for (let i = 0; i < this.arrayOfFlies.length; i++)
		{
			let flyAnimation = 
			setInterval(function() {_this.arrayOfFlies[i].cycleImages()},25);

			defenseGame.arrayOfIntervals.push(flyAnimation);
		}
	}

	this.updateTargets = function()
	{
		console.log('defenseGame.bigAntManager.currentActiveAnt.name: ' + defenseGame.bigAntManager.currentActiveAnt.name);
		for (let i = 0; i < this.arrayOfFlies.length; i++)
		{
			this.arrayOfFlies[i].currentTarget = defenseGame.bigAntManager.currentActiveAnt.headTarget;
		}
	}

	this.updateStatusesAfterInfection = function()
	{
		for (let i = 0; i < this.arrayOfFlies.length; i++)
		{
			this.arrayOfFlies[i].status = 'swatted';
		}
	}
}

// function Egg(x,y)
// {
// 	this.x = x;
// 	this.y = y;
// 	this.image = eggImage;

// 	this.width = renderer.canvas.width * 0.1 * 0.1;//one tenth of the fly width
// 	this.height = renderer.canvas.height * 0.05 * 0.75;//three-fourths of the fly height

// 	this.hasBeenPlanted = false;

// 	this.draw = function()
// 	{
// 		renderer.drawImage(this.image, this.x,this.y, this.width,this.height);
// 	}
// }

// function PlantedEggManager()
// {
// 	this.arrayOfPlantedEggs = [];

// 	this.draw = function()
// 	{
// 		for (let i = 0; i < this.arrayOfPlantedEggs.length; i++)
// 		{
// 			this.arrayOfPlantedEggs[i].draw();
// 		}
// 	}
// }

