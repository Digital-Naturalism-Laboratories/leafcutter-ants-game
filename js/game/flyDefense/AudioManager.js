function AudioManager()
{
	this.arrayOfAllAudioTags = [];

	this.populateMasterArrayOfAudioTags = function()
	{
		this.arrayOfAllAudioTags.push(bgmIntro,this.ambienceManager.ambienceWash,this.ambienceManager.scatteredBirdChirp,
		this.ambienceManager.cicada1,this.ambienceManager.cicada2,this.ambienceManager.cicada3,this.ambienceManager.cicada4,
		this.sfxManager.stuckSwarmAlertSound,this.sfxManager.beefUpTrailFeedback,this.sfxManager.antInfectionSound,
		this.sfxManager.eatingFungusSound1,this.sfxManager.eatingFungusSound2,this.sfxManager.eatingFungusSound3,
		this.sfxManager.flyChasedSound1,this.sfxManager.flyChasedSound2,this.sfxManager.flyChasedSound3,
		this.sfxManager.pheremoneGapTouchedSound1,this.sfxManager.pheremoneGapTouchedSound2,this.sfxManager.pheremoneGapTouchedSound3,
		this.sfxManager.leafTouchedSound1,this.sfxManager.leafTouchedSound2,this.sfxManager.leafTouchedSound3,
		this.sfxManager.thatDoesNothingSound1,this.sfxManager.thatDoesNothingSound2,this.sfxManager.thatDoesNothingSound3,
		this.sfxManager.flyBuzzingNormal,this.sfxManager.fliesSwarming,this.sfxManager.groundMinimFootsteps,
		this.sfxManager.groundMinimFootstepsAccelerated,this.sfxManager.leafMinimFootsteps,
		this.sfxManager.timeIsAlmostOutClockTickingLoop,

		bgmColony,mainMenuSFX,colonyGameSFX,flyingGameSFX,flyingGameSFXPaths,leafcuttingBGM[0],leafcuttingBGM[1],leafcuttingSFX[0],leafcuttingSFX[1],
		leafcuttingSFX[2],leafcuttingSFX[3],leafcuttingSFX[4],leafcuttingSFX[5],leafcuttingSFX[6],leafcuttingSFX[7]);
	}

	this.arrayOfDefenseGameSounds = [];

	this.populateArrayOfDefenseGameSounds = function()
	{
		this.arrayOfDefenseGameSounds.push(this.ambienceManager.ambienceWash,this.ambienceManager.scatteredBirdChirp,
		this.ambienceManager.cicada1,this.ambienceManager.cicada2,this.ambienceManager.cicada3,this.ambienceManager.cicada4,
		this.sfxManager.stuckSwarmAlertSound,this.sfxManager.beefUpTrailFeedback,this.sfxManager.antInfectionSound,
		this.sfxManager.eatingFungusSound1,this.sfxManager.eatingFungusSound2,this.sfxManager.eatingFungusSound3,
		this.sfxManager.flyChasedSound1,this.sfxManager.flyChasedSound2,this.sfxManager.flyChasedSound3,
		this.sfxManager.pheremoneGapTouchedSound1,this.sfxManager.pheremoneGapTouchedSound2,this.sfxManager.pheremoneGapTouchedSound3,
		this.sfxManager.leafTouchedSound1,this.sfxManager.leafTouchedSound2,this.sfxManager.leafTouchedSound3,
		this.sfxManager.thatDoesNothingSound1,this.sfxManager.thatDoesNothingSound2,this.sfxManager.thatDoesNothingSound3,
		this.sfxManager.flyBuzzingNormal,this.sfxManager.fliesSwarming,this.sfxManager.groundMinimFootsteps,
		this.sfxManager.groundMinimFootstepsAccelerated,this.sfxManager.leafMinimFootsteps,
		this.sfxManager.timeIsAlmostOutClockTickingLoop);
	}

	this.resetFlyDefenseAudio = function()
	{
		for (let i = 0; i < this.arrayOfDefenseGameSounds.length; i++)
		{
			this.arrayOfDefenseGameSounds[i].pause();
			this.arrayOfDefenseGameSounds[i].currentTime = 0;
		}
	}

	this.isMutingEverything = false;
	this.toggleMuteForAllAudioTags = function()
	{
		if (this.isMutingEverything)
		{
			for (let i = 0; i < this.arrayOfAllAudioTags.length; i++)
			{
				this.arrayOfAllAudioTags[i].muted = false;
				this.isMutingEverything = false;
			}
		}
		else
		{
			for (let i = 0; i < this.arrayOfAllAudioTags.length; i++)
			{
				this.arrayOfAllAudioTags[i].muted = true;
				this.isMutingEverything = true;
			}
		}
		
	}

	this.ambienceManager = new AmbienceManager();
	this.sfxManager = new SFXManager();

	this.handleInputFeedbackSounds = function()
	{
		if (defenseGame.background.touchInsidePheremoneGap || defenseGame.background.clickInsidePheremoneGap)
		{
			this.sfxManager.playPheremoneGapTouchedSound();
			defenseGame.background.touchInsidePheremoneGap = false;
			defenseGame.background.clickInsidePheremoneGap = false;
		}
		else if (defenseGame.bigAntManager.currentActiveAnt.touchInsideFungusTangle || defenseGame.bigAntManager.currentActiveAnt.clickInsideFungusTangle)
		{
			this.sfxManager.playLeafTouchedSound();
			defenseGame.bigAntManager.currentActiveAnt.touchInsideFungusTangle = false;
			defenseGame.bigAntManager.currentActiveAnt.clickInsideFungusTangle = false;
		}
		else
		{
			this.sfxManager.playThatDoesNothingSound();
		}
	}
}

