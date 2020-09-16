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
	this.timeLeft = 10;
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
	
	this.backgroundSoldier = new BackgroundSoldier();
	this.backgroundSoldier.initialize();

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

    // this.plantedEggManager = new PlantedEggManager();

    // this.eggHasBeenPlanted = false;

    //ground minims
    this.groundMinimManager = new GroundMinimManager();
    this.groundMinimManager.initializeGroundMinims(5);

	// console.log('defense game init called');
	this.arrayOfFrameIntervals = [this.countdownInterval,this.background.flashAlertInterval];

	this.transitioningToUninfectedAnt = false;

	this.infectionAlertMessage = new InfectionAlertMessage();
	this.infectionAlertMessage.initialize();

	this.events = function()
	{
		// console.log('inside custom events');
	}

	this.update = function()
	{
		defenseGame.background.update();
		defenseGame.background.pheremoneGapManager.updatePheremoneGaps();

		//console.log('groundImage3xCoordinate: ' + defenseGame.background.groundImage3xCoordinate);

		this.flyManager.updateFlies();
		//this.parentAntObject.update();
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

			// for (let i = 0; i < defenseGame.arrayOfTimeouts.length; i++) 
			// 	{clearTimeout(defenseGame.arrayOfTimeouts[i]);};

			this.reset();

			ui.stateIndex = COLONYGAMEINTROUI;
			this.colonyReached = false;
		}
		
		//if (this.ranOutOfTime && isTouched)
		if (isOutOfTime && isTouched)
		{
			console.log('inside no time left and isTouched check');
			timeToReturnWithLeaves = this.timeLeft;
			console.log('AFTER: timeToReturnWithLeaves = this.timeLeft;');
			badFungusFromLeaves = 200 - defenseGame.background.fungusTallyDiv.tallyOfEatenFungusSpores;
			console.log('AFTER: badFungusFromLeaves = 200 - defenseGame.background.fungusTallyDiv.tallyOfEatenFungusSpores;');
			infectedAntsReturning = defenseGame.background.bigAntTallyOfInfections;
			console.log('AFTER: infectedAntsReturning = defenseGame.background.bigAntTallyOfInfections;');
			// for (let i = 0; i < defenseGame.arrayOfTimeouts.length; i++) 
			// 	{clearTimeout(defenseGame.arrayOfTimeouts[i]);};

			this.reset();
			console.log('AFTER: this.reset();');

			ui.stateIndex = COLONYGAMEINTROUI;
			console.log('AFTER: ui.stateIndex = COLONYGAMEINTROUI;');
			this.colonyReached = false;
			console.log('AFTER: this.colonyReached = false;');
		}
	}

	renderer.save();
	renderer.font = '30px Pixelmania';
	this.timeLabelWidth = renderer.measureText('120').width;
	renderer.restore();
	
	this.draw = function()
	{
		
				//console.log('inside draw function of defense game');
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

			// renderer.fillStyle = 'lawngreen';
		//     	renderer.fillRect(renderer.canvas.width * 0.845,(renderer.canvas.height * 0.1) - 30, this.timeLabelWidth*1.95,this.timeLabelWidth );

		  	let timerNumberConvertedToString = defenseGame.timeLeft.toString();
		  	let labelWidth =  renderer.measureText(timerNumberConvertedToString).width;

		  	renderer.fillStyle = 'white';
			renderer.font = (75 * pixelSize) * 'px SmallBoldPixel';
			renderer.textAlign = 'left';
		  	renderer.fillText(string_TIME_LEFT[currentLanguage] + timerNumberConvertedToString, renderer.canvas.width * 0.01,renderer.canvas.height * 0.25);

			if (this.colonyReached)
			{
				renderer.fillStyle = 'white';
				let fontSize = 80;
				let stringedFontSize = fontSize.toString();
				renderer.font = stringedFontSize + 'px SmallBoldPixel';

				let colonyReachedText = string_COLONY_REACHED[currentLanguage];
				let colonyReachedTextWidth = renderer.measureText(colonyReachedText).width;
				renderer.textAlign = 'left';
				renderer.fillText(colonyReachedText, renderer.canvas.width/2 - colonyReachedTextWidth/2,
													 renderer.canvas.height/2 - fontSize/2);

				let clickToContinueTextFontSize = 80;
				let stringedClickToContinueTextFontSize = clickToContinueTextFontSize.toString();
				renderer.font = stringedClickToContinueTextFontSize + 'px SmallBoldPixel';
				let clickToContinueText = string_CLICK_TO_CONTINUE[currentLanguage];
				let clickToContinueTextWidth = renderer.measureText(clickToContinueText).width;
				renderer.textAlign = 'left';
				renderer.fillText(clickToContinueText, renderer.canvas.width/2 - clickToContinueTextWidth/2,
													   renderer.canvas.height/2 + fontSize/2);
				
			}

			//if (this.ranOutOfTime)
			if (isOutOfTime)
			{
				renderer.fillStyle = 'white';
				let fontSize = 80;
				let stringedFontSize = fontSize.toString();
				renderer.font = stringedFontSize + 'px SmallBoldPixel';

				let noTimeLeftText = string_NO_TIME_LEFT[currentLanguage];
				let noTimeLeftTextWidth = renderer.measureText(noTimeLeftText).width;
				renderer.textAlign = 'left';
				renderer.fillText(noTimeLeftText, renderer.canvas.width/2 - noTimeLeftTextWidth/2,
												  renderer.canvas.height/2 - fontSize/2);

				let clickToContinueTextFontSize = 80;
				let stringedClickToContinueTextFontSize = clickToContinueTextFontSize.toString();
				renderer.font = stringedClickToContinueTextFontSize + 'px SmallBoldPixel';
				let clickToContinueText = string_CLICK_TO_CONTINUE[currentLanguage];
				let clickToContinueTextWidth = renderer.measureText(clickToContinueText).width;
				renderer.textAlign = 'left';
				renderer.fillText(clickToContinueText, renderer.canvas.width/2 - clickToContinueTextWidth/2,
													   renderer.canvas.height/2 + fontSize/2);
			}

		
			//this.muteButton.draw();
			//this.background.exitButton.draw();
			//this.fullScreenButton.draw();
			if (defenseGame.infectionAlertMessage.shouldBeVisible)
			{

				defenseGame.infectionAlertMessage.draw();
			}
	}//end of draw

	this.passStats = function()
	{
		console.log('put stats code here');
		let tallyOfLeafContaminantsCleaned = defenseGame.background.fungusTallyDiv.tallyOfEatenFungusSpores;
		console.log('tallyOfLeafContaminantsCleaned: ' + tallyOfLeafContaminantsCleaned);

		let elapsedTime = 120 - this.timeLeft;
		console.log('elapsedTime: ' + elapsedTime);

		let bigAntTallyOfInfections = defenseGame.background.bigAntTallyOfInfections;
		console.log('bigAntTallyOfInfections: ' + bigAntTallyOfInfections);
	}

	this.arrayOfTimeouts = [];
	
	this.reset = function()
	{
		//console.log('put reset code here');
		
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
		this.background.pheremoneStrip2ImageXCoordinate = renderer.canvas.width*1.01 + this.pheremoneGapWidth;
		this.background.colonyMoundXCoordinate = 2.7*renderer.canvas.width;
		this.background.colonyMoundMidpoint = this.colonyMoundXCoordinate + this.colonyMoundWidth/2;
		this.background.pheremoneGapManager = new PheremoneGapManager();
		this.background.pheremoneGapManager.instantiatePheremoneGaps();

		this.background.currentPheremoneGapArrayIndex = 0;
		this.background.currentPheremoneGap = this.background.pheremoneGapManager.arrayOfPheremoneGaps[this.background.currentPheremoneGapArrayIndex];
		

		this.background.fungusTallyDiv.tallyOfEatenFungusSpores = 0;
		defenseGame.background.bigAntTallyOfInfections = 0;


		this.parentAntObject.currentSpriteSheet = bigAntWalkingSpriteSheet;
		this.parentAntObject.initializeArrayOfFungusSpores();


		this.audioManager.resetFlyDefenseAudio();

		for (let i = 0; i < this.flyManager.arrayOfFlies.length; i++)
		{
			this.flyManager.arrayOfFlies[i].assignRandomXYCoordinatesInARange();
		}

		isOutOfTime = false;
	}

	this.arrayOfIntervalsToRestart = [];
	this.restartIntervals = function()
	{
		// for (let i = 0; i < this.arrayOfIntervals.length; i++)
		// {
		// 	console.log('this.arrayOfIntervals[i]: ' + this.arrayOfIntervals[i]);
		// 	this.arrayOfIntervals[i].start();
		// }
		
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