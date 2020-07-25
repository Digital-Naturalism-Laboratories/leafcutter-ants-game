function Fly(name,status)
{
	this.name = name;
	this.image = flyFacingLeftImage;

	this.width = leafcutterGame.canvas.width * 0.1;
	this.height = leafcutterGame.canvas.height * 0.05;

	this.status = status;// 'leaving', 'swatted'
	this.eggHasBeenPlanted = false;

	this.assignRandomXYCoordinatesInARange = function()
	{
		this.x = getRandomIntInclusive(-this.width*3,leafcutterGame.canvas.width + this.width*3);
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
		leafcutterGame.canvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
		leafcutterGame.canvasContext.drawImage(this.eggImage, this.eggX,this.eggY, this.eggWidth,this.eggHeight);

		//collision box
		if (leafcutterGame.inputManager.debugOn)
		{
			leafcutterGame.canvasContext.lineWidth = 5;
			leafcutterGame.canvasContext.strokeStyle = 'red';
			leafcutterGame.canvasContext.strokeRect(this.x,this.y, this.width,this.height);		
			
			leafcutterGame.canvasContext.beginPath(); 
		  // Staring point (10,45)
		   leafcutterGame.canvasContext.moveTo(this.x,this.y);
		  // End point (180,47)
		  leafcutterGame.canvasContext.lineTo(this.x,leafcutterGame.canvas.height);
		  // Make the line visible
		  leafcutterGame.canvasContext.stroke();						
		}
	}

	
	this.currentTarget = leafcutterGame.parentAntObject.headTarget;

	this.velocityX = leafcutterGame.canvas.width * 0.0025;
	this.velocityY = leafcutterGame.canvas.width * 0.0025;
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
				
			

			if (Math.abs(this.x - this.currentTarget.x) < leafcutterGame.canvas.width*0.005)
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
				if (this.x < leafcutterGame.parentAntObject.smallAntX + leafcutterGame.parentAntObject.smallAntWidth && //check for swat collisions with flies
				    this.x + this.width > leafcutterGame.parentAntObject.smallAntX  &&
				    this.y < leafcutterGame.parentAntObject.smallAntY + leafcutterGame.parentAntObject.smallAntHeight &&
				    this.y + this.height > leafcutterGame.parentAntObject.smallAntY)
					{
					    
					    this.status = 'swatted';
					    leafcutterGame.flyManager.toggleNextFlysStatusToPlant();
					}		

			if (this.x > this.currentTarget.x * 0.96 && this.x < this.currentTarget.x * 1.04 && 
				this.y > this.currentTarget.y * 0.96 && this.y < this.currentTarget.y * 1.04)//target reached
			{
				
				this.status = 'leaving after planting';
				this.currentTarget.canBeTargeted = false;
				this.eggHasBeenPlanted = true;
				leafcutterGame.eggHasBeenPlanted = true;
				if (leafcutterGame.testFly1.eggHasBeenPlanted && leafcutterGame.testFly2.eggHasBeenPlanted && leafcutterGame.testFly3.eggHasBeenPlanted)
				{
					//alert('You Lose!');
				}
				else
				{
					leafcutterGame.flyManager.toggleNextFlysStatusToPlant();
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
}

