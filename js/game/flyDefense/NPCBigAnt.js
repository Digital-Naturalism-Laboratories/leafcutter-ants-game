function NPCBigAnt(x)
{
	this.bigAntHeight = renderer.canvas.height*0.25;
	this.bigAntWidth = renderer.canvas.width*0.4;
	this.bigAntX = x;
	this.bigAntY = renderer.canvas.height*0.6;
	
	this.x = this.bigAntX;
	this.y = renderer.canvas.height*0.6;

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

		defenseGame.parentAntObject.currentBigAntImage = defenseGame.parentAntObject.arrayOfBigAntImages[bigAntImageIndex];
	}

	// this.bigAntWalkingInterval = new frameInterval(this.cycleBigAntImages, 100);

	
	this.drawBigAnt = function()
	{
		renderer.drawImage(this.currentBigAntImage, this.bigAntX,this.bigAntY, this.bigAntWidth,this.bigAntHeight);
	}

	
	this.leafWidth = this.bigAntWidth*0.5;
	this.leafHeight = this.bigAntHeight*2.5;
	this.leafX = this.bigAntX + this.bigAntWidth - this.leafWidth*0.75;
	this.leafY = this.bigAntY + this.bigAntHeight/2 - this.leafHeight;
	
	this.drawLeaf = function()
	{
		renderer.drawImage(this.leafImage, this.leafX,this.leafY, this.leafWidth,this.leafHeight);
		if (defenseGame.debugOn === true)
		{
			renderer.strokeStyle = 'red';
			renderer.lineWidth = 5;
			renderer.strokeRect(this.leafX,this.leafY, this.leafWidth,this.leafHeight);
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

	
	
	this.swatImageIndex = 0;
	this.swatArrayDirection = -1;
	this.changeSwatImage = function()
	{
		if (defenseGame.parentAntObject.swatImageIndex === 0 || 
			defenseGame.parentAntObject.swatImageIndex === defenseGame.parentAntObject.arrayOfSwatImages.length - 1)
		{
			defenseGame.parentAntObject.swatArrayDirection *= -1;
		}
		defenseGame.parentAntObject.swatImageIndex += 1*defenseGame.parentAntObject.swatArrayDirection;
		defenseGame.parentAntObject.currentSwatImage = defenseGame.parentAntObject.arrayOfSwatImages[defenseGame.parentAntObject.swatImageIndex];
	}

	
	this.drawSmallAnt = function()
	{
		// if (!defenseGame.inputManager.swatIsBeingHeld)
		// {
		// 			defenseGame.canvasContext.drawImage(this.currentSmallAntImage, this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
		// }
		// else
		// {
		// 			defenseGame.parentAntObject.swatInterval.start();
		// 			defenseGame.canvasContext.drawImage(this.currentSwatImage, this.smallAntX,this.smallAntY, this.smallAntHeight,this.smallAntWidth);
		// 			if (defenseGame.debugOn)
		// 			{
		// 				defenseGame.canvasContext.lineWidth = 5;
		// 				defenseGame.canvasContext.strokeStyle = 'red';
		// 				defenseGame.canvasContext.strokeRect(this.smallAntSwattingColliderBoxX,this.smallAntSwattingColliderBoxY, 
		// 														this.smallAntSwattingColliderBoxWidth,this.smallAntSwattingColliderBoxHeight);
		// 			}
		// }
	}



	this.antVelocity = renderer.canvas.width*0.0075;
	
	this.moveSmallAnt = function()
	{
		// if (defenseGame.inputManager.moveLeftIsBeingHeld)
		// {
		// 	this.smallAntX -= this.antVelocity;
		// 	this.smallAntSwattingColliderBoxX -= this.antVelocity;
		// 	if (this.smallAntX < this.leafX)
		// 	{
		// 		this.smallAntX = this.leafX;
		// 		this.smallAntSwattingColliderBoxX = this.leafX;
		// 	}
		// }
		// else if (defenseGame.inputManager.moveUpIsBeingHeld)
		// {
		// 	this.smallAntY -= this.antVelocity;
		// 	if (this.smallAntY < this.leafY)
		// 	{
		// 		this.smallAntY = this.leafY;
		// 	}
		// }
		// else if (defenseGame.inputManager.moveRightIsBeingHeld)
		// {
		// 	this.smallAntX += this.antVelocity;
		// 	this.smallAntSwattingColliderBoxX += this.antVelocity;
		// 	if (this.smallAntX + this.smallAntWidth > this.leafX + this.leafWidth * 0.9)
		// 	{
		// 		this.smallAntX = this.leafX + (this.leafWidth * 0.9) - this.smallAntWidth;
		// 		this.smallAntSwattingColliderBoxX = this.leafX + (this.leafWidth * 0.9) - this.smallAntWidth;
		// 	}
		// }
		// else if (defenseGame.inputManager.moveDownIsBeingHeld)
		// {
		// 	this.smallAntY += this.antVelocity;
		// 	if (this.smallAntY + this.smallAntHeight > this.leafY + this.leafHeight)
		// 	{
		// 		this.smallAntY = this.leafY + this.leafHeight - this.smallAntHeight;
		// 	}
		// }
		// else if (defenseGame.inputManager.swatIsBeingHeld)
		// {
		// 	//this.currentSmallAntImage = bigAntHindLegsFacingRightImage;
		// 	this.smallAntY = this.standingAntY;
			
		// 	this.smallAntSwattingColliderBoxX = this.smallAntX;
		// 	this.smallAntSwattingColliderBoxY = this.standingAntY;

		// 	if (this.smallAntY < this.standingAntY)
		// 	{
		// 		this.smallAntY = this.standingAntY;
		// 	}
		// }
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

	// this.headTarget = new Target('head target', defenseGame.canvas.width * 0.435,defenseGame.canvas.height * 0.575);
	// this.thoraxTarget = new Target('thorax target', defenseGame.canvas.width * 0.35,defenseGame.canvas.height * 0.6);
	// this.abdomenTarget = new Target('abdomen target', defenseGame.canvas.width * 0.285,defenseGame.canvas.height * 0.6);
}