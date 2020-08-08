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
	this.timeLeft = 30;
	this.decreaseCounter = function() 
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
	      }

	};
    this.countdownInterval = new frameInterval(defenseGame.decreaseCounter,1000);


    this.audioManager = new AudioManager();
    
    

    //background section
	defenseGame.background = new Background();
	defenseGame.background.initialize();



	//center ant with the controllable minim
	this.parentAntObject = new ParentAntObject();
	this.parentAntObject.initialize();

	//non controlled ants, just there to show the player that ants work in lines
	this.NPCBigAnt1 = new NPCBigAnt(-renderer.canvas.width*0.33)
	this.NPCBigAnt2 = new NPCBigAnt(renderer.canvas.width - renderer.canvas.width*0.33);


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

    this.eggHasBeenPlanted = false;

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

	this.draw = function()
	{
		//console.log('inside draw function of defense game');
		defenseGame.background.draw();
		defenseGame.parentAntObject.draw();
		

		this.NPCBigAnt1.draw();
		this.NPCBigAnt2.draw();

		
		this.groundMinimManager.drawGroundMinims();

		renderer.font = '60px Helvetica';
      	let timerNumberConvertedToString = defenseGame.timeLeft.toString();
      	renderer.fillText(timerNumberConvertedToString, renderer.canvas.width * 0.85,renderer.canvas.height * 0.2);

		this.flyManager.drawFlies();
	}
}
