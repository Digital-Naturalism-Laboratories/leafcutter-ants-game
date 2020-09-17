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

    // this.plantedEggManager = new PlantedEggManager();

    // this.eggHasBeenPlanted = false;

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

			this.hasBeenPlayedOnce = true;
		}
		
		//if (this.ranOutOfTime && isTouched)
		if (isOutOfTime && isTouched)
		{
			console.log(this.background.pheremoneGapManager);
			console.log(this.background);

			
			timeToReturnWithLeaves = this.timeLeft;
			
			badFungusFromLeaves = 200 - defenseGame.background.fungusTallyDiv.tallyOfEatenFungusSpores;
			
			infectedAntsReturning = defenseGame.background.bigAntTallyOfInfections;
			
			// for (let i = 0; i < defenseGame.arrayOfTimeouts.length; i++) 
			// 	{clearTimeout(defenseGame.arrayOfTimeouts[i]);};

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
		this.timeLeft = 10;
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


		this.parentAntObject.leafWidth = this.parentAntObject.bigAntWidth*0.7;
		this.parentAntObject.leafHeight = this.parentAntObject.bigAntHeight*2;
		this.parentAntObject.leafX = this.parentAntObject.bigAntX + this.parentAntObject.bigAntWidth*0.55;
		this.parentAntObject.leafY = this.parentAntObject.bigAntY + this.parentAntObject.bigAntHeight/2 - this.parentAntObject.leafHeight*1.05;

		this.NPCBigAnt1.bigAntX = firstBigAntX - bigAntWidth; 
		this.NPCBigAnt1.leafWidth = this.NPCBigAnt1.bigAntWidth*0.7;
		this.NPCBigAnt1.leafHeight = this.NPCBigAnt1.bigAntHeight*2;
		this.NPCBigAnt1.leafX = this.NPCBigAnt1.bigAntX + this.NPCBigAnt1.bigAntWidth*0.55;
		this.NPCBigAnt1.leafY = this.NPCBigAnt1.bigAntY + this.NPCBigAnt1.bigAntHeight/2 - this.NPCBigAnt1.leafHeight*1.05;
		
		this.NPCBigAnt2.bigAntX = renderer.canvas.width - renderer.canvas.width*0.33;
		this.NPCBigAnt2.leafWidth = this.NPCBigAnt2.bigAntWidth*0.7;
		this.NPCBigAnt2.leafHeight = this.NPCBigAnt2.bigAntHeight*2;
		this.NPCBigAnt2.leafX = this.NPCBigAnt2.bigAntX + this.NPCBigAnt2.bigAntWidth*0.55;
		this.NPCBigAnt2.leafY = this.NPCBigAnt2.bigAntY + this.NPCBigAnt2.bigAntHeight/2 - this.NPCBigAnt2.leafHeight*1.05;

		this.NPCBigAntNegative1.bigAntX = firstBigAntX - (bigAntWidth*2);
		this.NPCBigAntNegative1.leafWidth = this.NPCBigAntNegative1.bigAntWidth*0.7;
		this.NPCBigAntNegative1.leafHeight = this.NPCBigAntNegative1.bigAntHeight*2;
		this.NPCBigAntNegative1.leafX = this.NPCBigAntNegative1.bigAntX + this.NPCBigAntNegative1.bigAntWidth*0.55;
		this.NPCBigAntNegative1.leafY = this.NPCBigAntNegative1.bigAntY + this.NPCBigAntNegative1.bigAntHeight/2 - this.NPCBigAntNegative1.leafHeight*1.05;

		this.NPCBigAntNegative2.bigAntX = firstBigAntX - (bigAntWidth*3);
		this.NPCBigAntNegative2.leafWidth = this.NPCBigAntNegative2.bigAntWidth*0.7;
		this.NPCBigAntNegative2.leafHeight = this.NPCBigAntNegative2.bigAntHeight*2;
		this.NPCBigAntNegative2.leafX = this.NPCBigAntNegative2.bigAntX + this.NPCBigAntNegative2.bigAntWidth*0.55;
		this.NPCBigAntNegative2.leafY = this.NPCBigAntNegative2.bigAntY + this.NPCBigAntNegative2.bigAntHeight/2 - this.NPCBigAntNegative2.leafHeight*1.05;

		this.NPCBigAntNegative3.bigAntX = firstBigAntX - (bigAntWidth*4);
		this.NPCBigAntNegative3.leafWidth = this.NPCBigAntNegative3.bigAntWidth*0.7;
		this.NPCBigAntNegative3.leafHeight = this.NPCBigAntNegative3.bigAntHeight*2;
		this.NPCBigAntNegative3.leafX = this.NPCBigAntNegative3.bigAntX + this.NPCBigAntNegative3.bigAntWidth*0.55;
		this.NPCBigAntNegative3.leafY = this.NPCBigAntNegative3.bigAntY + this.NPCBigAntNegative3.bigAntHeight/2 - this.NPCBigAntNegative3.leafHeight*1.05;

		this.bigAntManager.arrayOfBigAnts = [this.parentAntObject,this.NPCBigAnt1,this.NPCBigAntNegative1,
											this.NPCBigAntNegative2,this.NPCBigAntNegative3];
		this.bigAntManager.currentIndex = 0;
		this.bigAntManager.currentActiveAnt = defenseGame.parentAntObject;
		//this.parentAntObject.initializeArrayOfFungusSpores();
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

		for (let i = 0; i < defenseGame.bigAntManager.arrayOfBigAnts.length; i++)
		{
			let bigAntAnimation = setInterval(function() {defenseGame.bigAntManager.arrayOfBigAnts[i].cycleBigAntImages()},100);
			defenseGame.arrayOfIntervals.push(bigAntAnimation);
		}

		let NPCBigAnt2Animation = setInterval(function() {defenseGame.NPCBigAnt2.cycleBigAntImages()},100);
		defenseGame.arrayOfIntervals.push(NPCBigAnt2Animation);

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