function NPCBigAnt(x)
{
	this.bigAntHeight = renderer.canvas.height*0.33;
	this.bigAntWidth = renderer.canvas.width*0.5;
	this.bigAntX = x;
	this.bigAntY = renderer.canvas.height - this.bigAntHeight*1.2;
	this.bigAntWalkingSourceWidth = 553;
	this.bigAntWalkingSourceHeight = 320;
	
	this.x = this.bigAntX;
	this.y = renderer.canvas.height*0.6;

	this.leafImage = leafImage;

	this.currentBigAntWalkingImageIndex = getRandomIntInclusive(0,10);
	this.currentSpriteSheet = bigAntWalkingSpriteSheet;
	
	this.cycleBigAntImages = function()
	{
		this.currentBigAntWalkingImageIndex++;
		if (!defenseGame.background.stuckOnPheremoneGap && !defenseGame.goalReached)
		{
			if (this.currentBigAntWalkingImageIndex > 10)
			{
				this.currentBigAntWalkingImageIndex = 0;
			}
		}
		else
		{
			if (this.currentBigAntWalkingImageIndex > 20)
			{
				this.currentBigAntWalkingImageIndex = 0;
			}
		}
	}

	this.draw = function()
	{
		this.drawBigAnt();
		this.drawLeaf();
		this.drawSmallAnt();
	}
	
	this.drawBigAnt = function()
	{
		renderer.drawImage(this.currentSpriteSheet, 
		this.bigAntWalkingSourceWidth*this.currentBigAntWalkingImageIndex,0, this.bigAntWalkingSourceWidth,this.bigAntWalkingSourceHeight,
		this.bigAntX,this.bigAntY, this.bigAntWidth,this.bigAntHeight);
	}

	
	this.leafWidth = this.bigAntWidth*0.7;
	this.leafHeight = this.bigAntHeight*2;
	this.leafX = this.bigAntX + this.bigAntWidth*0.55;
	this.leafY = this.bigAntY + this.bigAntHeight/2 - this.leafHeight*1.05;
	
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
		var _this = this;
		window.NPCBigAntAnimationInterval = 
		setInterval(function () {_this.cycleBigAntImages()},100);
		
		defenseGame.arrayOfIntervals.push(window.NPCBigAntAnimationInterval);
		// this.bigAntWalkingInterval.start();
	}

	// this.headTarget = new Target('head target', defenseGame.canvas.width * 0.435,defenseGame.canvas.height * 0.575);
	// this.thoraxTarget = new Target('thorax target', defenseGame.canvas.width * 0.35,defenseGame.canvas.height * 0.6);
	// this.abdomenTarget = new Target('abdomen target', defenseGame.canvas.width * 0.285,defenseGame.canvas.height * 0.6);
}