function Fly(name,status)
{
	this.name = name;
	this.image = flyFacingLeftImage;

	this.width = renderer.canvas.width * 0.1;
	this.height = renderer.canvas.height * 0.05;

	this.status = status;
	this.eggHasBeenPlanted = false;

	this.x = undefined;
	this.y = undefined;
	this.egg = undefined;

	this.assignRandomXYCoordinatesInARange = function()
	{
		this.x = getRandomIntInclusive(-this.width*3,renderer.canvas.width + this.width*3);
		this.y = getRandomIntInclusive( Math.floor( -5*(this.height) ),Math.floor ( -3*(this.height) ) );

		if (this.egg !== undefined)
		{
			this.egg.x = this.x - this.width*0.025;
			this.egg.y = this.y + this.height - this.height*0.35;
		}
		else
		{
			let egg = new Egg(this.x - this.width*0.025,this.y + this.height - this.height*0.35);
			this.egg = egg;
		}
	}
	
	this.draw = function()
	{
		renderer.drawImage(this.image, this.x,this.y, this.width,this.height);
		if (this.egg !== undefined)
		{
			this.egg.draw();
		}

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
		}
	}

	
	this.currentTarget = defenseGame.parentAntObject.headTarget;

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
				if (this.egg !== undefined)
				{
					
					this.egg.x -= this.velocityX;
					
				}			
			}
				
			
			else if (this.x < this.currentTarget.x)//move from left to right closer to targets x
			{
				this.x += this.velocityX;
				if (this.egg !== undefined)
				{
					this.egg.x += this.velocityX;
				}
							
			}
				
			

			if (Math.abs(this.x - this.currentTarget.x) < renderer.canvas.width*0.005)
			{
				this.x = this.currentTarget.x;//stop jittering when x coordinate is very close to targets x
				if (this.egg !== undefined)
				{
					this.egg.x = this.currentTarget.x;
				}
				
			}

			if (this.y < this.currentTarget.y)//descend closer to target if above it
			{
				this.y += this.velocityY;
				if (this.egg !== undefined)
				{
					this.egg.y += this.velocityY;
				}
			}

			//collision box detection
			if (this.x < defenseGame.parentAntObject.smallAntX + defenseGame.parentAntObject.smallAntWidth && //check for swat collisions with flies
			    this.x + this.width > defenseGame.parentAntObject.smallAntX  &&
			    this.y < defenseGame.parentAntObject.smallAntY + defenseGame.parentAntObject.smallAntHeight &&
			    this.y + this.height > defenseGame.parentAntObject.smallAntY)
				{
				    defenseGame.audioManager.sfxManager.playFlyChasedSound();
				    this.status = 'swatted';
				    if (defenseGame.flyManager.currentStatus !== 'swarming')
				    {
				    	defenseGame.flyManager.toggleNextFlysStatusToPlant();
				    }
				    
				}		

			if (this.x > this.currentTarget.x * 0.96 && this.x < this.currentTarget.x * 1.04 && 
				this.y > this.currentTarget.y * 0.96 && this.y < this.currentTarget.y * 1.04)//target reached
			{
				
				this.status = 'leaving after planting';
				this.currentTarget.canBeTargeted = false;
				let egg = new Egg(this.x - this.width*0.025,this.y + this.height - this.height*0.35);
				defenseGame.plantedEggManager.arrayOfPlantedEggs.push(egg);
				this.egg = undefined;
				defenseGame.background.bigAntTallyOfInfections++;
				defenseGame.eggHasBeenPlanted = true;
				//alert('Ant infected by a parasite. You lose!')
				if (defenseGame.testFly1.eggHasBeenPlanted && defenseGame.testFly2.eggHasBeenPlanted && defenseGame.testFly3.eggHasBeenPlanted)
				{
					//alert('You Lose!');
				}
				else
				{
					defenseGame.flyManager.toggleNextFlysStatusToPlant();
				}
			}
			
		}
		else if (this.status === 'swatted')
		{
			if (this.y + this.height > 0)
			{
				this.y -= this.velocityY;
				if (this.egg !== undefined)
				{
					this.egg.y -= this.velocityY;
				}
			}
			if (this.y + this.height < 0)
			{
				this.status = undefined;
				this.assignRandomXYCoordinatesInARange();
				
				if (defenseGame.flyManager.currentStatus === 'swarming')
				{
					this.status = 'planting';
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

	this.toggleNextFlysStatusToPlant = function()
	{
		if (this.currentFlyIndex < this.arrayOfFlies.length - 1)
		{
			this.currentFlyIndex++;
		}
		else
		{
			this.currentFlyIndex = 0;
		}
		
		if (this.arrayOfFlies[this.currentFlyIndex].eggHasBeenPlanted)
		{
			this.toggleNextFlysStatusToPlant();
		}
		else
		{
			this.arrayOfFlies[this.currentFlyIndex].status = 'planting';
			// this.arrayOfFlies[this.currentFlyIndex].assignRandomXYCoordinatesInARange();
		}
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
			this.arrayOfFlies[i].status = 'planting';
		}
	}
}

function Egg(x,y)
{
	this.x = x;
	this.y = y;
	this.image = eggImage;

	this.width = renderer.canvas.width * 0.1 * 0.1;//one tenth of the fly width
	this.height = renderer.canvas.height * 0.05 * 0.75;//three-fourths of the fly height

	this.hasBeenPlanted = false;

	this.draw = function()
	{
		renderer.drawImage(this.image, this.x,this.y, this.width,this.height);
	}
}

function PlantedEggManager()
{
	this.arrayOfPlantedEggs = [];

	this.draw = function()
	{
		for (let i = 0; i < this.arrayOfPlantedEggs.length; i++)
		{
			this.arrayOfPlantedEggs[i].draw();
		}
	}
}

