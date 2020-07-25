function ParentAntObject()
{
	this.bigAntHeight = leafcutterGame.canvas.height*0.4;
	this.bigAntWidth = leafcutterGame.canvas.width*0.7;
	this.bigAntX = leafcutterGame.canvas.width/2 - this.bigAntWidth*0.7;
	this.bigAntY = leafcutterGame.canvas.height*0.55;
	
	this.x = leafcutterGame.canvas.width/2 - this.bigAntWidth/2;
	this.y = leafcutterGame.canvas.height*0.6;

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

		if (leafcutterGame.inputManager.debugOn)
		{
			leafcutterGame.canvasContext.strokeStyle = 'red';
			leafcutterGame.canvasContext.lineWidth = 5;
			leafcutterGame.canvasContext.strokeRect(this.mouthColliderBoxX,this.mouthColliderBoxY, this.mouthColliderBoxWidth,this.mouthColliderBoxHeight);
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

		leafcutterGame.parentAntObject.currentBigAntImage = leafcutterGame.parentAntObject.arrayOfBigAntImages[bigAntImageIndex];
	}

	// this.bigAntWalkingInterval = new frameInterval(this.cycleBigAntImages, 100);

	
	this.drawBigAnt = function()
	{
		leafcutterGame.canvasContext.drawImage(this.currentBigAntImage, this.bigAntX,this.bigAntY, this.bigAntWidth,this.bigAntHeight);
	}

	
	this.leafWidth = this.bigAntWidth*0.5;
	this.leafHeight = this.bigAntHeight*1.75;
	this.leafX = this.bigAntX + this.bigAntWidth - this.leafWidth*0.75;
	this.leafY = this.bigAntY + this.bigAntHeight/2 - this.leafHeight;
	
	this.drawLeaf = function()
	{
		leafcutterGame.canvasContext.drawImage(this.leafImage, this.leafX,this.leafY, this.leafWidth,this.leafHeight);
		if (leafcutterGame.inputManager.debugOn === true)
		{
			leafcutterGame.canvasContext.strokeStyle = 'red';
			leafcutterGame.canvasContext.lineWidth = 5;
			leafcutterGame.canvasContext.strokeRect(this.leafX,this.leafY, this.leafWidth,this.leafHeight);
		}
	}

	this.fungusTangleX = leafcutterGame.canvas.width*0.525;
	this.fungusTangleY = leafcutterGame.canvas.height*0.2;
	this.fungusTangleWidth = leafcutterGame.canvas.width*0.7 - this.fungusTangleX;
	this.fungusTangleHeight = leafcutterGame.canvas.height*0.63 - this.fungusTangleY;

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
		if (leafcutterGame.inputManager.debugOn)
		{
			leafcutterGame.canvasContext.strokeStyle = 'red';
			leafcutterGame.canvasContext.lineWidth = 5;
			leafcutterGame.strokeRect(this.fungusTangleX,this.fungusTangleY, this.fungusTangleWidth,this.fungusTangleHeight);
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
	// 	if (leafcutterGame.parentAntObject.swatImageIndex === 0 || 
	// 		leafcutterGame.parentAntObject.swatImageIndex === leafcutterGame.parentAntObject.arrayOfSwatImages.length - 1)
	// 	{
	// 		leafcutterGame.parentAntObject.swatArrayDirection *= -1;
	// 	}
	// 	leafcutterGame.parentAntObject.swatImageIndex += 1*leafcutterGame.parentAntObject.swatArrayDirection;
	// 	leafcutterGame.parentAntObject.currentSwatImage = leafcutterGame.parentAntObject.arrayOfSwatImages[leafcutterGame.parentAntObject.swatImageIndex];
	// }

	
	this.drawSmallAnt = function()
	{
		// if (!leafcutterGame.inputManager.swatIsBeingHeld)
		// {
		// 			leafcutterGame.canvasContext.drawImage(this.currentSmallAntImage, this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
		// }
		// else
		// {
					// leafcutterGame.parentAntObject.swatInterval.start();
					leafcutterGame.canvasContext.drawImage(this.currentSmallAntImage, this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
					if (leafcutterGame.inputManager.debugOn)
					{
						leafcutterGame.canvasContext.lineWidth = 5;
						leafcutterGame.canvasContext.strokeStyle = 'red';
						leafcutterGame.canvasContext.strokeRect(this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
					}
		//}
	}



	this.antVelocity = leafcutterGame.canvas.width*0.0075;
	
	this.moveSmallAnt = function()
	{
		//keyboard input
		if (leafcutterGame.inputManager.moveLeftIsBeingHeld)
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
		else if (leafcutterGame.inputManager.moveUpIsBeingHeld)
		{
			this.smallAntY -= this.antVelocity;
			this.mouthColliderBoxY -= this.antVelocity;
			if (this.smallAntY < this.leafY)
			{
				this.smallAntY = this.leafY;
				this.mouthColliderBoxY = this.smallAntY*1.025;
			}
		}
		else if (leafcutterGame.inputManager.moveRightIsBeingHeld)
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
		else if (leafcutterGame.inputManager.moveDownIsBeingHeld)
		{
			this.smallAntY += this.antVelocity;
			this.mouthColliderBoxY += this.antVelocity;
			if (this.smallAntY + this.smallAntHeight > this.leafY + this.leafHeight)
			{
				this.smallAntY = this.leafY + this.leafHeight - this.smallAntHeight;
				this.mouthColliderBoxY = this.smallAntY*1.025;
			}
		}
		else if (leafcutterGame.inputManager.swatIsBeingHeld)
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
				if (Math.abs(this.smallAntX  + this.smallAntWidth/2 - this.currentMovementTargetFromTouchInput.x) < leafcutterGame.canvas.width*0.005)
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

				if (Math.abs(this.smallAntX  + this.smallAntWidth/2 - this.currentMovementTargetFromTouchInput.x) < leafcutterGame.canvas.width*0.005)
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

				if (Math.abs(this.smallAntY - this.currentMovementTargetFromTouchInput.y) < leafcutterGame.canvas.width*0.005)
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

				if (Math.abs(this.smallAntY - this.currentMovementTargetFromTouchInput.y) < leafcutterGame.canvas.width*0.005)
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
		if (leafcutterGame.inputManager.moveLeftIsBeingHeld || leafcutterGame.inputManager.moveRightIsBeingHeld || 
			leafcutterGame.inputManager.moveDownIsBeingHeld || leafcutterGame.inputManager.moveUpIsBeingHeld ||
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
		this.currentMovementTargetFromTouchInput = leafcutterGame.inputManager.touchCoordinates;
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

	this.headTarget = new Target('head target', leafcutterGame.canvas.width * 0.615,leafcutterGame.canvas.height * 0.665);
	
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
	this.width = leafcutterGame.canvas.width * 0.005;
	this.height = leafcutterGame.canvas.width * 0.005;

	this.draw = function()
	{
		leafcutterGame.canvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
	}
}