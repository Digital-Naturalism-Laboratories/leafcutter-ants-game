function ParentAntObject()
{
	this.bigAntHeight = renderer.canvas.height*0.4;
	this.bigAntWidth = renderer.canvas.width*0.7;
	this.bigAntX = renderer.canvas.width/2 - this.bigAntWidth*0.7;
	this.bigAntY = renderer.canvas.height*0.55;
	
	this.x = renderer.canvas.width/2 - this.bigAntWidth/2;
	this.y = renderer.canvas.height*0.6;

	this.leafImage = leafImage;
	this.fungusImage = fungusImage;
	this.currentBigAntImage = bigAntNeutralImage;
	this.arrayOfBigAntImages = [bigAntFrontRightForwardImage,bigAntNeutralImage,bigAntFrontLeftForwardImage];

	this.leafPolygonWalkingBorderPoints = 
		[

			{name:'1',x:renderer.canvas.width*0.565,y:renderer.canvas.height*0.05},
			{name:'2',x:renderer.canvas.width*0.68,y:renderer.canvas.height*0.18},
			{name:'3',x:renderer.canvas.width*0.77,y:renderer.canvas.height*0.22},
			{name:'4',x:renderer.canvas.width*0.785,y:renderer.canvas.height*0.33},
			{name:'5',x:renderer.canvas.width*0.8,y:renderer.canvas.height*0.36},
			{name:'6',x:renderer.canvas.width*0.75,y:renderer.canvas.height*0.53},
			{name:'7',x:renderer.canvas.width*0.725,y:renderer.canvas.height*0.69},
			{name:'8',x:renderer.canvas.width*0.64,y:renderer.canvas.height*0.76},
			{name:'9',x:renderer.canvas.width*0.66,y:renderer.canvas.height*0.685},
			{name:'10',x:renderer.canvas.width*0.615,y:renderer.canvas.height*0.73},
			{name:'11',x:renderer.canvas.width*0.575,y:renderer.canvas.height*0.75},
			{name:'12',x:renderer.canvas.width*0.555,y:renderer.canvas.height*0.73},
			{name:'13',x:renderer.canvas.width*0.48,y:renderer.canvas.height*0.65},
			{name:'14',x:renderer.canvas.width*0.45,y:renderer.canvas.height*0.45},
			{name:'15',x:renderer.canvas.width*0.445,y:renderer.canvas.height*0.355},
			{name:'16',x:renderer.canvas.width*0.46,y:renderer.canvas.height*0.345},
			{name:'17',x:renderer.canvas.width*0.465,y:renderer.canvas.height*0.335},
			{name:'18',x:renderer.canvas.width*0.515,y:renderer.canvas.height*0.225},
			{name:'19',x:renderer.canvas.width*0.565,y:renderer.canvas.height*0.05}

		];

	this.leafPolygonFungusBorderPoints = 
	[

		{name:'1',x:renderer.canvas.width*0.565,y:renderer.canvas.height*0.06},
		{name:'2',x:renderer.canvas.width*0.68,y:renderer.canvas.height*0.2},
		{name:'3',x:renderer.canvas.width*0.77,y:renderer.canvas.height*0.24},
		{name:'4',x:renderer.canvas.width*0.775,y:renderer.canvas.height*0.33},
		{name:'5',x:renderer.canvas.width*0.79,y:renderer.canvas.height*0.36},
		{name:'6',x:renderer.canvas.width*0.74,y:renderer.canvas.height*0.53},
		{name:'7',x:renderer.canvas.width*0.715,y:renderer.canvas.height*0.675},
		{name:'8',x:renderer.canvas.width*0.66,y:renderer.canvas.height*0.72},
		{name:'9',x:renderer.canvas.width*0.66,y:renderer.canvas.height*0.66},
		{name:'10',x:renderer.canvas.width*0.615,y:renderer.canvas.height*0.7},
		{name:'11',x:renderer.canvas.width*0.575,y:renderer.canvas.height*0.69},
		{name:'12',x:renderer.canvas.width*0.56,y:renderer.canvas.height*0.68},
		{name:'13',x:renderer.canvas.width*0.505,y:renderer.canvas.height*0.62},
		{name:'14',x:renderer.canvas.width*0.46,y:renderer.canvas.height*0.45},
		{name:'15',x:renderer.canvas.width*0.455,y:renderer.canvas.height*0.355},
		{name:'16',x:renderer.canvas.width*0.47,y:renderer.canvas.height*0.355},
		{name:'17',x:renderer.canvas.width*0.475,y:renderer.canvas.height*0.335},
		{name:'18',x:renderer.canvas.width*0.525,y:renderer.canvas.height*0.225},
		{name:'19',x:renderer.canvas.width*0.565,y:renderer.canvas.height*0.06}

	];

	this.leafPolygonFungusBorderLineSegments = [];
	this.leafPolygonWalkingBorderLineSegments = [];

	this.initializeLineSegments = function()
	{
		for (let i = 0; i < this.leafPolygonFungusBorderPoints.length - 1; i++)
		{
			let lineSegment = {name:this.leafPolygonFungusBorderPoints[i].name, 
							   x1:this.leafPolygonFungusBorderPoints[i].x,y1:this.leafPolygonFungusBorderPoints[i].y, 
							   x2:this.leafPolygonFungusBorderPoints[i + 1].x,y2:this.leafPolygonFungusBorderPoints[i + 1].y};

			this.leafPolygonFungusBorderLineSegments.push(lineSegment);

		}

		for (let i = 0; i < this.leafPolygonWalkingBorderPoints.length - 1; i++)
		{
			let lineSegment = {name:this.leafPolygonWalkingBorderPoints[i].name, 
							   x1:this.leafPolygonWalkingBorderPoints[i].x,y1:this.leafPolygonWalkingBorderPoints[i].y, 
							   x2:this.leafPolygonWalkingBorderPoints[i + 1].x,y2:this.leafPolygonWalkingBorderPoints[i + 1].y};
			this.leafPolygonWalkingBorderLineSegments.push(lineSegment);
		}

	}

	this.tallyRaycastIntersectionsWithLeafPolygon = function(pointToRaycast, arrayOfLines)
	{
		let numberOfIntersections = 0;
		// console.log('potentialFungusPoint.x,y: ' + potentialFungusPoint.x,potentialFungusPoint.y);
		// console.log('this.leafPolygonLineSegments.length: ' + this.leafPolygonLineSegments.length);
		for (let i = 0; i < arrayOfLines.length; i++)
		{
			// console.log('inside for loop of intersection tally function');

			//raycast line from potential fungus point
			let x1 = pointToRaycast.x;
			let x2 = 1;
			let y1 = pointToRaycast.y;
			let y2 = pointToRaycast.y;

			//polygon line segment
			let x3 = arrayOfLines[i].x1;
			let x4 = arrayOfLines[i].x2;
			let y3 = arrayOfLines[i].y1;
			let y4 = arrayOfLines[i].y2;

			let denominator = (x1 - x2)*(y3 - y4) - (y1 - y2)*(x3 - x4);
			if (denominator === 0)
			{
				continue;
			}

			let numeratorForT = (x1 - x3)*(y3 - y4) - (y1 - y3)*(x3 - x4);
			let numeratorForU = (x1 - x2)*(y1 - y3) - (y1 - y2)*(x1 - x3);
			let t = numeratorForT/denominator;
			let u = -(numeratorForU/denominator);

			if (t > 0 && t < 1 && u > 0 && u < 1)
			{
				numberOfIntersections++;
			}
			
		}
		return numberOfIntersections;
	}

	this.draw = function()
	{
		this.drawBigAnt();
		this.drawLeaf();
		this.drawFungusSpores();
		this.drawSmallAnt();

		if (defenseGame.debugOn)
		{
			renderer.strokeStyle = 'red';
			renderer.lineWidth = 5;
			renderer.strokeRect(this.mouthColliderBoxX,this.mouthColliderBoxY, this.mouthColliderBoxWidth,this.mouthColliderBoxHeight);
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
		renderer.drawImage(this.currentBigAntImage, this.bigAntX,this.bigAntY, this.bigAntWidth,this.bigAntHeight);
	}

	
	this.leafWidth = this.bigAntWidth*0.5;
	this.leafHeight = this.bigAntHeight*1.75;
	this.leafX = this.bigAntX + this.bigAntWidth - this.leafWidth*0.75;
	this.leafY = this.bigAntY + this.bigAntHeight/2 - this.leafHeight;
	
	this.drawLeaf = function()
	{
		renderer.drawImage(this.leafImage, this.leafX,this.leafY, this.leafWidth,this.leafHeight);
		if (defenseGame.debugOn === true)
		{
			renderer.strokeStyle = 'red';
			renderer.lineWidth = 5;
			renderer.strokeRect(this.fungusTangleX,this.fungusTangleY, this.fungusTangleWidth,this.fungusTangleHeight);

			renderer.moveTo(this.leafPolygonFungusBorderPoints[0].x,this.leafPolygonFungusBorderPoints[0].y);
			for (let i = 1; i < this.leafPolygonFungusBorderPoints.length; i++)
			{
				
				
				renderer.fillStyle = 'black';
				renderer.fillRect(this.leafPolygonFungusBorderPoints[i].x,this.leafPolygonFungusBorderPoints[i].y, 5,5);
				renderer.font = '20px Helvetica';
				renderer.fillText(this.leafPolygonFungusBorderPoints[i].name, this.leafPolygonFungusBorderPoints[i].x,this.leafPolygonFungusBorderPoints[i].y);

				renderer.lineTo(this.leafPolygonFungusBorderPoints[i].x,this.leafPolygonFungusBorderPoints[i].y);
			}
			renderer.strokeStyle = 'red';
			renderer.stroke();

			renderer.moveTo(this.leafPolygonWalkingBorderPoints[0].x,this.leafPolygonWalkingBorderPoints[0].y);
			for (let i = 1; i < this.leafPolygonWalkingBorderPoints.length; i++)
			{
				
				renderer.fillStyle = 'green';
				renderer.fillRect(this.leafPolygonWalkingBorderPoints[i].x,this.leafPolygonWalkingBorderPoints[i].y, 5,5);
				renderer.font = '20px Helvetica';
				renderer.fillText(this.leafPolygonWalkingBorderPoints[i].name, this.leafPolygonWalkingBorderPoints[i].x,this.leafPolygonWalkingBorderPoints[i].y);

				renderer.lineTo(this.leafPolygonWalkingBorderPoints[i].x,this.leafPolygonWalkingBorderPoints[i].y);
			}
			renderer.strokeStyle = 'green';
			renderer.stroke();
		}
	}

	this.fungusTangleX = this.leafX - this.leafWidth*0.05;
	this.fungusTangleY = this.leafY - this.leafHeight*0.05;
	this.fungusTangleWidth = this.leafWidth + this.leafWidth*0.1;
	this.fungusTangleHeight = this.leafHeight + this.leafHeight*0.1;

	this.arrayOfFungusSpores = [];
	this.randomPotentialFungusPoint = undefined;
	this.initializeArrayOfFungusSpores = function()
	{
		// for (let i = 0; i < 200; i++)
		// {
		// 	let randomXWithinFungusTangle = getRandomIntInclusive(Math.floor(this.fungusTangleX),Math.floor(this.fungusTangleX + this.fungusTangleWidth));
		// 	let randomYWithinFungusTangle = getRandomIntInclusive(Math.floor(this.fungusTangleY),Math.floor(this.fungusTangleY + this.fungusTangleHeight));
		// 	let fungusSpore = new FungusSpore(randomXWithinFungusTangle,randomYWithinFungusTangle);
		// 	this.arrayOfFungusSpores.push(fungusSpore);
		// }
		// if (leafcutterGame.inputManager.debugOn)
		// {
		// 	leafcutterGame.canvasContext.strokeStyle = 'red';
		// 	leafcutterGame.canvasContext.lineWidth = 5;
		// 	leafcutterGame.strokeRect(this.fungusTangleX,this.fungusTangleY, this.fungusTangleWidth,this.fungusTangleHeight);
		// }

		
		for (let i = 0; i < 75; i++)
		{
			let potentialFungusPoint = {x:Math.floor(getRandomIntInclusive(this.leafX,this.leafX + this.leafWidth)),
											  y:Math.floor(getRandomIntInclusive(this.leafY,this.leafY + this.leafHeight))};

			//console.log('this.tallyRaycastIntersectionsWithLeafPolygon(potentialFungusPoint): ' + this.tallyRaycastIntersectionsWithLeafPolygon(potentialFungusPoint));
			while(this.tallyRaycastIntersectionsWithLeafPolygon(potentialFungusPoint, this.leafPolygonFungusBorderLineSegments) === 0 || 
				this.tallyRaycastIntersectionsWithLeafPolygon(potentialFungusPoint, this.leafPolygonFungusBorderLineSegments) % 2 === 0)
			{
				potentialFungusPoint = {x:Math.floor(getRandomIntInclusive(this.leafX,this.leafX + this.leafWidth)),
											  y:Math.floor(getRandomIntInclusive(this.leafY,this.leafY + this.leafHeight))};
			}
			// for (let i = 0; i < this.leafPolygonFungusBorderLineSegments.length; i++)
			// {

			// 	console.log(this.leafPolygonFungusBorderLineSegments[i].x);
			// 	console.log(this.leafPolygonFungusBorderLineSegments[i].y);
			// }
			
			// let tally = this.tallyRaycastIntersectionsWithLeafPolygon(potentialFungusPoint, this.leafPolygonFungusBorderLineSegments);
			// console.log('tally: ' + tally);
			let fungusSpore = new FungusSpore(potentialFungusPoint.x,potentialFungusPoint.y);
			this.arrayOfFungusSpores.push(fungusSpore);
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
	this.smallAntMidPoint = {x:this.smallAntX + this.smallAntWidth/2,y:this.smallAntY + this.smallAntHeight/2};
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
		if (this.currentSmallAntDirection === 'up')
		{
			renderer.drawImage(this.currentSmallAntImage, this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
		}
		else if (this.currentSmallAntDirection === 'upRight')
		{
			renderer.save();
			renderer.translate(this.smallAntMidPoint.x,this.smallAntMidPoint.y);
			renderer.rotate(45 * Math.PI / 180);
			renderer.translate(-this.smallAntMidPoint.x,-this.smallAntMidPoint.y);
			renderer.drawImage(this.currentSmallAntImage, this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
			renderer.restore();
		}
		else if (this.currentSmallAntDirection === 'right')
		{
			renderer.save();
			renderer.translate(this.smallAntMidPoint.x,this.smallAntMidPoint.y);
			renderer.rotate(90 * Math.PI / 180);
			renderer.translate(-this.smallAntMidPoint.x,-this.smallAntMidPoint.y);
			renderer.drawImage(this.currentSmallAntImage, this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
			renderer.restore();
		}
		else if (this.currentSmallAntDirection === 'downRight')
		{
			renderer.save();
			renderer.translate(this.smallAntMidPoint.x,this.smallAntMidPoint.y);
			renderer.rotate(135 * Math.PI / 180);
			renderer.translate(-this.smallAntMidPoint.x,-this.smallAntMidPoint.y);
			renderer.drawImage(this.currentSmallAntImage, this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
			renderer.restore();
		}
		else if (this.currentSmallAntDirection === 'down')
		{
			renderer.save();
			renderer.translate(this.smallAntMidPoint.x,this.smallAntMidPoint.y);
			renderer.rotate(180 * Math.PI / 180);
			renderer.translate(-this.smallAntMidPoint.x,-this.smallAntMidPoint.y);
			renderer.drawImage(this.currentSmallAntImage, this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
			renderer.restore();
		}
		else if (this.currentSmallAntDirection === 'downLeft')
		{
			renderer.save();
			renderer.translate(this.smallAntMidPoint.x,this.smallAntMidPoint.y);
			renderer.rotate(225 * Math.PI / 180);
			renderer.translate(-this.smallAntMidPoint.x,-this.smallAntMidPoint.y);
			renderer.drawImage(this.currentSmallAntImage, this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
			renderer.restore();
		}
		else if (this.currentSmallAntDirection === 'left')
		{
			renderer.save();
			renderer.translate(this.smallAntMidPoint.x,this.smallAntMidPoint.y);
			renderer.rotate(270 * Math.PI / 180);
			renderer.translate(-this.smallAntMidPoint.x,-this.smallAntMidPoint.y);
			renderer.drawImage(this.currentSmallAntImage, this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
			renderer.restore();
		}
		else if (this.currentSmallAntDirection === 'upLeft')
		{
			renderer.save();
			renderer.translate(this.smallAntMidPoint.x,this.smallAntMidPoint.y);
			renderer.rotate(315 * Math.PI / 180);
			renderer.translate(-this.smallAntMidPoint.x,-this.smallAntMidPoint.y);
			renderer.drawImage(this.currentSmallAntImage, this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
			renderer.restore();
		}

		if (defenseGame.debugOn)
		{
			renderer.lineWidth = 5;
			renderer.strokeStyle = 'red';
			renderer.strokeRect(this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);

			renderer.strokeRect(this.smallAntMidPoint.x - 5,this.smallAntMidPoint.y - 5, 5,5);
		}
		
	}



	this.antVelocity = renderer.canvas.width*0.0075;

	this.smallAntPreviousX = this.smallAntX;
	this.smallAntPreviousY = this.smallAntY;
	
	this.smallAntPreviousMouthColliderX = this.mouthColliderBoxX;
	this.smallAntPreviousMouthColliderY = this.mouthColliderBoxY;
	
	this.currentSmallAntDirection = 'up';
	this.previousSmallAntDirection = 'up';
	this.smallAntMovingUp = false;
	this.smallAntMovingRight = false;
	this.smallAntMovingDown = false;
	this.smallAntMovingLeft = false;
	this.moveSmallAnt = function()
	{

		this.smallAntPreviousX = this.smallAntX;
		this.smallAntPreviousY = this.smallAntY;
		
		this.smallAntPreviousMouthColliderX = this.mouthColliderBoxX;
		this.smallAntPreviousMouthColliderY = this.mouthColliderBoxY;
		
		
		
		//touch and mouse input
		if (this.currentMovementTargetFromInput.x > this.fungusTangleX && 
			this.currentMovementTargetFromInput.x < this.fungusTangleX + this.fungusTangleWidth &&
			this.currentMovementTargetFromInput.y > this.fungusTangleY &&
			this.currentMovementTargetFromInput.y < this.fungusTangleY + this.fungusTangleHeight)//if inside the fungustangle
		{
			
			this.previousSmallAntDirection = this.currentSmallAntDirection;

			if (this.smallAntMidPoint.x < this.currentMovementTargetFromInput.x)//ant should move to the right
			{
				
					if (this.shouldBeMovingLeftOrRight)
					{
						//console.log('this.shouldBeMovingLeftOrRight: ' + this.shouldBeMovingLeftOrRight);
						this.smallAntX += this.antVelocity;
						this.smallAntSwattingColliderBoxX += this.antVelocity;
						this.mouthColliderBoxX += this.antVelocity;
						this.smallAntMidPoint.x = this.smallAntX + this.smallAntWidth/2;
						this.smallAntMidPoint.y = this.smallAntY + this.smallAntHeight/2;	
						if (Math.abs(this.smallAntMidPoint.x - this.currentMovementTargetFromInput.x) <= renderer.canvas.width*0.0075)
						{//prevent jitter
							this.shouldBeMovingLeftOrRight = false;
							this.smallAntMovingRight = false;
							console.log('moving right should stop');
						}

						if (this.tallyRaycastIntersectionsWithLeafPolygon(this.smallAntMidPoint, this.leafPolygonWalkingBorderLineSegments) === 0 || 
							this.tallyRaycastIntersectionsWithLeafPolygon(this.smallAntMidPoint, this.leafPolygonWalkingBorderLineSegments) % 2 === 0)
						{
							this.smallAntX = this.smallAntPreviousX;
							this.smallAntY = this.smallAntPreviousY;
							this.mouthColliderBoxX = this.smallAntPreviousMouthColliderX;
							this.mouthColliderBoxY = this.smallAntPreviousMouthColliderY;	
							this.smallAntMidPoint.x = this.smallAntPreviousX + this.smallAntWidth/2;
							this.smallAntMidPoint.y = this.smallAntPreviousY + this.smallAntHeight/2;		
							this.shouldBeMovingLeftOrRight = false;
							this.shouldBeMovingUpOrDown = false;
						}//end of midpoint of small ant outside of leaf boundaries
					}
					
			}//end of moving to the right
			
			if (this.smallAntMidPoint.x > this.currentMovementTargetFromInput.x) //ant should move to the left
			{
				if (this.shouldBeMovingLeftOrRight)
				{
					//console.log('this.shouldBeMovingLeftOrRight: ' + this.shouldBeMovingLeftOrRight);
					this.smallAntX -= this.antVelocity;
					this.smallAntSwattingColliderBoxX -= this.antVelocity;
					this.mouthColliderBoxX -= this.antVelocity;
					this.smallAntMidPoint.x = this.smallAntX + this.smallAntWidth/2;
					this.smallAntMidPoint.y = this.smallAntY + this.smallAntHeight/2;	
					
					if (Math.abs(this.smallAntMidPoint.x - this.currentMovementTargetFromInput.x) <= renderer.canvas.width*0.0075)
					{
						this.shouldBeMovingLeftOrRight = false;
						this.smallAntMovingLeft = false;
						console.log('moving left should stop');
					}

					if (this.tallyRaycastIntersectionsWithLeafPolygon(this.smallAntMidPoint, this.leafPolygonWalkingBorderLineSegments) === 0 || 
						this.tallyRaycastIntersectionsWithLeafPolygon(this.smallAntMidPoint, this.leafPolygonWalkingBorderLineSegments) % 2 === 0)
					{
						this.smallAntX = this.smallAntPreviousX;
						this.smallAntY = this.smallAntPreviousY;
						this.mouthColliderBoxX = this.smallAntPreviousMouthColliderX;
						this.mouthColliderBoxY = this.smallAntPreviousMouthColliderY;	
						this.smallAntMidPoint.x = this.smallAntPreviousX + this.smallAntWidth/2;
						this.smallAntMidPoint.y = this.smallAntPreviousY + this.smallAntHeight/2;		
						this.currentMovementTargetFromInput.x = undefined;
						this.currentMovementTargetFromInput.y = undefined;
						this.shouldBeMovingLeftOrRight = false;
						this.shouldBeMovingUpOrDown = false;
					}//end of checking if midpoint is outside the bounds of the leaf
				}//end of moving to the left
			}
				
		
				if (this.smallAntMidPoint.y < this.currentMovementTargetFromInput.y)//ant should move down
				{
					if (this.shouldBeMovingUpOrDown)
					{
						//console.log('this.shouldBeMovingUpOrDown: ' + this.shouldBeMovingUpOrDown);
						this.smallAntY += this.antVelocity;
						this.mouthColliderBoxY += this.antVelocity;
						this.smallAntMidPoint.x = this.smallAntX + this.smallAntWidth/2;
						this.smallAntMidPoint.y = this.smallAntY + this.smallAntHeight/2;

						if (Math.abs(this.smallAntMidPoint.y - this.currentMovementTargetFromInput.y) <= renderer.canvas.width*0.0075)
						{
							this.shouldBeMovingUpOrDown = false;
							this.smallAntMovingDown = false;
							console.log('moving down should stop');
						}

						if (this.tallyRaycastIntersectionsWithLeafPolygon(this.smallAntMidPoint, this.leafPolygonWalkingBorderLineSegments) === 0 || 
							this.tallyRaycastIntersectionsWithLeafPolygon(this.smallAntMidPoint, this.leafPolygonWalkingBorderLineSegments) % 2 === 0)
						{
							this.smallAntX = this.smallAntPreviousX;
							this.smallAntY = this.smallAntPreviousY;
							this.mouthColliderBoxX = this.smallAntPreviousMouthColliderX;
							this.mouthColliderBoxY = this.smallAntPreviousMouthColliderY;
							this.smallAntMidPoint.x = this.smallAntPreviousX + this.smallAntWidth/2;
							this.smallAntMidPoint.y = this.smallAntPreviousY + this.smallAntHeight/2;		
							this.currentMovementTargetFromInput.x = undefined;
							this.currentMovementTargetFromInput.y = undefined;
							this.shouldBeMovingUpOrDown = false;
							this.shouldBeMovingLeftOrRight = false;
						}
					}
					
				}
				if (this.smallAntMidPoint.y > this.currentMovementTargetFromInput.y)//ant should move up
				{
					if (this.shouldBeMovingUpOrDown)
					{
						//console.log('this.shouldBeMovingUpOrDown: ' + this.shouldBeMovingUpOrDown);
						this.smallAntY -= this.antVelocity;
						this.mouthColliderBoxY -= this.antVelocity;
						this.smallAntMidPoint.x = this.smallAntX + this.smallAntWidth/2;
						this.smallAntMidPoint.y = this.smallAntY + this.smallAntHeight/2;

						if (Math.abs(this.smallAntMidPoint.y - this.currentMovementTargetFromInput.y) <= renderer.canvas.width*0.0075)
						{
							this.shouldBeMovingUpOrDown = false;
							this.smallAntMovingUp = false;
							console.log('moving up should stop');
						}

						if (this.tallyRaycastIntersectionsWithLeafPolygon(this.smallAntMidPoint, this.leafPolygonWalkingBorderLineSegments) === 0 || 
							this.tallyRaycastIntersectionsWithLeafPolygon(this.smallAntMidPoint, this.leafPolygonWalkingBorderLineSegments) % 2 === 0)
						{
							this.smallAntX = this.smallAntPreviousX;
							this.smallAntY = this.smallAntPreviousY;
							this.mouthColliderBoxX = this.smallAntPreviousMouthColliderX;
							this.mouthColliderBoxY = this.smallAntPreviousMouthColliderY;
							this.smallAntMidPoint.x = this.smallAntPreviousX + this.smallAntWidth/2;
							this.smallAntMidPoint.y = this.smallAntPreviousY + this.smallAntHeight/2;		
							this.currentMovementTargetFromInput.x = undefined;
							this.currentMovementTargetFromInput.y = undefined;
							this.shouldBeMovingUpOrDown = false;
							this.shouldBeMovingLeftOrRight = false;
						}//end of checking small and midpoint is outside leaf boundaries
					}//end of ant moving up		
				}
					
				if (this.smallAntMovingUp && !this.smallAntMovingRight && !this.smallAntMovingLeft && !this.smallAntMovingDown)
				{
					this.currentSmallAntDirection = 'up';
					this.redefineMouthColliderPropertiesForFacingUp();
				}
				else if (this.smallAntMovingUp && this.smallAntMovingLeft && !this.smallAntMovingRight && !this.smallAntMovingRight)
				{
					this.currentSmallAntDirection = 'upLeft';
					this.redefineMouthColliderPropertiesForFacingUpLeft();
				}
				else if (this.smallAntMovingUp && this.smallAntMovingRight && !this.smallAntMovingDown && !this.smallAntMovingLeft)
				{
					this.currentSmallAntDirection = 'upRight';
					this.redefineMouthColliderPropertiesForFacingUpRight();
				}
				else if (this.smallAntMovingRight && !this.smallAntMovingUp && !this.smallAntMovingDown && !this.smallAntMovingLeft)
				{
					this.currentSmallAntDirection = 'right';
					this.redefineMouthColliderPropertiesForFacingRight();
				}
				else if (this.smallAntMovingDown && !this.smallAntMovingRight && !this.smallAntMovingLeft && !this.smallAntMovingUp)
				{
					this.currentSmallAntDirection = 'down';
					this.redefineMouthColliderPropertiesForFacingDown();
				}
				else if (this.smallAntMovingDown && this.smallAntMovingLeft && !this.smallAntMovingUp && !this.smallAntMovingRight)
				{
					this.currentSmallAntDirection = 'downLeft';
					this.redefineMouthColliderPropertiesForFacingDownLeft();
				}
				else if (this.smallAntMovingDown && this.smallAntMovingRight && !this.smallAntMovingUp && !this.smallAntMovingLeft)
				{
					this.currentSmallAntDirection = 'downRight';
					this.redefineMouthColliderPropertiesForFacingDownRight();
				}
				else if (this.smallAntMovingLeft && !this.smallAntMovingDown && !this.smallAntMovingUp && !this.smallAntMovingRight)
				{
					this.currentSmallAntDirection = 'left';
					this.redefineMouthColliderPropertiesForFacingLeft();
				}
				// else 
				// {
				// 	this.currentSmallAntDirection = this.previousSmallAntDirection;
				// }
				console.log('this.currentSmallAntDirection: ' + this.currentSmallAntDirection);

				if (this.smallAntMidPoint === this.currentMovementTargetFromInput)
				{
					//console.log('target should clear');
					this.currentMovementTargetFromInput.x = undefined;
					this.currentMovementTargetFromInput.y = undefined;
				}
		}
			
			
	}
	
	this.redefineMouthColliderPropertiesForFacingUp = function()
	{
		this.mouthColliderBoxX = this.smallAntX + this.smallAntWidth*0.45;
		this.mouthColliderBoxY =  this.smallAntY*1.025;
		this.mouthColliderBoxWidth = this.smallAntWidth*0.4;
		this.mouthColliderBoxHeight = this.smallAntHeight*0.4;
	}
	
	this.redefineMouthColliderPropertiesForFacingDown = function()
	{
		this.mouthColliderBoxX = this.smallAntX + this.smallAntWidth*0.2;
		this.mouthColliderBoxY = this.smallAntY + (this.smallAntHeight * 0.8);
		this.mouthColliderBoxWidth = this.smallAntWidth*0.4;
		this.mouthColliderBoxHeight = this.smallAntHeight*0.4;
	}
	
	this.redefineMouthColliderPropertiesForFacingRight = function()
	{
		this.mouthColliderBoxX = this.smallAntX + this.smallAntWidth*0.85;
		this.mouthColliderBoxY = this.smallAntY + this.smallAntHeight*0.45;
		this.mouthColliderBoxWidth = this.smallAntWidth*0.4;
		this.mouthColliderBoxHeight = this.smallAntHeight*0.4;
	}
	
	this.redefineMouthColliderPropertiesForFacingLeft = function()
	{
		this.mouthColliderBoxX = this.smallAntX - this.smallAntWidth*0.15;
		this.mouthColliderBoxY = this.smallAntY + this.smallAntHeight*0.25;
		this.mouthColliderBoxWidth = this.smallAntWidth*0.4;
		this.mouthColliderBoxHeight = this.smallAntHeight*0.4;
	}
	
	this.redefineMouthColliderPropertiesForFacingUpRight = function()
	{
		this.mouthColliderBoxX = this.smallAntX + this.smallAntWidth*0.8;
		this.mouthColliderBoxY = this.smallAntY + this.smallAntHeight*0.2;
		this.mouthColliderBoxWidth = this.smallAntWidth*0.4;
		this.mouthColliderBoxHeight = this.smallAntHeight*0.4;
	}
	
	this.redefineMouthColliderPropertiesForFacingUpLeft = function()
	{
		this.mouthColliderBoxX = this.smallAntX;
		this.mouthColliderBoxY = this.smallAntY + this.smallAntHeight*0.1;
		this.mouthColliderBoxWidth = this.smallAntWidth*0.4;
		this.mouthColliderBoxHeight = this.smallAntHeight*0.4;
	}
	
	this.redefineMouthColliderPropertiesForFacingDownRight = function()
	{
		this.mouthColliderBoxX = this.smallAntX + this.smallAntWidth*0.6;
		this.mouthColliderBoxY = this.smallAntY + (this.smallAntHeight * 0.65);
		this.mouthColliderBoxWidth = this.smallAntWidth*0.4;
		this.mouthColliderBoxHeight = this.smallAntHeight*0.4;
	}
	
	this.redefineMouthColliderPropertiesForFacingDownLeft = function()
	{
		this.mouthColliderBoxX = this.smallAntX - this.smallAntWidth*0.15;
		this.mouthColliderBoxY = this.smallAntY + (this.smallAntHeight * 0.5);
		this.mouthColliderBoxWidth = this.smallAntWidth*0.4;
		this.mouthColliderBoxHeight = this.smallAntHeight*0.4;
	}
	
	

	this.mouthColliderBoxX = this.smallAntX + this.smallAntWidth*0.45;
	this.mouthColliderBoxY = this.smallAntY*1.025;
	this.mouthColliderBoxWidth = this.smallAntWidth*0.4;
	this.mouthColliderBoxHeight = this.smallAntHeight*0.2;

	this.detectFungusSporeCollisions = function()
	{
		if (leftArrowIsBeingHeld || rightArrowIsBeingHeld || downArrowIsBeingHeld || upArrowIsBeingHeld ||
			this.currentMovementTargetFromInput.x !== undefined || this.currentMovementTargetFromInput.y !== undefined)
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

	this.currentMovementTargetFromInput = {x:undefined,y:undefined};
	
	this.handleTouchstart = function()
	{
		this.currentMovementTargetFromInput = vec2(touchPos[0].x - canvasStartX, touchPos[0].y - canvasStartY);
		if (this.currentMovementTargetFromInput.x > this.fungusTangleX && 
			this.currentMovementTargetFromInput.x < this.fungusTangleX + this.fungusTangleWidth &&
			this.currentMovementTargetFromInput.y > this.fungusTangleY &&
			this.currentMovementTargetFromInput.y < this.fungusTangleY + this.fungusTangleHeight)
		{
			this.shouldBeMovingLeftOrRight = true;
			this.shouldBeMovingUpOrDown = true;
			if (this.smallAntMidPoint.x < this.currentMovementTargetFromInput.x)//ant should move to the right
			{
				this.smallAntMovingRight = true;
				console.log('moving right triggered');
				this.smallAntMovingLeft = false;
			} 
			else if (this.smallAntMidPoint.x > this.currentMovementTargetFromInput.x) //ant should move to the left
			{
				this.smallAntMovingLeft = true;
				console.log('moving left triggered');
				this.smallAntMovingRight = false;
			}
			
			if (this.smallAntMidPoint.y < this.currentMovementTargetFromInput.y)//ant should move down
			{
				console.log('moving down triggered');
				this.smallAntMovingDown = true;
				this.smallAntMovingUp = false;
			}
			else if (this.smallAntMidPoint.y > this.currentMovementTargetFromInput.y)//ant should move up
			{
				this.smallAntMovingUp = true;
				console.log('moving up triggered');
				this.smallAntMovingDown = false;
			}
		}

				if (this.smallAntMovingUp && !this.smallAntMovingRight && !this.smallAntMovingLeft && !this.smallAntMovingDown)
				{
					this.currentSmallAntDirection = 'up';
					this.redefineMouthColliderPropertiesForFacingUp();
				}
				else if (this.smallAntMovingUp && this.smallAntMovingLeft && !this.smallAntMovingRight && !this.smallAntMovingRight)
				{
					this.currentSmallAntDirection = 'upLeft';
					this.redefineMouthColliderPropertiesForFacingUpLeft();
				}
				else if (this.smallAntMovingUp && this.smallAntMovingRight && !this.smallAntMovingDown && !this.smallAntMovingLeft)
				{
					this.currentSmallAntDirection = 'upRight';
					this.redefineMouthColliderPropertiesForFacingUpRight();
				}
				else if (this.smallAntMovingRight && !this.smallAntMovingUp && !this.smallAntMovingDown && !this.smallAntMovingLeft)
				{
					this.currentSmallAntDirection = 'right';
					this.redefineMouthColliderPropertiesForFacingRight();
				}
				else if (this.smallAntMovingDown && !this.smallAntMovingRight && !this.smallAntMovingLeft && !this.smallAntMovingUp)
				{
					this.currentSmallAntDirection = 'down';
					this.redefineMouthColliderPropertiesForFacingDown();
				}
				else if (this.smallAntMovingDown && this.smallAntMovingLeft && !this.smallAntMovingUp && !this.smallAntMovingRight)
				{
					this.currentSmallAntDirection = 'downLeft';
					this.redefineMouthColliderPropertiesForFacingDownLeft();
				}
				else if (this.smallAntMovingDown && this.smallAntMovingRight && !this.smallAntMovingUp && !this.smallAntMovingLeft)
				{
					this.currentSmallAntDirection = 'downRight';
					this.redefineMouthColliderPropertiesForFacingDownRight();
				}
				else if (this.smallAntMovingLeft && !this.smallAntMovingDown && !this.smallAntMovingUp && !this.smallAntMovingRight)
				{
					this.currentSmallAntDirection = 'left';
					this.redefineMouthColliderPropertiesForFacingLeft();
				}
				else 
				{
					this.currentSmallAntDirection = this.previousSmallAntDirection;
				}
				console.log('this.currentSmallAntDirection: ' + this.currentSmallAntDirection);
	}

	this.handleMouseDown = function()
	{
		this.currentMovementTargetFromInput = vec2(touchPos[0].x - canvasStartX, touchPos[0].y - canvasStartY);
		if (this.currentMovementTargetFromInput.x > this.fungusTangleX && 
			this.currentMovementTargetFromInput.x < this.fungusTangleX + this.fungusTangleWidth &&
			this.currentMovementTargetFromInput.y > this.fungusTangleY &&
			this.currentMovementTargetFromInput.y < this.fungusTangleY + this.fungusTangleHeight)
		{
			this.shouldBeMovingLeftOrRight = true;
			this.shouldBeMovingUpOrDown = true;
		}


		if (this.smallAntMidPoint.x < this.currentMovementTargetFromInput.x)//ant should move to the right
		{
			this.smallAntMovingRight = true;
			console.log('moving right triggered');
			this.smallAntMovingLeft = false;
		} 
		else if (this.smallAntMidPoint.x > this.currentMovementTargetFromInput.x) //ant should move to the left
		{
			this.smallAntMovingLeft = true;
			console.log('moving left triggered');
			this.smallAntMovingRight = false;
		}
		

		if (this.smallAntMidPoint.y < this.currentMovementTargetFromInput.y)//ant should move down
		{
			console.log('moving down triggered');
			this.smallAntMovingDown = true;
			this.smallAntMovingUp = false;
		}
		else if (this.smallAntMidPoint.y > this.currentMovementTargetFromInput.y)//ant should move up
		{
			this.smallAntMovingUp = true;
			console.log('moving up triggered');
			this.smallAntMovingDown = false;
		}

				if (this.smallAntMovingUp && !this.smallAntMovingRight && !this.smallAntMovingLeft && !this.smallAntMovingDown)
				{
					this.currentSmallAntDirection = 'up';
					this.redefineMouthColliderPropertiesForFacingUp();
				}
				else if (this.smallAntMovingUp && this.smallAntMovingLeft && !this.smallAntMovingRight && !this.smallAntMovingRight)
				{
					this.currentSmallAntDirection = 'upLeft';
					this.redefineMouthColliderPropertiesForFacingUpLeft();
				}
				else if (this.smallAntMovingUp && this.smallAntMovingRight && !this.smallAntMovingDown && !this.smallAntMovingLeft)
				{
					this.currentSmallAntDirection = 'upRight';
					this.redefineMouthColliderPropertiesForFacingUpRight();
				}
				else if (this.smallAntMovingRight && !this.smallAntMovingUp && !this.smallAntMovingDown && !this.smallAntMovingLeft)
				{
					this.currentSmallAntDirection = 'right';
					this.redefineMouthColliderPropertiesForFacingRight();
				}
				else if (this.smallAntMovingDown && !this.smallAntMovingRight && !this.smallAntMovingLeft && !this.smallAntMovingUp)
				{
					this.currentSmallAntDirection = 'down';
					this.redefineMouthColliderPropertiesForFacingDown();
				}
				else if (this.smallAntMovingDown && this.smallAntMovingLeft && !this.smallAntMovingUp && !this.smallAntMovingRight)
				{
					this.currentSmallAntDirection = 'downLeft';
					this.redefineMouthColliderPropertiesForFacingDownLeft();
				}
				else if (this.smallAntMovingDown && this.smallAntMovingRight && !this.smallAntMovingUp && !this.smallAntMovingLeft)
				{
					this.currentSmallAntDirection = 'downRight';
					this.redefineMouthColliderPropertiesForFacingDownRight();
				}
				else if (this.smallAntMovingLeft && !this.smallAntMovingDown && !this.smallAntMovingUp && !this.smallAntMovingRight)
				{
					this.currentSmallAntDirection = 'left';
					this.redefineMouthColliderPropertiesForFacingLeft();
				}
				else 
				{
					this.currentSmallAntDirection = this.previousSmallAntDirection;
				}
				console.log('this.currentSmallAntDirection: ' + this.currentSmallAntDirection);
	}

	this.update = function()
	{
		this.moveSmallAnt();
		this.detectFungusSporeCollisions();
	}

	this.initialize = function()
	{
		// this.bigAntWalkingInterval.start();
		this.initializeLineSegments();
		this.initializeArrayOfFungusSpores();
	}

	this.headTarget = new Target('head target', renderer.canvas.width * 0.615,renderer.canvas.height * 0.665);
	
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
	this.width = renderer.canvas.width * 0.005;
	this.height = renderer.canvas.width * 0.005;

	this.draw = function()
	{
		renderer.drawImage(this.image, this.x,this.y, this.width,this.height);
	}
}