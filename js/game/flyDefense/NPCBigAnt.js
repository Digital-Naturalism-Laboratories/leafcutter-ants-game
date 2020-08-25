function NPCBigAnt(x,name)
{
	this.name = name;
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
	
	this.smallAntSpriteSheet = leafMinimWalkingSpriteSheet;
	this.currentSmallAntSpriteSheetIndex = 0;

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
		this.drawFungusSpores();
		this.drawSmallAnt();

		if (defenseGame.debugOn)
		{

			renderer.fillStyle = 'white';
			renderer.font = '30px Helvetica';
			renderer.fillText('NPCBig Ant ' + this.name, this.bigAntX + this.width,this.bigAntY);
		}
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
	
	this.leafPolygonFungusBorderPoints = 
	[

		{name:'1',x:this.leafX+this.leafWidth*0.04,y:this.leafY + this.leafHeight*0.575},
		{name:'2',x:this.leafX+this.leafWidth*0.375,y:this.leafY + this.leafHeight*0.2},
		{name:'3',x:this.leafX+this.leafWidth*0.425,y:this.leafY + this.leafHeight*0.05},
		{name:'4',x:this.leafX+this.leafWidth*0.625,y:this.leafY + this.leafHeight*0.05},
		{name:'5',x:this.leafX+this.leafWidth*0.75,y:this.leafY + this.leafHeight*0.22},
		{name:'6',x:this.leafX+this.leafWidth*0.975,y:this.leafY + this.leafHeight*0.32},
		{name:'7',x:this.leafX+this.leafWidth*0.975,y:this.leafY + this.leafHeight*0.48},
		{name:'8',x:this.leafX+this.leafWidth*0.87,y:this.leafY + this.leafHeight*0.46},
		{name:'9',x:this.leafX+this.leafWidth*0.86,y:this.leafY + this.leafHeight*0.66},
		{name:'10',x:this.leafX+this.leafWidth*0.725,y:this.leafY + this.leafHeight*0.88},
		{name:'11',x:this.leafX+this.leafWidth*0.45,y:this.leafY + this.leafHeight*0.975},
		{name:'12',x:this.leafX+this.leafWidth*0.35,y:this.leafY + this.leafHeight*0.95},
		{name:'13',x:this.leafX+this.leafWidth*0.15,y:this.leafY + this.leafHeight*0.7},
		{name:'14',x:this.leafX+this.leafWidth*0.04,y:this.leafY + this.leafHeight*0.575}

	];

	this.leafPolygonFungusBorderLineSegments = [];

	this.initializeLineSegments = function()
	{
		for (let i = 0; i < this.leafPolygonFungusBorderPoints.length - 1; i++)
		{
			let lineSegment = {name:this.leafPolygonFungusBorderPoints[i].name, 
							   x1:this.leafPolygonFungusBorderPoints[i].x,y1:this.leafPolygonFungusBorderPoints[i].y, 
							   x2:this.leafPolygonFungusBorderPoints[i + 1].x,y2:this.leafPolygonFungusBorderPoints[i + 1].y};

			this.leafPolygonFungusBorderLineSegments.push(lineSegment);

		}
	}

	this.drawLeaf = function()
	{
		renderer.drawImage(this.leafImage, this.leafX,this.leafY, this.leafWidth,this.leafHeight);
		if (defenseGame.debugOn === true)
		{
			renderer.strokeStyle = 'red';
			renderer.lineWidth = 5;
			renderer.strokeRect(this.leafX,this.leafY, this.leafWidth,this.leafHeight);


			renderer.strokeStyle = 'white';
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
			renderer.strokeStyle = 'white';
			renderer.stroke();
		}
	}

	this.smallAntWidth = this.leafWidth*0.3;
	this.smallAntHeight = this.leafHeight*0.3;

	this.smallAntX = this.leafX + this.leafWidth/2 - this.smallAntWidth/2;
	this.smallAntY = this.leafY + this.leafHeight/2 - this.smallAntHeight/2;

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



	this.smallAntSourceWidth = 120;
	this.smallAntSourceHeight = 108;
	this.drawSmallAnt = function()
	{
		// if (!defenseGame.inputManager.swatIsBeingHeld)
		// {
					renderer.drawImage(leafMinimWalkingSpriteSheet, 
				this.currentSmallAntSpriteSheetIndex*this.smallAntSourceWidth,0, this.smallAntSourceWidth,this.smallAntSourceHeight,
				this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);

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
		this.arrayOfFungusSpores = [];
		console.log('this.leafPolygonFungusBorderLineSegments')
		for (let i = 0; i < 200; i++)
		{
			let potentialFungusPoint = {x:Math.floor(getRandomIntInclusive(this.leafX,this.leafX + this.leafWidth)),
											  y:Math.floor(getRandomIntInclusive(this.leafY,this.leafY + this.leafHeight))};

			while(this.tallyRaycastIntersectionsWithLeafPolygon(potentialFungusPoint, this.leafPolygonFungusBorderLineSegments) === 0 || 
				this.tallyRaycastIntersectionsWithLeafPolygon(potentialFungusPoint, this.leafPolygonFungusBorderLineSegments) % 2 === 0)
			{
				potentialFungusPoint = {x:Math.floor(getRandomIntInclusive(this.leafX,this.leafX + this.leafWidth)),
											  y:Math.floor(getRandomIntInclusive(this.leafY,this.leafY + this.leafHeight))};
			}
			
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
		if (defenseGame.transitioningToUninfectedAnt)
		{
			this.bigAntX += renderer.canvas.width*0.002;
			this.leafX += renderer.canvas.width*0.002;
			for (let i = 0; i < this.arrayOfFungusSpores.length; i++)
			{
				this.arrayOfFungusSpores[i].x += renderer.canvas.width*0.002;
			}
			this.smallAntX += renderer.canvas.width*0.002;
		}

		if (this.name === '1' && this.bigAntX >= renderer.canvas.width/2 - this.bigAntWidth/2)
		{
			defenseGame.transitioningToUninfectedAnt = false;
		}
	}

	this.initialize = function()
	{
		var _this = this;
		window.NPCBigAntAnimationInterval = 
		setInterval(function () {_this.cycleBigAntImages()},100);
		
		defenseGame.arrayOfIntervals.push(window.NPCBigAntAnimationInterval);
		// this.bigAntWalkingInterval.start();
		this.initializeLineSegments();
		this.initializeArrayOfFungusSpores();
	}

this.tallyRaycastIntersectionsWithLeafPolygon = function(pointToRaycast, arrayOfLines)
	{
		let numberOfIntersections = 0;
		
		for (let i = 0; i < arrayOfLines.length; i++)
		{
			

			//raycast line from potential fungus point
			let x1 = pointToRaycast.x;
			let x2 = pointToRaycast.x;
			let y1 = pointToRaycast.y;
			let y2 = 1;

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
	// this.headTarget = new Target('head target', defenseGame.canvas.width * 0.435,defenseGame.canvas.height * 0.575);
	// this.thoraxTarget = new Target('thorax target', defenseGame.canvas.width * 0.35,defenseGame.canvas.height * 0.6);
	// this.abdomenTarget = new Target('abdomen target', defenseGame.canvas.width * 0.285,defenseGame.canvas.height * 0.6);
}