function AmbienceManager()
{
	this.ambienceWash = document.createElement('audio');
	this.ambienceWash.setAttribute('src', 'audio/flyDefense/ambience/breeze.mp3');
    this.ambienceWash.loop = true;
    this.ambienceWash.volume = 0.25;

    this.startAmbience = function()
    {
    	console.log('start ambience called');
    	//this.ambienceWash.play();
    	this.playScatteredBirdChirps();
    	this.playScatteredCicadaMultisound();
    }

    this.scatteredBirdChirp = document.createElement('audio');
    this.scatteredBirdChirpInterval = undefined;
    this.scatteredBirdChirp.setAttribute('src', 'audio/flyDefense/ambience/birdChirp.mp3');
    this.scatteredBirdChirp.volume = 0.2;
    this.setBirdChirpScatterInterval = function()
    {
    	this.scatteredBirdChirpInterval = getRandomIntInclusive(5, 14)*1000;
    }

    this.playScatteredBirdChirps = function()
    {
    	this.setBirdChirpScatterInterval();
    	console.log('inside play scattered bird chirp');
    	window.scatteredBirdChirpInterval = 
    	setTimeout
    		(
    		function()

    		{//defenseGame.audioManager.ambienceManager.scatteredBirdChirp.play(); 
    			
    		 defenseGame.audioManager.ambienceManager.setBirdChirpScatterInterval();
    		 defenseGame.audioManager.ambienceManager.playScatteredBirdChirps()}, 

    		defenseGame.audioManager.ambienceManager.scatteredBirdChirpInterval
    		);

    	defenseGame.arrayOfTimeouts.push(window.scatteredBirdChirpInterval);

    }

    this.cicada1 = document.createElement('audio');
    this.cicada1.setAttribute('src', 'audio/flyDefense/ambience/cicada1.mp3');
    this.cicada1.volume = 0.20;
    this.cicada2 = document.createElement('audio');
    this.cicada2.setAttribute('src', 'audio/flyDefense/ambience/cicada2.mp3');
    this.cicada2.volume = 0.20;
    this.cicada3 = document.createElement('audio');
    this.cicada3.setAttribute('src', 'audio/flyDefense/ambience/cicada3.mp3');
    this.cicada3.volume = 0.20;
    this.cicada4 = document.createElement('audio');
    this.cicada4.setAttribute('src', 'audio/flyDefense/ambience/cicada4.mp3');
    this.cicada4.volume = 0.20;

    this.arrayOfCicadaSounds = [this.cicada1,this.cicada2,this.cicada3,this.cicada4];

    this.scatteredCicadaInterval = undefined;
    this.setScatteredCicadaInterval = function()
    {
    	this.scatteredCicadaInterval = getRandomIntInclusive(5, 14)*1000;
    }

    this.playScatteredCicadaMultisound = function()
    {
    	this.setScatteredCicadaInterval();

    	window.scatteredCicadaInterval = 
    	setTimeout
    	(
    		function()

    		{
    			let randomCicadaSoundArrayIndex = getRandomIntInclusive(0,defenseGame.audioManager.ambienceManager.arrayOfCicadaSounds.length - 1);
    			//defenseGame.audioManager.ambienceManager.arrayOfCicadaSounds[randomCicadaSoundArrayIndex].play(); 
    			
    		 defenseGame.audioManager.ambienceManager.setScatteredCicadaInterval();
    		 defenseGame.audioManager.ambienceManager.playScatteredCicadaMultisound()}, 

    		defenseGame.audioManager.ambienceManager.scatteredCicadaInterval
    	);

    	defenseGame.arrayOfTimeouts.push(window.scatteredCicadaInterval);
    }

}

