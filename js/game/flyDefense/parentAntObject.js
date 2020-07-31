function ParentAntObject()
{
	this.bigAntHeight = defenseGame.canvas.height*0.4;
	this.bigAntWidth = defenseGame.canvas.width*0.7;
	this.bigAntX = defenseGame.canvas.width/2 - this.bigAntWidth*0.7;
	this.bigAntY = defenseGame.canvas.height*0.55;
	
	this.x = defenseGame.canvas.width/2 - this.bigAntWidth/2;
	this.y = defenseGame.canvas.height*0.6;

	this.leafImage = leafImage;
	this.fungusImage = fungusImage;
	this.currentBigAntImage = bigAntNeutralImage;
	this.arrayOfBigAntImages = [bigAntFrontRightForwardImage,bigAntNeutralImage,bigAntFrontLeftForwardImage];


	this.draw = function()
	{
		this.drawBigAnt();
		this.drawLeaf();
		this.drawFungusSpores();
		this.drawSmallAnt();

		if (defenseGame.inputManager.debugOn)
		{
			defenseGame.canvasContext.strokeStyle = 'red';
			defenseGame.canvasContext.lineWidth = 5;
			defenseGame.canvasContext.strokeRect(this.mouthColliderBoxX,this.mouthColliderBoxY, this.mouthColliderBoxWidth,this.mouthColliderBoxHeight);
		}
	}

	let bigAntImageIndex = 1;
	let bigAntImageDirection = 1;
	this.cycleBigAntImages = function()
	{
		if (bigAntImageIndex === 0 || bigAntImageIndex === 2)
		{
			bigAntImageDirection *= -1;
		}

		bigAntImageIndex += 1*bigAntImageDirection;

		defenseGame.parentAntObject.currentBigAntImage = defenseGame.parentAntObject.arrayOfBigAntImages[bigAntImageIndex];
	}

	// this.bigAntWalkingInterval = new frameInterval(this.cycleBigAntImages, 100);

	
	this.drawBigAnt = function()
	{
		defenseGame.canvasContext.drawImage(this.currentBigAntImage, this.bigAntX,this.bigAntY, this.bigAntWidth,this.bigAntHeight);
	}

	
	this.leafWidth = this.bigAntWidth*0.5;
	this.leafHeight = this.bigAntHeight*1.75;
	this.leafX = this.bigAntX + this.bigAntWidth - this.leafWidth*0.75;
	this.leafY = this.bigAntY + this.bigAntHeight/2 - this.leafHeight;
	
	this.drawLeaf = function()
	{
		defenseGame.canvasContext.drawImage(this.leafImage, this.leafX,this.leafY, this.leafWidth,this.leafHeight);
		if (defenseGame.inputManager.debugOn === true)
		{
			defenseGame.canvasContext.strokeStyle = 'red';
			defenseGame.canvasContext.lineWidth = 5;
			defenseGame.canvasContext.strokeRect(this.leafX,this.leafY, this.leafWidth,this.leafHeight);
		}
	}

	this.fungusTangleX = defenseGame.canvas.width*0.525;
	this.fungusTangleY = defenseGame.canvas.height*0.2;
	this.fungusTangleWidth = defenseGame.canvas.width*0.7 - this.fungusTangleX;
	this.fungusTangleHeight = defenseGame.canvas.height*0.63 - this.fungusTangleY;

	this.arrayOfFungusSpores = [];
	this.initializeArrayOfFungusSpores = function()
	{
		for (let i = 0; i < 200; i++)
		{
			let randomXWithinFungusTangle = getRandomIntInclusive(Math.floor(this.fungusTangleX),Math.floor(this.fungusTangleX + this.fungusTangleWidth));
			let randomYWithinFungusTangle = getRandomIntInclusive(Math.floor(this.fungusTangleY),Math.floor(this.fungusTangleY + this.fungusTangleHeight));
			let fungusSpore = new FungusSpore(randomXWithinFungusTangle,randomYWithinFungusTangle);
			this.arrayOfFungusSpores.push(fungusSpore);
		}
		if (defenseGame.inputManager.debugOn)
		{
			defenseGame.canvasContext.strokeStyle = 'red';
			defenseGame.canvasContext.lineWidth = 5;
			defenseGame.strokeRect(this.fungusTangleX,this.fungusTangleY, this.fungusTangleWidth,this.fungusTangleHeight);
		}
	}
	this.drawFungusSpores = function()
	{
		for (let i = 0; i < this.arrayOfFungusSpores.length; i++)
		{
			this.arrayOfFungusSpores[i].draw();
		}
	}




	this.smallAntWidth = this.leafWidth*0.15;
	this.smallAntHeight = this.leafHeight*0.15;
	this.currentSmallAntImage = smallAntImage;
	// this.arrayOfSmallAntWalkingRightImages = [bigAntFrontRightForwardImage,bigAntNeutralImage,bigAntFrontLeftForwardImage];
	// this.arrayOfSmallAntWalkingLeftImages = [bigAntFrontRightForwardFlippedImage,bigAntNeutralFlippedImage,bigAntFrontLeftForwardFlippedImage];
	this.smallAntX = this.leafX + this.leafWidth/2 - this.smallAntWidth/2;
	this.smallAntY = this.leafY + this.leafHeight/2 - this.smallAntHeight/2;

	// this.standingAntY = (this.smallAntY + this.smallAntHeight) - this.smallAntWidth;

	// this.smallAntSwattingColliderBoxX = this.smallAntX;
	// this.smallAntSwattingColliderBoxY = this.standingAntY;
	// this.smallAntSwattingColliderBoxWidth = this.smallAntHeight;
	// this.smallAntSwattingColliderBoxHeight = this.smallAntWidth*0.2;

	// this.currentSwatImage = bigAntSwatting1Image;
	// this.arrayOfSwatImages = [bigAntSwatting1Image,bigAntSwatting2Image,bigAntSwatting3Image,bigAntSwatting4Image];
	// this.swatImageIndex = 0;
	// this.swatArrayDirection = -1;
	// this.changeSwatImage = function()
	// {
	// 	if (defenseGame.parentAntObject.swatImageIndex === 0 || 
	// 		defenseGame.parentAntObject.swatImageIndex === defenseGame.parentAntObject.arrayOfSwatImages.length - 1)
	// 	{
	// 		defenseGame.parentAntObject.swatArrayDirection *= -1;
	// 	}
	// 	defenseGame.parentAntObject.swatImageIndex += 1*defenseGame.parentAntObject.swatArrayDirection;
	// 	defenseGame.parentAntObject.currentSwatImage = defenseGame.parentAntObject.arrayOfSwatImages[defenseGame.parentAntObject.swatImageIndex];
	// }

	
	this.drawSmallAnt = function()
	{
		// if (!defenseGame.inputManager.swatIsBeingHeld)
		// {
		// 			defenseGame.canvasContext.drawImage(this.currentSmallAntImage, this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
		// }
		// else
		// {
					// defenseGame.parentAntObject.swatInterval.start();
					defenseGame.canvasContext.drawImage(this.currentSmallAntImage, this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
					if (defenseGame.inputManager.debugOn)
					{
						defenseGame.canvasContext.lineWidth = 5;
						defenseGame.canvasContext.strokeStyle = 'red';
						defenseGame.canvasContext.strokeRect(this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
					}
		//}
	}



	this.antVelocity = defenseGame.canvas.width*0.0075;
	
	this.moveSmallAnt = function()
	{
		//keyboard input
		if (defenseGame.inputManager.moveLeftIsBeingHeld)
		{
			this.smallAntX -= this.antVelocity;
			this.smallAntSwattingColliderBoxX -= this.antVelocity;
			this.mouthColliderBoxX -= this.antVelocity;
			if (this.smallAntX < this.leafX)
			{
				this.smallAntX = this.leafX;
				this.smallAntSwattingColliderBoxX = this.leafX;
				this.mouthColliderBoxX = this.smallAntX + this.smallAntWidth/2;
	
			}
		}
		else if (defenseGame.inputManager.moveUpIsBeingHeld)
		{
			this.smallAntY -= this.antVelocity;
			this.mouthColliderBoxY -= this.antVelocity;
			if (this.smallAntY < this.leafY)
			{
				this.smallAntY = this.leafY;
				this.mouthColliderBoxY = this.smallAntY*1.025;
			}
		}
		else if (defenseGame.inputManager.moveRightIsBeingHeld)
		{
			this.smallAntX += this.antVelocity;
			this.smallAntSwattingColliderBoxX += this.antVelocity;
			this.mouthColliderBoxX += this.antVelocity;
			if (this.smallAntX + this.smallAntWidth > this.leafX + this.leafWidth * 0.9)
			{
				this.smallAntX = this.leafX + (this.leafWidth * 0.9) - this.smallAntWidth;
				this.smallAntSwattingColliderBoxX = this.leafX + (this.leafWidth * 0.9) - this.smallAntWidth;
				this.mouthColliderBoxX = this.smallAntX + this.smallAntWidth/2;
			}
		}
		else if (defenseGame.inputManager.moveDownIsBeingHeld)
		{
			this.smallAntY += this.antVelocity;
			this.mouthColliderBoxY += this.antVelocity;
			if (this.smallAntY + this.smallAntHeight > this.leafY + this.leafHeight)
			{
				this.smallAntY = this.leafY + this.leafHeight - this.smallAntHeight;
				this.mouthColliderBoxY = this.smallAntY*1.025;
			}
		}
		else if (defenseGame.inputManager.swatIsBeingHeld)
		{
			//this.currentSmallAntImage = bigAntHindLegsFacingRightImage;
			this.smallAntY = this.standingAntY;
			
			this.smallAntSwattingColliderBoxX = this.smallAntX;
			this.smallAntSwattingColliderBoxY = this.standingAntY;

			if (this.smallAntY < this.standingAntY)
			{
				this.smallAntY = this.standingAntY;
			}
		}
		
		//touch input
		if (this.currentMovementTargetFromTouchInput.x !== undefined)//left or right movement
		{
			if (this.smallAntX + this.smallAntWidth/2 < this.currentMovementTargetFromTouchInput.x)//ant should move to the right
			{
				this.smallAntX += this.antVelocity;
				this.smallAntSwattingColliderBoxX += this.antVelocity;
				this.mouthColliderBoxX += this.antVelocity;
				if (Math.abs(this.smallAntX  + this.smallAntWidth/2 - this.currentMovementTargetFromTouchInput.x) < defenseGame.canvas.width*0.005)
				{//prevent jitter
					this.currentMovementTargetFromTouchInput.x = undefined;
				}

				if (this.smallAntX + this.smallAntWidth > this.leafX + this.leafWidth * 0.9)//prevent from going off leaf
					{
						this.smallAntX = this.leafX + (this.leafWidth * 0.9) - this.smallAntWidth;
						this.smallAntSwattingColliderBoxX = this.leafX + (this.leafWidth * 0.9) - this.smallAntWidth;
						this.mouthColliderBoxX = this.smallAntX + this.smallAntWidth/2;
						this.currentMovementTargetFromTouchInput.x = undefined;
					}
			}
			else if (this.smallAntX + this.smallAntWidth/2 > this.currentMovementTargetFromTouchInput.x) //ant should move to the left
			{
				this.smallAntX -= this.antVelocity;
				this.smallAntSwattingColliderBoxX -= this.antVelocity;
				this.mouthColliderBoxX -= this.antVelocity;

				if (Math.abs(this.smallAntX  + this.smallAntWidth/2 - this.currentMovementTargetFromTouchInput.x) < defenseGame.canvas.width*0.005)
				{
					this.currentMovementTargetFromTouchInput.x = undefined;
				}

				if (this.smallAntX < this.leafX)//prevent from going off leaf
				{
					this.smallAntX = this.leafX;
					this.smallAntSwattingColliderBoxX = this.leafX;
					this.mouthColliderBoxX = this.smallAntX + this.smallAntWidth/2;
					this.currentMovementTargetFromTouchInput.x = undefined;
					this.currentMovementTargetFromTouchInput.y = undefined;
				}
			}
		}

		if (this.currentMovementTargetFromTouchInput.y !== undefined)// up or down movement
		{
			if (this.smallAntY < this.currentMovementTargetFromTouchInput.y)//ant should move down
			{
				this.smallAntY += this.antVelocity;
				this.mouthColliderBoxY += this.antVelocity;

				if (Math.abs(this.smallAntY - this.currentMovementTargetFromTouchInput.y) < defenseGame.canvas.width*0.005)
				{
					this.currentMovementTargetFromTouchInput.y = undefined;
				}

				if (this.smallAntY + this.smallAntHeight > this.leafY + this.leafHeight)//prevent from going off leaf
				{
					this.smallAntY = this.leafY + this.leafHeight - this.smallAntHeight;
					this.mouthColliderBoxY = this.smallAntY*1.025;
					this.currentMovementTargetFromTouchInput.x = undefined;
					this.currentMovementTargetFromTouchInput.y = undefined;
				}
			}
			else if (this.smallAntY > this.currentMovementTargetFromTouchInput.y)//ant should move up
			{
				this.smallAntY -= this.antVelocity;
				this.mouthColliderBoxY -= this.antVelocity;

				if (Math.abs(this.smallAntY - this.currentMovementTargetFromTouchInput.y) < defenseGame.canvas.width*0.005)
				{
					this.currentMovementTargetFromTouchInput.y = undefined;
				}

				if (this.smallAntY < this.leafY)//prevent from going off leaf
				{
					this.smallAntY = this.leafY;
					this.mouthColliderBoxY = this.smallAntY*1.025;
					this.currentMovementTargetFromTouchInput.x = undefined;
					this.currentMovementTargetFromTouchInput.y = undefined;
				}
			}
		}		
	}
	
		
	

	this.mouthColliderBoxX = this.smallAntX + this.smallAntWidth*0.45;
	this.mouthColliderBoxY = this.smallAntY*1.025;
	this.mouthColliderBoxWidth = this.smallAntWidth*0.4;
	this.mouthColliderBoxHeight = this.smallAntHeight*0.2;

	this.detectFungusSporeCollisions = function()
	{
		if (defenseGame.inputManager.moveLeftIsBeingHeld || defenseGame.inputManager.moveRightIsBeingHeld || 
			defenseGame.inputManager.moveDownIsBeingHeld || defenseGame.inputManager.moveUpIsBeingHeld ||
			this.currentMovementTargetFromTouchInput.x !== undefined || this.currentMovementTargetFromTouchInput.y !== undefined)
		{
			for (let i = 0; i < this.arrayOfFungusSpores.length; i++)
			{
				if (this.arrayOfFungusSpores[i].x < this.mouthColliderBoxX + this.mouthColliderBoxWidth && //check for spores overlapping small ants mouth
				    this.arrayOfFungusSpores[i].x + this.arrayOfFungusSpores[i].width > this.mouthColliderBoxX  &&
				    this.arrayOfFungusSpores[i].y < this.mouthColliderBoxY + this.mouthColliderBoxHeight &&
				    this.arrayOfFungusSpores[i].y + this.arrayOfFungusSpores[i].height > this.mouthColliderBoxY)
				{
					this.arrayOfFungusSpores.splice(i,1);
				}
			}
		}
	}

	this.currentMovementTargetFromTouchInput = {x:undefined,y:undefined};
	this.handleTouchstart = function()
	{
		this.currentMovementTargetFromTouchInput = defenseGame.inputManager.touchCoordinates;
	}

	this.update = function()
	{
		this.moveSmallAnt();
		this.detectFungusSporeCollisions();
	}

	this.initialize = function()
	{
		// this.bigAntWalkingInterval.start();
		this.initializeArrayOfFungusSpores();
	}

	this.headTarget = new Target('head target', defenseGame.canvas.width * 0.615,defenseGame.canvas.height * 0.665);
	
}

function Target(name, x,y)
{
	this.name = name;
	this.x = x;
	this.y = y;
	this.canBeTargeted = true;
}

function FungusSpore(x,y)
{
	this.image = fungusImage;
	this.x = x;
	this.y = y;
	this.width = defenseGame.canvas.width * 0.005;
	this.height = defenseGame.canvas.width * 0.005;

	this.draw = function()
	{
		defenseGame.canvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
	}
}