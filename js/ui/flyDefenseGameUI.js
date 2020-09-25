const DEFENSEGAMEUI = 4;
var defenseGame = {};

isOutOfTime = false; //added as a workaround to use in place of this.ranOutOfTime, which seems to be getting intentionally reset to false every frame.

defenseGame.initialize = function()
{
	this.arrayOfUIObjects = [];

	this.backgroundMusic = document.createElement('audio');
    this.backgroundMusic.setAttribute('src', 'audio/Main Nest Scene B.mp3');
    //this.backgroundMusic.setAttribute('autoplay', 'autoplay');
    this.backgroundMusic.loop = true;

	loadDefenseGameImages();

	this.debugOn = false;

	//timer
	this.timeLeft = 120;
	//this.ranOutOfTime = false;
	this.decreaseCounter = function() 
	{
		if(ui.stateIndex == DEFENSEGAMEUI)
		{
			if (defenseGame.timeLeft > 0) 
			{
				defenseGame.timeLeft--;
			}
			if(defenseGame.timeLeft === 5 && defenseGame.audioManager.sfxManager.timeIsAlmostOutClockTickingLoop.paused)
			{
				defenseGame.audioManager.sfxManager.timeIsAlmostOutClockTickingLoop.play();
			}
			else if (defenseGame.timeLeft === 0 && !defenseGame.audioManager.sfxManager.timeIsAlmostOutClockTickingLoop.paused)
			{
				defenseGame.audioManager.sfxManager.timeIsAlmostOutClockTickingLoop.pause();
				timeToReturnWithLeaves = this.timeLeft;
				//badFungusFromLeaves = 200 - this.fungusTallyDiv.tallyOfEatenFungusSpores;
				badFungusFromLeaves = 200 - defenseGame.background.fungusTallyDiv.tallyOfEatenFungusSpores;  //corrected variable name that was causing a crash
				infectedAntsReturning = defenseGame.background.bigAntTallyOfInfections;
				//ui.stateIndex = COLONYGAMEINTROUI;
				//this.ranOutOfTime = true;
				isOutOfTime = true;
			}
		}
	};
    this.countdownInterval = new frameInterval(defenseGame.decreaseCounter,1000);

    this.audioManager = new AudioManager();
    
    this.arrayOfIntervals = [];

    //background section
	defenseGame.background = new Background();
	defenseGame.background.initialize();

	//this.muteButton = new flyDefenseMuteButton();
    //this.muteButton.initialize();

    this.fullScreenButton = new defenseGameFullScreenButton();

	//center ant with the controllable minim
	this.parentAntObject = new ParentAntObject();
	this.parentAntObject.initialize();

	let bigAntWidth = renderer.canvas.width*0.5;
	let firstBigAntX = renderer.canvas.width/2 - bigAntWidth/2;
	
	//non controlled ants, just there to show the player that ants work in lines
	this.NPCBigAnt1 = new NPCBigAnt(firstBigAntX - bigAntWidth,'1' )
	this.NPCBigAnt2 = new NPCBigAnt(renderer.canvas.width - renderer.canvas.width*0.33,'2');
	this.NPCBigAnt1.initialize();
	this.NPCBigAnt2.initialize();
	this.NPCBigAntNegative1 = new NPCBigAnt( firstBigAntX - (bigAntWidth*2),'-1' );
	this.NPCBigAntNegative1.initialize();
	this.NPCBigAntNegative2 = new NPCBigAnt( firstBigAntX - (bigAntWidth*3), '-2' );
	this.NPCBigAntNegative2.initialize();
	this.NPCBigAntNegative3 = new NPCBigAnt( firstBigAntX - (bigAntWidth*4), '-3' );
	this.NPCBigAntNegative3.initialize();

	this.bigAntManager = new BigAntManager();
	this.bigAntManager.arrayOfBigAnts.push(this.parentAntObject,this.NPCBigAnt1,this.NPCBigAntNegative1,
										   this.NPCBigAntNegative2,this.NPCBigAntNegative3);
	
	//fly stuff
	this.flyManager = new FlyManager();

	this.testFly1 = new Fly('testFly1','planting');
    this.testFly1.assignRandomXYCoordinatesInARange();
    this.testFly2 = new Fly('testFly2',undefined);
    this.testFly2.assignRandomXYCoordinatesInARange();
    this.testFly3 = new Fly('testFly3',undefined);
    this.testFly3.assignRandomXYCoordinatesInARange();
    this.testFly4 = new Fly('testFly4',undefined);
    this.testFly4.assignRandomXYCoordinatesInARange();

    this.flyManager.arrayOfFlies.push(this.testFly1,this.testFly2,this.testFly3,this.testFly4);
    this.flyManager.initialize();

    //ground minims
    this.groundMinimManager = new GroundMinimManager();
    this.groundMinimManager.initializeGroundMinims(5);

	// console.log('defense game init called');
	this.arrayOfFrameIntervals = [this.countdownInterval,this.background.flashAlertInterval];

	this.backgroundSoldier = new BackgroundSoldier();
	this.backgroundSoldier.initialize();

	this.transitioningToUninfectedAnt = false;

	this.infectionAlertMessage = new InfectionAlertMessage();
	this.infectionAlertMessage.initialize();

	this.events = function()
	{
		// console.log('inside custom events');
	}

	this.DefenseGameUIResize = function()
	{
		defenseGame.background.resize();
		defenseGame.parentAntObject.resize();
		defenseGame.NPCBigAnt1.resize();
		defenseGame.NPCBigAnt2.resize();
		defenseGame.NPCBigAntNegative1.resize();
		defenseGame.NPCBigAntNegative2.resize();
		defenseGame.NPCBigAntNegative3.resize();
		defenseGame.backgroundSoldier.resize();
		defenseGame.groundMinimManager.resizeGroundMinims();
		defenseGame.flyManager.resizeFlies();
		defenseGame.bigAntManager.repositionHeadTargets();
		ui.stateIndex = DEFENSEGAMEINTROUI;
	}

	this.update = function()
	{
		defenseGame.background.update();
		defenseGame.background.pheremoneGapManager.updatePheremoneGaps();

		this.flyManager.updateFlies();
		this.backgroundSoldier.update();

		if (defenseGame.background.stuckOnPheremoneGap === false)
		{
			defenseGame.background.pheremoneGapManager.checkForGettingStuckOnPheremoneGaps();
		}
		
		this.groundMinimManager.updateGroundMinims();
		this.groundMinimManager.checkIfAllGroundMinimsHaveReachedPheremoneGap();

	    this.audioManager.sfxManager.avoidAwkwardSilenceForLoopedAudioFiles();

	    this.NPCBigAnt2.update();

	    this.bigAntManager.updateBigAnts();

	    if (this.colonyReached && isTouched) 
	    {
			timeToReturnWithLeaves = this.timeLeft;
			badFungusFromLeaves = 200 - defenseGame.background.fungusTallyDiv.tallyOfEatenFungusSpores;
			infectedAntsReturning = defenseGame.background.bigAntTallyOfInfections;

			this.reset();

			ui.stateIndex = COLONYGAMEINTROUI; //COLONYGAMEINTROUI
			this.colonyReached = false;

			this.hasBeenPlayedOnce = true;
		}
		
		//if (this.ranOutOfTime && isTouched)
		if (isOutOfTime && isTouched)
		{
			timeToReturnWithLeaves = this.timeLeft;
			
			badFungusFromLeaves = 200 - defenseGame.background.fungusTallyDiv.tallyOfEatenFungusSpores;
			
			infectedAntsReturning = defenseGame.background.bigAntTallyOfInfections;

			this.reset();
			
			ui.stateIndex = COLONYGAMEINTROUI;//COLONYGAMEINTROUI
			
			this.colonyReached = false;
			
			this.hasBeenPlayedOnce = true;
		}
	}

	renderer.save();
	renderer.font = '30px Pixelmania';
	this.timeLabelWidth = renderer.measureText('120').width;
	renderer.restore();
	
	this.draw = function()
	{
			defenseGame.background.draw();
			
			this.backgroundSoldier.draw();
			
			this.NPCBigAnt2.draw();
			
			this.bigAntManager.drawBigAnts();

			// defenseGame.plantedEggManager.draw();
			defenseGame.background.fungusSporeFeedbackAnimationManager.draw();

			defenseGame.background.pheremoneGapManager.drawAlertMessages();

			this.groundMinimManager.drawGroundMinims();
			
			this.flyManager.drawFlies();

			this.background.fungusTallyDiv.draw();
			this.background.infectionTallyDiv.draw();

		  	let timerNumberConvertedToString = defenseGame.timeLeft.toString();
		  	let labelWidth = renderer.measureText(timerNumberConvertedToString).width;

		  	renderer.fillStyle = 'white';
			renderer.font = (75 * pixelSize) * 'px SmallBoldPixel';
			renderer.textAlign = 'left';
		  	renderer.fillText(string_TIME_LEFT[currentLanguage] + timerNumberConvertedToString, renderer.canvas.width * 0.01,renderer.canvas.height * 0.25);

			if (this.colonyReached)
			{
				renderer.fillStyle = 'white';
				let fontSize = 80 * pixelSize;
				let stringedFontSize = fontSize.toString();
				renderer.font = stringedFontSize + 'px SmallBoldPixel';

				let colonyReachedText = string_COLONY_REACHED[currentLanguage];
				let colonyReachedTextWidth = renderer.measureText(colonyReachedText).width;
				renderer.textAlign = 'left';
				renderer.fillText(colonyReachedText, renderer.canvas.width/2 - colonyReachedTextWidth/2,
													 renderer.canvas.height/2 - fontSize/2);

				let clickToContinueTextFontSize = 75 * pixelSize;
				let stringedClickToContinueTextFontSize = clickToContinueTextFontSize.toString();
				renderer.font = stringedClickToContinueTextFontSize + 'px SmallBoldPixel';
				let clickToContinueText = string_CLICK_TO_CONTINUE[currentLanguage];
				let clickToContinueTextWidth = renderer.measureText(clickToContinueText).width;
				renderer.textAlign = 'left';
				renderer.fillText(clickToContinueText, renderer.canvas.width/2 - clickToContinueTextWidth/2,
													   renderer.canvas.height/2 + fontSize/2);
				
			}

			if (isOutOfTime)
			{
				renderer.fillStyle = 'white';
				let fontSize = pixelSize * 80;
				let stringedFontSize = fontSize.toString();
				renderer.font = stringedFontSize + 'px SmallBoldPixel';

				let noTimeLeftText = string_NO_TIME_LEFT[currentLanguage];
				let noTimeLeftTextWidth = renderer.measureText(noTimeLeftText).width;
				renderer.textAlign = 'left';
				renderer.fillText(noTimeLeftText, renderer.canvas.width/2 - noTimeLeftTextWidth/2,
												  renderer.canvas.height/2 - fontSize/2);

				let clickToContinueTextFontSize = pixelSize * 75;
				let stringedClickToContinueTextFontSize = clickToContinueTextFontSize.toString();
				renderer.font = stringedClickToContinueTextFontSize + 'px SmallBoldPixel';
				let clickToContinueText = string_CLICK_TO_CONTINUE[currentLanguage];
				let clickToContinueTextWidth = renderer.measureText(clickToContinueText).width;
				renderer.textAlign = 'left';
				renderer.fillText(clickToContinueText, renderer.canvas.width/2 - clickToContinueTextWidth/2,
													   renderer.canvas.height/2 + fontSize/2);
			}

			if (defenseGame.infectionAlertMessage.shouldBeVisible)
			{
				defenseGame.infectionAlertMessage.draw();
			}
	}//end of draw

	this.passStats = function()
	{
		let tallyOfLeafContaminantsCleaned = defenseGame.background.fungusTallyDiv.tallyOfEatenFungusSpores;
	
		let elapsedTime = 120 - this.timeLeft;
		
		let bigAntTallyOfInfections = defenseGame.background.bigAntTallyOfInfections;
	}

	this.arrayOfTimeouts = [];
	
	this.reset = function()
	{
		defenseGame.transitioningToUninfectedAnt = false;
		//clearing intervals and timeouts for potential performance issues
		for (let i = 0; i < this.arrayOfFrameIntervals.length; i++)
		{
			this.arrayOfFrameIntervals[i].stop();
		}

		for (let i = 0; i < this.arrayOfTimeouts.length; i++)
		{
			clearTimeout(this.arrayOfTimeouts[i]);
		}

		for (let i = 0; i < this.arrayOfIntervals.length; i++)
		{
			clearInterval(this.arrayOfIntervals[i]);
		}

		//other settings
		this.timeLeft = 120;
		//this.colonyReached = false;
		this.background.slowDownRateFromInfections = 1;
		this.background.groundImage1xCoordinate = 0;
		this.background.groundImage2xCoordinate = renderer.canvas.width;
		this.background.groundImage3xCoordinate = -renderer.canvas.width;
		this.background.grassLayerImage1XCoordinate = 0;
		this.background.grassLayerImage2XCoordinate = renderer.canvas.width;
		this.background.grassLayerImage3XCoordinate = -renderer.canvas.width;
		this.background.leavesLayerImage1XCoordinate = 0;
		this.background.leavesLayerImage2XCoordinate = renderer.canvas.width;
		this.background.leavesLayerImage3XCoordinate = -renderer.canvas.width;
		this.background.forageLayerImage1XCoordinate = 0;
		this.background.forageLayerImage2XCoordinate = renderer.canvas.width;
		this.background.forageLayerImage3XCoordinate = -renderer.canvas.width;

		this.background.pheremoneStrip1ImageXCoordinate = 0;
		this.background.pheremoneStrip2ImageXCoordinate = renderer.canvas.width*1.01 + this.background.pheremoneGapWidth;

		this.background.colonyMoundXCoordinate = 2.7*renderer.canvas.width;
		this.background.colonyMoundMidpoint = this.background.colonyMoundXCoordinate + this.background.colonyMoundWidth/2;
		
		this.background.pheremoneGapManager = new PheremoneGapManager();
		this.background.pheremoneGapManager.instantiatePheremoneGaps();

		this.background.currentPheremoneGapArrayIndex = 0;
		this.background.currentPheremoneGap = this.background.pheremoneGapManager.arrayOfPheremoneGaps[this.background.currentPheremoneGapArrayIndex];
		
		this.background.stuckOnPheremoneGap = false;

		defenseGame.flyManager.currentStatus = 'normal';
		defenseGame.flyManager.arrayOfFlies[0].status = 'swatted';
		defenseGame.flyManager.arrayOfFlies[1].status = 'swatted';
		defenseGame.flyManager.arrayOfFlies[2].status = 'swatted';
		defenseGame.flyManager.arrayOfFlies[3].status = 'swatted';
		defenseGame.flyManager.currentFlyIndex = -1;

		this.background.fungusTallyDiv.tallyOfEatenFungusSpores = 0;
		defenseGame.background.bigAntTallyOfInfections = 0;

		this.parentAntObject.currentSpriteSheet = bigAntWalkingSpriteSheet;
		
		for (let i = 0; i < defenseGame.bigAntManager.arrayOfBigAnts.length; i++)
		{
			defenseGame.bigAntManager.arrayOfBigAnts[i].currentSpriteSheet = bigAntWalkingSpriteSheet;
		}

		this.NPCBigAnt2.currentSpriteSheet = bigAntWalkingSpriteSheet;
		this.background.pheremoneStrip2ImageXCoordinate = renderer.canvas.width*1.01 + this.background.pheremoneGapWidth;

		this.audioManager.resetFlyDefenseAudio();

		for (let i = 0; i < this.flyManager.arrayOfFlies.length; i++)
		{
			this.flyManager.arrayOfFlies[i].assignRandomXYCoordinatesInARange();
		}
		isOutOfTime = false;

		defenseGame.audioManager.sfxManager.stuckSwarmAlertSound.pause();
		defenseGame.audioManager.sfxManager.stuckSwarmAlertSound.currentTime = 0;

		this.parentAntObject.bigAntX = renderer.canvas.width/2 - this.parentAntObject.bigAntWidth/2;
		this.NPCBigAnt1.bigAntX = firstBigAntX - bigAntWidth; 
		this.NPCBigAnt2.bigAntX = renderer.canvas.width - renderer.canvas.width*0.33;
		this.NPCBigAntNegative1.bigAntX = firstBigAntX - (bigAntWidth*2);
		this.NPCBigAntNegative2.bigAntX = firstBigAntX - (bigAntWidth*3);
		this.NPCBigAntNegative3.bigAntX = firstBigAntX - (bigAntWidth*4);

		this.bigAntManager.arrayOfBigAnts = [this.parentAntObject,this.NPCBigAnt1,this.NPCBigAntNegative1,
											this.NPCBigAntNegative2,this.NPCBigAntNegative3];
		this.bigAntManager.currentIndex = 0;
		this.bigAntManager.currentActiveAnt = defenseGame.parentAntObject;

		for (let i = 0; i < defenseGame.bigAntManager.arrayOfBigAnts.length; i++)
		{
			defenseGame.bigAntManager.arrayOfBigAnts[i].leafX = defenseGame.bigAntManager.arrayOfBigAnts[i].bigAntX + defenseGame.bigAntManager.arrayOfBigAnts[i].bigAntWidth*0.55;
			defenseGame.bigAntManager.arrayOfBigAnts[i].leafY = defenseGame.bigAntManager.arrayOfBigAnts[i].bigAntY + defenseGame.bigAntManager.arrayOfBigAnts[i].bigAntHeight/2 - defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*1.05;
			defenseGame.bigAntManager.arrayOfBigAnts[i].fungusTangleX = defenseGame.bigAntManager.arrayOfBigAnts[i].leafX - defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.05;
			defenseGame.bigAntManager.arrayOfBigAnts[i].fungusTangleY = defenseGame.bigAntManager.arrayOfBigAnts[i].leafY - defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.05;
			
			defenseGame.bigAntManager.arrayOfBigAnts[i].leafPolygonWalkingBorderPoints = 
			[

			{name:'1',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX-defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.025,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.575},
			{name:'2',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.275,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.3},
			{name:'3',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.425,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.025},
			{name:'4',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.625,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.01},
			{name:'5',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.825,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.22},
			{name:'6',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.32},
			{name:'7',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.5},
			{name:'8',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.9,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.5},
			{name:'9',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.9125,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.66},
			{name:'10',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.775,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.88},
			{name:'11',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.45,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*1.0125},
			{name:'12',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.275,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.95},
			{name:'13',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.15,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.75},
			{name:'14',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX-defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.025,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.575}

			];

			defenseGame.bigAntManager.arrayOfBigAnts[i].leafPolygonFungusBorderPoints = 
			[

			{name:'1',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.04,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.575},
			{name:'2',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.375,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.2},
			{name:'3',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.425,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.05},
			{name:'4',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.625,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.05},
			{name:'5',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.75,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.22},
			{name:'6',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.975,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.32},
			{name:'7',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.975,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.48},
			{name:'8',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.87,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.46},
			{name:'9',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.86,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.66},
			{name:'10',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.725,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.88},
			{name:'11',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.45,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.975},
			{name:'12',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.35,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.95},
			{name:'13',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.15,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.7},
			{name:'14',x:defenseGame.bigAntManager.arrayOfBigAnts[i].leafX+defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.04,y:defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.575}

			];
			defenseGame.bigAntManager.arrayOfBigAnts[i].initializeLineSegments();
			
			defenseGame.bigAntManager.arrayOfBigAnts[i].initializeArrayOfFungusSpores();

			defenseGame.bigAntManager.arrayOfBigAnts[i].shouldBeMovingLeftOrRight = false;
			defenseGame.bigAntManager.arrayOfBigAnts[i].shouldBeMovingUpOrDown = false;
			defenseGame.bigAntManager.arrayOfBigAnts[i].smallAntMovingRight = false;
			defenseGame.bigAntManager.arrayOfBigAnts[i].smallAntMovingLeft = false;
			defenseGame.bigAntManager.arrayOfBigAnts[i].smallAntMovingUp = false;
			defenseGame.bigAntManager.arrayOfBigAnts[i].smallAntMovingDown = false;

			defenseGame.bigAntManager.arrayOfBigAnts[i].smallAntWidth = defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth*0.3;
			defenseGame.bigAntManager.arrayOfBigAnts[i].smallAntHeight = defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight*0.3;
			defenseGame.bigAntManager.arrayOfBigAnts[i].smallAntX = defenseGame.bigAntManager.arrayOfBigAnts[i].leafX + defenseGame.bigAntManager.arrayOfBigAnts[i].leafWidth/2 - defenseGame.bigAntManager.arrayOfBigAnts[i].smallAntWidth/2;
			defenseGame.bigAntManager.arrayOfBigAnts[i].smallAntY = defenseGame.bigAntManager.arrayOfBigAnts[i].leafY + defenseGame.bigAntManager.arrayOfBigAnts[i].leafHeight/2 - defenseGame.bigAntManager.arrayOfBigAnts[i].smallAntHeight/2;
			defenseGame.bigAntManager.arrayOfBigAnts[i].smallAntMidPoint = {x:defenseGame.bigAntManager.arrayOfBigAnts[i].smallAntX + defenseGame.bigAntManager.arrayOfBigAnts[i].smallAntWidth/2,y:defenseGame.bigAntManager.arrayOfBigAnts[i].smallAntY + defenseGame.bigAntManager.arrayOfBigAnts[i].smallAntHeight/2};

			defenseGame.bigAntManager.arrayOfBigAnts[i].currentSmallAntDirection = 'up';
			defenseGame.bigAntManager.arrayOfBigAnts[i].smallAntMoving = false;

			defenseGame.bigAntManager.arrayOfBigAnts[i].currentMovementTargetFromInput = {};
			
			defenseGame.bigAntManager.arrayOfBigAnts[i].headTarget.x = defenseGame.bigAntManager.arrayOfBigAnts[i].bigAntX + defenseGame.bigAntManager.arrayOfBigAnts[i].bigAntWidth*0.65 + defenseGame.bigAntManager.arrayOfBigAnts[i].bigAntWidth*0.1;
		}
		
		for (let i = 0; i < defenseGame.flyManager.arrayOfFlies.length; i++)
		{
			defenseGame.flyManager.arrayOfFlies[i].currentTarget = defenseGame.parentAntObject.headTarget;
		}

		for (let i = 0; i < defenseGame.bigAntManager.arrayOfBigAnts.length; i++)
		{
			if (defenseGame.bigAntManager.arrayOfBigAnts[i] === defenseGame.parentAntObject)
			{
				defenseGame.bigAntManager.arrayOfBigAnts[i].controlStatus = 'active';
			}
			else
			{
				defenseGame.bigAntManager.arrayOfBigAnts[i].controlStatus = 'inactive';
			}

			defenseGame.bigAntManager.arrayOfBigAnts[i].hasBeenInfected = false;
		}

	}

	this.hasBeenPlayedOnce = false;
	this.arrayOfIntervalsToRestart = [];
	this.restartIntervals = function()
	{
		for (let i = 0; i < this.arrayOfFrameIntervals.length; i++)
		{
			this.arrayOfFrameIntervals[i].start();
		}

		defenseGame.arrayOfIntervals = [];

		let backgroundWalkingInterval = setInterval(function(){defenseGame.backgroundSoldier.cycleImages()},100);
		defenseGame.arrayOfIntervals.push(backgroundWalkingInterval);

		for (let i = 0; i < defenseGame.flyManager.arrayOfFlies.length; i++)
		{
			let flyAnimation = 
			setInterval(function() {defenseGame.flyManager.arrayOfFlies[i].cycleImages()},25);

			defenseGame.arrayOfIntervals.push(flyAnimation);
		}

		// for (let i = 0; defenseGame.groundMinimManager.arrayOfGroundMinims.length; i++)
		// {
		// 	console.log('defenseGame.groundMinimManager.arrayOfGroundMinims.length: ' + defenseGame.groundMinimManager.arrayOfGroundMinims.length);
		// 	console.log('i: ' + i);
		// 	// let groundMinimAnimation = setInterval(function() {defenseGame.groundMinimManager.arrayOfGroundMinims[i].cycleImages()},50);
		// 	// defenseGame.arrayOfIntervals.push(groundMinimAnimation);
		// }
		// console.log('arrayOfGroundMinims: ' + defenseGame.groundMinimManager.arrayOfGroundMinims);
		// console.log("AFTER: ground minim animations restart");
		let groundMinimAnimation0 = setInterval(function() {defenseGame.groundMinimManager.arrayOfGroundMinims[0].cycleImages()},100);
		defenseGame.arrayOfIntervals.push(groundMinimAnimation0);
		let groundMinimAnimation1 = setInterval(function() {defenseGame.groundMinimManager.arrayOfGroundMinims[1].cycleImages()},100);
		defenseGame.arrayOfIntervals.push(groundMinimAnimation1);
		let groundMinimAnimation2 = setInterval(function() {defenseGame.groundMinimManager.arrayOfGroundMinims[2].cycleImages()},100);
		defenseGame.arrayOfIntervals.push(groundMinimAnimation2);
		let groundMinimAnimation3 = setInterval(function() {defenseGame.groundMinimManager.arrayOfGroundMinims[3].cycleImages()},100);
		defenseGame.arrayOfIntervals.push(groundMinimAnimation3);
		let groundMinimAnimation4 = setInterval(function() {defenseGame.groundMinimManager.arrayOfGroundMinims[4].cycleImages()},100);
		defenseGame.arrayOfIntervals.push(groundMinimAnimation4);

		// window.NPCBigAntAnimationInterval = 
		// setInterval(function () {_this.cycleBigAntImages()},100);
		
		// defenseGame.arrayOfIntervals.push(window.NPCBigAntAnimationInterval);

		// for (let i = 0; i < defenseGame.bigAntManager.arrayOfBigAnts.length; i++)
		// {
		// 	let bigAntAnimation = setInterval(function() {defenseGame.bigAntManager.arrayOfBigAnts[i].cycleBigAntImages()},100);
		// 	defenseGame.arrayOfIntervals.push(bigAntAnimation);
		// }

		// let NPCBigAnt2Animation = setInterval(function() {defenseGame.NPCBigAnt2.cycleBigAntImages()},100);
		// defenseGame.arrayOfIntervals.push(NPCBigAnt2Animation);

		for (let i = 0; i < defenseGame.bigAntManager.arrayOfBigAnts.length; i++)
		{
			let leafMinimAnimation = setInterval(function() {defenseGame.bigAntManager.arrayOfBigAnts[i].cycleSmallAntImages(),250});
			defenseGame.arrayOfIntervals.push(leafMinimAnimation);
		}
		// let leafMinimAnimation = setInterval(function() {defenseGame.parentAntObject.cycleSmallAntImages(),250})
		// defenseGame.arrayOfIntervals.push(leafMinimAnimation);
		
	}
}