function SFXManager()
{
	//normal loops
	this.stuckSwarmAlertSound = document.createElement('audio');
	this.stuckSwarmAlertSound.setAttribute('src', 'audio/flyDefense/pheremoneGapSwarmAlert.mp3');
	this.stuckSwarmAlertSound.loop = true;
	this.stuckSwarmAlertSound.volume = 0.05;

	//one shots
	this.beefUpTrailFeedback = document.createElement('audio');
	this.beefUpTrailFeedback.setAttribute('src', 'audio/flyDefense/beefUpTrailFeedback.mp3');

	this.antInfectionSound = document.createElement('audio');
	this.antInfectionSound.setAttribute('src', 'audio/flyDefense/antInfectionSound.mp3');

	//avoid cutoff one shots
	this.eatingFungusSound1 = document.createElement('audio');
	this.eatingFungusSound1.setAttribute('src', 'audio/flyDefense/eatingFungus.mp3');
	this.eatingFungusSound1.volume = 0.1;
	this.eatingFungusSound2 = document.createElement('audio');
	this.eatingFungusSound2.setAttribute('src', 'audio/flyDefense/eatingFungus.mp3');
	this.eatingFungusSound2.volume = 0.1;
	this.eatingFungusSound3 = document.createElement('audio');
	this.eatingFungusSound3.setAttribute('src', 'audio/flyDefense/eatingFungus.mp3');
	this.eatingFungusSound3.volume = 0.1;
	this.eatingFungusSoundArrayIndex = 0;
	this.arrayOfEatingFungusSounds = [];

	this.populateArrayOfEatingFungusSounds = function()
	{
		this.arrayOfEatingFungusSounds.push(this.eatingFungusSound1,this.eatingFungusSound2,this.eatingFungusSound3);
	}

	this.playEatingFungusSound = function()
	{
		//this.arrayOfEatingFungusSounds[this.eatingFungusSoundArrayIndex].play();
		this.eatingFungusSoundArrayIndex++;
		if (this.eatingFungusSoundArrayIndex > this.arrayOfEatingFungusSounds.length - 1)
		{
			this.eatingFungusSoundArrayIndex = 0;
		}
	}

	this.flyChasedSound1 = document.createElement('audio');
	this.flyChasedSound1.setAttribute('src', 'audio/flyDefense/flyChasedFeedback.mp3');
	this.flyChasedSound1.volume = 0.1;
	this.flyChasedSound2 = document.createElement('audio');
	this.flyChasedSound2.setAttribute('src', 'audio/flyDefense/flyChasedFeedback.mp3');
	this.flyChasedSound2.volume = 0.1;
	this.flyChasedSound3 = document.createElement('audio');
	this.flyChasedSound3.setAttribute('src', 'audio/flyDefense/flyChasedFeedback.mp3');
	this.flyChasedSound3.volume = 0.1;
	this.flyChasedSoundArrayIndex = 0;
	this.arrayOfFlyChasedSounds = [];

	this.populateArrayOfFlyChasedSounds = function()
	{
		this.arrayOfFlyChasedSounds.push(this.flyChasedSound1,this.flyChasedSound2,this.flyChasedSound3);
	}

	this.playFlyChasedSound = function()
	{
		//this.arrayOfFlyChasedSounds[this.flyChasedSoundArrayIndex].play();
		this.flyChasedSoundArrayIndex++;
		if (this.flyChasedSoundArrayIndex > this.arrayOfFlyChasedSounds.length - 1)
		{
			this.flyChasedSoundArrayIndex = 0;
		}
	}

	//touch feedback sounds
	this.pheremoneGapTouchedSound1 = document.createElement('audio');
	this.pheremoneGapTouchedSound1.setAttribute('src', 'audio/flyDefense/touchedPheremoneGapSound.mp3');
    this.pheremoneGapTouchedSound1.volume = 0.1;
    this.pheremoneGapTouchedSound2 = document.createElement('audio');
	this.pheremoneGapTouchedSound2.setAttribute('src', 'audio/flyDefense/touchedPheremoneGapSound.mp3');
    this.pheremoneGapTouchedSound2.volume = 0.1;
	this.pheremoneGapTouchedSound3 = document.createElement('audio');
	this.pheremoneGapTouchedSound3.setAttribute('src', 'audio/flyDefense/touchedPheremoneGapSound.mp3');
    this.pheremoneGapTouchedSound3.volume = 0.1;
    this.arrayOfPheremoneGapTouchedSoundsIndex = 0;
    this.arrayOfPheremoneGapTouchedSounds = [this.pheremoneGapTouchedSound1,this.pheremoneGapTouchedSound2,this.pheremoneGapTouchedSound3];


    this.playPheremoneGapTouchedSound = function()
	{
		//this.arrayOfPheremoneGapTouchedSounds[this.arrayOfPheremoneGapTouchedSoundsIndex].play();
		this.arrayOfPheremoneGapTouchedSoundsIndex++;
		if (this.arrayOfPheremoneGapTouchedSoundsIndex > this.arrayOfPheremoneGapTouchedSounds.length - 1)
		{
			this.arrayOfPheremoneGapTouchedSoundsIndex = 0;
		}
	}

    this.leafTouchedSound1 = document.createElement('audio');
	this.leafTouchedSound1.setAttribute('src', 'audio/flyDefense/touchedLeafSound.mp3');
    this.leafTouchedSound1.volume = 0.15;
    this.leafTouchedSound2 = document.createElement('audio');
	this.leafTouchedSound2.setAttribute('src', 'audio/flyDefense/touchedLeafSound.mp3');
    this.leafTouchedSound2.volume = 0.15;
    this.leafTouchedSound3 = document.createElement('audio');
	this.leafTouchedSound3.setAttribute('src', 'audio/flyDefense/touchedLeafSound.mp3');
    this.leafTouchedSound3.volume = 0.15;
    this.arrayOfLeafTouchedSoundsIndex = 0;
    this.arrayOfLeafTouchedSounds = [this.leafTouchedSound1,this.leafTouchedSound2,this.leafTouchedSound3];
    this.playLeafTouchedSound = function()
    {
    	//this.arrayOfLeafTouchedSounds[this.arrayOfLeafTouchedSoundsIndex].play();
		this.arrayOfLeafTouchedSoundsIndex++;
		if (this.arrayOfLeafTouchedSoundsIndex > this.arrayOfLeafTouchedSounds.length - 1)
		{
			this.arrayOfLeafTouchedSoundsIndex = 0;
		}
    }

    this.thatDoesNothingSound1 = document.createElement('audio');
	this.thatDoesNothingSound1.setAttribute('src', 'audio/flyDefense/thatDoesNothing.mp3');
    this.thatDoesNothingSound1.volume = 0.1;
    this.thatDoesNothingSound2 = document.createElement('audio');
	this.thatDoesNothingSound2.setAttribute('src', 'audio/flyDefense/thatDoesNothing.mp3');
    this.thatDoesNothingSound2.volume = 0.1;
    this.thatDoesNothingSound3 = document.createElement('audio');
	this.thatDoesNothingSound3.setAttribute('src', 'audio/flyDefense/thatDoesNothing.mp3');
    this.thatDoesNothingSound3.volume = 0.1;
	this.arrayOfThatDoesNothingSoundsIndex = 0;
    this.arrayOfThatDoesNothingSounds = [this.thatDoesNothingSound1,this.thatDoesNothingSound2,this.thatDoesNothingSound3];
    this.playThatDoesNothingSound = function()
    {
    	//this.arrayOfThatDoesNothingSounds[this.arrayOfThatDoesNothingSoundsIndex].play();
		this.arrayOfThatDoesNothingSoundsIndex++;
		if (this.arrayOfThatDoesNothingSoundsIndex > this.arrayOfThatDoesNothingSounds.length - 1)
		{
			this.arrayOfThatDoesNothingSoundsIndex = 0;
		}
    }

	//loops that need adjusted loop points
	this.flyBuzzingNormal = document.createElement('audio');
	this.flyBuzzingNormal.setAttribute('src', 'audio/flyDefense/flyBuzzingNormal.mp3');
	this.flyBuzzingNormal.loop = true;
	this.flyBuzzingNormal.volume = 0.03;

	this.fliesSwarming = document.createElement('audio');
	this.fliesSwarming.setAttribute('src', 'audio/flyDefense/fliesSwarming.mp3');
	this.fliesSwarming.loop = true;
	this.fliesSwarming.volume = 0.2;

	this.groundMinimFootsteps = document.createElement('audio');
	this.groundMinimFootsteps.setAttribute('src', 'audio/flyDefense/groundMinimFootsteps.mp3');
	this.groundMinimFootsteps.loop = true;
	this.groundMinimFootsteps.volume = 0.2;

	this.groundMinimFootstepsAccelerated = document.createElement('audio');
	this.groundMinimFootstepsAccelerated.setAttribute('src', 'audio/flyDefense/groundMinimFootstepsAccelerated.mp3');
	this.groundMinimFootstepsAccelerated.loop = true;
	this.groundMinimFootstepsAccelerated.volume = 0.25;

	this.leafMinimFootsteps = document.createElement('audio');
	this.leafMinimFootsteps.setAttribute('src', 'audio/flyDefense/leafMinimFootsteps.mp3');
	this.leafMinimFootsteps.loop = true;
	this.leafMinimFootsteps.playbackRate = 1;
	this.leafMinimFootsteps.volume = 0.2;

	this.timeIsAlmostOutClockTickingLoop = document.createElement('audio');
	this.timeIsAlmostOutClockTickingLoop.setAttribute('src', 'audio/flyDefense/clockTickingLoop.mp3');
	this.timeIsAlmostOutClockTickingLoop.loop = true;
	this.timeIsAlmostOutClockTickingLoop.volume = 0.2;

	this.arrayOfLoopSoundsToBeLoopedBeforeAwkwardSilence = 
	[
		this.flyBuzzingNormal, this.fliesSwarming, this.groundMinimFootsteps, this.groundMinimFootstepsAccelerated, 
		this.leafMinimFootsteps, this.timeIsAlmostOutClockTickingLoop
	]

	this.calculateAndSetAvoidAwkwardSilenceTimestamps = function()
	{
		for (let i = 0; i < this.arrayOfLoopSoundsToBeLoopedBeforeAwkwardSilence.length; i++)
		{
			let awkwardSilenceTimestamp = this.arrayOfLoopSoundsToBeLoopedBeforeAwkwardSilence[i].duration - 0.2;

			this.arrayOfLoopSoundsToBeLoopedBeforeAwkwardSilence[i].awkwardSilenceTimestamp = awkwardSilenceTimestamp;
		}
	}

	this.avoidAwkwardSilenceForLoopedAudioFiles = function()
	{
		for (let i = 0; i < this.arrayOfLoopSoundsToBeLoopedBeforeAwkwardSilence.length; i++)
		{
			
			if (this.arrayOfLoopSoundsToBeLoopedBeforeAwkwardSilence[i].currentTime >= this.arrayOfLoopSoundsToBeLoopedBeforeAwkwardSilence[i].awkwardSilenceTimestamp)
			{
				this.arrayOfLoopSoundsToBeLoopedBeforeAwkwardSilence[i].currentTime = 0.2;
				
			}
		}
	}
}