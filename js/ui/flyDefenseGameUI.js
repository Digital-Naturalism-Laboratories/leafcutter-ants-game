const DEFENSEGAMEUI = 4;
var defenseGame = {};

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
	this.decreaseCounter = function() 
	{
		if(ui.stateIndex == DEFENSEGAMEINTROUI)
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
				badFungusFromLeaves = 200 - this.fungusTallyDiv.tallyOfEatenFungusSpores;
				infectedAntsReturning = defenseGame.background.bigAntTallyOfInfections;
				ui.stateIndex = COLONYGAMEINTROUI;
			}
		}
	};
    this.countdownInterval = new frameInterval(defenseGame.decreaseCounter,1000);


    this.audioManager = new AudioManager();
    
    


    //background section
	defenseGame.background = new Background();
	defenseGame.background.initialize();

	this.muteButton = new flyDefenseMuteButton();
    this.muteButton.initialize();

    this.fullScreenButton = new defenseGameFullScreenButton();


	//center ant with the controllable minim
	this.parentAntObject = new ParentAntObject();
	this.parentAntObject.initialize();

	//non controlled ants, just there to show the player that ants work in lines
	this.NPCBigAnt1 = new NPCBigAnt(-renderer.canvas.width*0.33)
	this.NPCBigAnt2 = new NPCBigAnt(renderer.canvas.width - renderer.canvas.width*0.33);
	this.NPCBigAnt1.initialize();
	this.NPCBigAnt2.initialize();

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

	this.events = function()
	{
		// console.log('inside custom events');
	}

	this.update = function()
	{
		defenseGame.background.update();
		defenseGame.background.pheremoneGapManager.updatePheremoneGaps();

		this.flyManager.updateFlies();
		this.parentAntObject.update();

		if (defenseGame.background.stuckOnPheremoneGap === false)
		{
			
			defenseGame.background.pheremoneGapManager.checkForGettingStuckOnPheremoneGaps();
		}
		
		this.groundMinimManager.updateGroundMinims();
		this.groundMinimManager.checkIfAllGroundMinimsHaveReachedPheremoneGap();

		if (this.timeLeft === 0 && this.parentAntObject.arrayOfFungusSpores.length > 0)
	    {
	      //alert("You're leaf is still fungusy. You Lose!");
	    }
	    else if (this.timeLeft === 0 && this.parentAntObject.arrayOfFungusSpores.length === 0)
	    {
	      //alert("You made it back without being infected and with a clean leaf. You win!");
	    }

	    this.audioManager.sfxManager.avoidAwkwardSilenceForLoopedAudioFiles();
	}

	renderer.save();
	renderer.font = '30px Pixelmania';
	this.timeLabelWidth = renderer.measureText('120').width;
	renderer.restore();
	
	this.draw = function()
	{
		
				//console.log('inside draw function of defense game');
			defenseGame.background.draw();
			
			
			

			this.NPCBigAnt1.draw();
			this.NPCBigAnt2.draw();
			defenseGame.parentAntObject.draw();
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
			renderer.font = '75px SmallBoldPixel';
		  	renderer.fillText('TIME LEFT: ' + timerNumberConvertedToString, renderer.canvas.width * 0.01,renderer.canvas.height * 0.25);

			if (this.colonyReached)
			{
				renderer.fillStyle = 'white';
				let fontSize = 150;
				let stringedFontSize = fontSize.toString();
				renderer.font = stringedFontSize + 'px SmallBoldPixel';
				let colonyReachedText = 'COLONY REACHED!';
				let colonyReachedTextWidth = renderer.measureText(colonyReachedText).width;
				renderer.fillText(colonyReachedText, renderer.canvas.width/2 - colonyReachedTextWidth/2,
													 renderer.canvas.height/2 - fontSize/2);
				if (isTouched) {
					timeToReturnWithLeaves = this.timeLeft;
					badFungusFromLeaves = 200 - defenseGame.background.fungusTallyDiv.tallyOfEatenFungusSpores;
					infectedAntsReturning = defenseGame.background.bigAntTallyOfInfections;
					ui.stateIndex = COLONYGAMEINTROUI;
				}
			}

		
			this.muteButton.draw();
			//this.fullScreenButton.draw();
		
	}//end of draw

	// this.startingWhatAboutMeImageWidth = 300;
	// this.currentWhatAboutMeImageWidth = 300;
	// this.startingWhatAboutMeImageHeight = 300;
	// this.currentWhatAboutMeImageHeight = 300;
	// this.increaseWhatAboutMeDimensions = function()
	// {
	// 	let _this = this;
	// 	console.log('inside increaseWhatAboutMeDimensions');
	// 	console.log('this.currentWhatAboutMeImageWidth: ' + this.currentWhatAboutMeImageWidth);
	// 	if (this.currentWhatAboutMeImageWidth < 900)
	// 	{
	// 		this.currentWhatAboutMeImageWidth = this.currentWhatAboutMeImageWidth + this.startingWhatAboutMeImageWidth;
	// 		this.currentWhatAboutMeImageHeight = this.currentWhatAboutMeImageHeight + this.startingWhatAboutMeImageHeight;
	// 	}
	// }
}
