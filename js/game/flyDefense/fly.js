function Fly(name,status)
{
	this.name = name;
	this.image = flyFacingLeftImage;

	this.width = renderer.canvas.width * 0.1;
	this.height = renderer.canvas.height * 0.05;

	this.status = status;// 'leaving', 'swatted'
	this.eggHasBeenPlanted = false;

	this.assignRandomXYCoordinatesInARange = function()
	{
		this.x = getRandomIntInclusive(-this.width*3,renderer.canvas.width + this.width*3);
		this.y = getRandomIntInclusive( Math.floor( -5*(this.height) ),Math.floor ( -3*(this.height) ) );

		if (!this.eggHasBeenPlanted)
		{
			this.eggX = this.x - this.width*0.025;
			this.eggY = this.y + this.height - this.height*0.35;
		}
	}
	

	this.eggImage = eggImage;
	
	this.eggWidth = this.width * 0.1;
	this.eggHeight = this.height*0.75;

	

	this.draw = function()
	{
		renderer.drawImage(this.image, this.x,this.y, this.width,this.height);
		renderer.drawImage(this.eggImage, this.eggX,this.eggY, this.eggWidth,this.eggHeight);

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
				if (!this.eggHasBeenPlanted)
				{
					this.eggX -= this.velocityX;
				}			
			}
				
			
			else if (this.x < this.currentTarget.x)//move from left to right closer to targets x
			{
				this.x += this.velocityX;
				if (!this.eggHasBeenPlanted)
				{
					this.eggX += this.velocityX;
				}
							
			}
				
			

			if (Math.abs(this.x - this.currentTarget.x) < renderer.canvas.width*0.005)
			{
				this.x = this.currentTarget.x;//stop jittering when x coordinate is very close to targets x
				if (!this.eggHasBeenPlanted)
				{
					this.eggX = this.currentTarget.x;
				}
				
			}

			if (this.y < this.currentTarget.y)//descend closer to target if above it
			{
				this.y += this.velocityY;
				if (!this.eggHasBeenPlanted)
				{
					this.eggY += this.velocityY;
				}
			}

				//collision box detection
				if (this.x < defenseGame.parentAntObject.smallAntX + defenseGame.parentAntObject.smallAntWidth && //check for swat collisions with flies
				    this.x + this.width > defenseGame.parentAntObject.smallAntX  &&
				    this.y < defenseGame.parentAntObject.smallAntY + defenseGame.parentAntObject.smallAntHeight &&
				    this.y + this.height > defenseGame.parentAntObject.smallAntY)
					{
					    
					    this.status = 'swatted';
					    defenseGame.flyManager.toggleNextFlysStatusToPlant();
					}		

			if (this.x > this.currentTarget.x * 0.96 && this.x < this.currentTarget.x * 1.04 && 
				this.y > this.currentTarget.y * 0.96 && this.y < this.currentTarget.y * 1.04)//target reached
			{
				
				this.status = 'leaving after planting';
				this.currentTarget.canBeTargeted = false;
				this.eggHasBeenPlanted = true;
				defenseGame.eggHasBeenPlanted = true;
				alert('Ant infected by a parasite. You lose!')
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
				if (!this.eggHasBeenPlanted)
				{
					this.eggY -= this.velocityY;
				}
			}
			if (this.y + this.height < 0)
			{
				this.status = undefined;
				this.assignRandomXYCoordinatesInARange();
				this.eggX = this.x;
				this.eggY = this.y;
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
				
				// this.assignRandomXYCoordinatesInARange();
			}
		}
		


	}
}

function FlyManager()
{
	this.arrayOfFlies = [];
	this.currentFlyIndex = 0;

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
}

