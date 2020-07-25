function NPCBigAnt(x)
{
	this.bigAntHeight = leafcutterGame.canvas.height*0.25;
	this.bigAntWidth = leafcutterGame.canvas.width*0.4;
	this.bigAntX = x;
	this.bigAntY = leafcutterGame.canvas.height*0.6;
	
	this.x = this.bigAntX;
	this.y = leafcutterGame.canvas.height*0.6;

	this.leafImage = leafImage;
	this.currentBigAntImage = bigAntNeutralImage;
	this.arrayOfBigAntImages = [bigAntFrontRightForwardImage,bigAntNeutralImage,bigAntFrontLeftForwardImage];


	this.draw = function()
	{
		this.drawBigAnt();
		this.drawLeaf();
		this.drawSmallAnt();
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
	this.leafHeight = this.bigAntHeight*2.5;
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

	this.smallAntWidth = this.leafWidth*0.2;
	this.smallAntHeight = this.leafHeight*0.2;
	this.currentSmallAntImage = smallAntImage;
	this.arrayOfSmallAntWalkingRightImages = [bigAntFrontRightForwardImage,bigAntNeutralImage,bigAntFrontLeftForwardImage];
	this.arrayOfSmallAntWalkingLeftImages = [bigAntFrontRightForwardFlippedImage,bigAntNeutralFlippedImage,bigAntFrontLeftForwardFlippedImage];
	this.smallAntX = this.x + this.leafX/2;
	this.smallAntY = this.leafY;

	this.standingAntY = (this.smallAntY + this.smallAntHeight) - this.smallAntWidth;

	this.smallAntSwattingColliderBoxX = this.smallAntX;
	this.smallAntSwattingColliderBoxY = this.standingAntY;
	this.smallAntSwattingColliderBoxWidth = this.smallAntHeight;
	this.smallAntSwattingColliderBoxHeight = this.smallAntWidth*0.2;

	this.currentSwatImage = bigAntSwatting1Image;
	this.arrayOfSwatImages = [bigAntSwatting1Image,bigAntSwatting2Image,bigAntSwatting3Image,bigAntSwatting4Image];
	this.swatImageIndex = 0;
	this.swatArrayDirection = -1;
	this.changeSwatImage = function()
	{
		if (leafcutterGame.parentAntObject.swatImageIndex === 0 || 
			leafcutterGame.parentAntObject.swatImageIndex === leafcutterGame.parentAntObject.arrayOfSwatImages.length - 1)
		{
			leafcutterGame.parentAntObject.swatArrayDirection *= -1;
		}
		leafcutterGame.parentAntObject.swatImageIndex += 1*leafcutterGame.parentAntObject.swatArrayDirection;
		leafcutterGame.parentAntObject.currentSwatImage = leafcutterGame.parentAntObject.arrayOfSwatImages[leafcutterGame.parentAntObject.swatImageIndex];
	}

	
	this.drawSmallAnt = function()
	{
		if (!leafcutterGame.inputManager.swatIsBeingHeld)
		{
					leafcutterGame.canvasContext.drawImage(this.currentSmallAntImage, this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
		}
		else
		{
					leafcutterGame.parentAntObject.swatInterval.start();
					leafcutterGame.canvasContext.drawImage(this.currentSwatImage, this.smallAntX,this.smallAntY, this.smallAntHeight,this.smallAntWidth);
					if (leafcutterGame.inputManager.debugOn)
					{
						leafcutterGame.canvasContext.lineWidth = 5;
						leafcutterGame.canvasContext.strokeStyle = 'red';
						leafcutterGame.canvasContext.strokeRect(this.smallAntSwattingColliderBoxX,this.smallAntSwattingColliderBoxY, 
																this.smallAntSwattingColliderBoxWidth,this.smallAntSwattingColliderBoxHeight);
					}
		}
	}



	this.antVelocity = leafcutterGame.canvas.width*0.0075;
	
	this.moveSmallAnt = function()
	{
		if (leafcutterGame.inputManager.moveLeftIsBeingHeld)
		{
			this.smallAntX -= this.antVelocity;
			this.smallAntSwattingColliderBoxX -= this.antVelocity;
			if (this.smallAntX < this.leafX)
			{
				this.smallAntX = this.leafX;
				this.smallAntSwattingColliderBoxX = this.leafX;
			}
		}
		else if (leafcutterGame.inputManager.moveUpIsBeingHeld)
		{
			this.smallAntY -= this.antVelocity;
			if (this.smallAntY < this.leafY)
			{
				this.smallAntY = this.leafY;
			}
		}
		else if (leafcutterGame.inputManager.moveRightIsBeingHeld)
		{
			this.smallAntX += this.antVelocity;
			this.smallAntSwattingColliderBoxX += this.antVelocity;
			if (this.smallAntX + this.smallAntWidth > this.leafX + this.leafWidth * 0.9)
			{
				this.smallAntX = this.leafX + (this.leafWidth * 0.9) - this.smallAntWidth;
				this.smallAntSwattingColliderBoxX = this.leafX + (this.leafWidth * 0.9) - this.smallAntWidth;
			}
		}
		else if (leafcutterGame.inputManager.moveDownIsBeingHeld)
		{
			this.smallAntY += this.antVelocity;
			if (this.smallAntY + this.smallAntHeight > this.leafY + this.leafHeight)
			{
				this.smallAntY = this.leafY + this.leafHeight - this.smallAntHeight;
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
		// else 
		// {
		// 	this.smallAntY = this.leafY;
		// }
	}

	this.update = function()
	{
		// this.moveSmallAnt();
	}

	this.initialize = function()
	{
		// this.bigAntWalkingInterval.start();
	}

	this.headTarget = new Target('head target', leafcutterGame.canvas.width * 0.435,leafcutterGame.canvas.height * 0.575);
	this.thoraxTarget = new Target('thorax target', leafcutterGame.canvas.width * 0.35,leafcutterGame.canvas.height * 0.6);
	this.abdomenTarget = new Target('abdomen target', leafcutterGame.canvas.width * 0.285,leafcutterGame.canvas.height * 0.6);
}