function DefenseGameButton()
{
	this.x = 0;
	this.y = 0;
	this.width = 100;
	this.height = 100;


	this.draw = function()
	{
		renderer.fillStyle = 'black';
		renderer.fillRect(this.x,this.y, this.width,this.height);
	}

	this.handleInput = function(inputCoordinates)
	{
		if (inputCoordinates.x > this.x && inputCoordinates.x < this.x + this.width && 
			inputCoordinates.y > this.y && inputCoordinates.y < this.y + this.height)
		{
			ui.stateIndex = DEFENSEGAMEUI;
			// defenseGame.restartIntervals();
			defenseGame.initialize();
			
		    defenseGame.audioManager.populateMasterArrayOfAudioTags();
		    defenseGame.audioManager.populateArrayOfDefenseGameSounds();
			defenseGame.audioManager.sfxManager.populateArrayOfEatingFungusSounds();
      defenseGame.audioManager.sfxManager.populateArrayOfFlyChasedSounds();
      defenseGame.audioManager.ambienceManager.startAmbience();
      defenseGame.audioManager.sfxManager.calculateAndSetAvoidAwkwardSilenceTimestamps();
      defenseGame.audioManager.sfxManager.flyBuzzingNormal.play();
      defenseGame.audioManager.sfxManager.groundMinimFootsteps.play();
      bgmColony.pause();
		}
	}
}

let defenseGameButton = new DefenseGameButton();