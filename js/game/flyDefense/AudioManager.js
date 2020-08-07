function AudioManager()
{
	this.ambienceManager = new AmbienceManager();
	this.sfxManager = new SFXManager();
}

function AmbienceManager()
{
	this.ambienceWash = document.createElement('audio');
	this.ambienceWash.setAttribute('src', 'audio/flyDefense/ambience/breeze.mp3');
    this.ambienceWash.loop = true;
    this.ambienceWash.volume = 0.3;

    this.startAmbience = function()
    {
    	this.ambienceWash.play();
    	this.playScatteredBirdChirps();
    	this.playScatteredCicadaMultisound();
    }

    this.scatteredBirdChirp = document.createElement('audio');
    this.scatteredBirdChirpInterval = undefined;
    this.scatteredBirdChirp.setAttribute('src', 'audio/flyDefense/ambience/birdChirp.mp3');
    this.scatteredBirdChirp.volume = 0.15;
    this.setBirdChirpScatterInterval = function()
    {
    	this.scatteredBirdChirpInterval = getRandomIntInclusive(5, 14)*1000;
    }

    this.playScatteredBirdChirps = function()
    {
    	this.setBirdChirpScatterInterval();
    	
    	setTimeout
    		(
    		function()

    		{defenseGame.audioManager.ambienceManager.scatteredBirdChirp.play(); 
    			
    		 defenseGame.audioManager.ambienceManager.setBirdChirpScatterInterval();
    		 defenseGame.audioManager.ambienceManager.playScatteredBirdChirps()}, 

    		defenseGame.audioManager.ambienceManager.scatteredBirdChirpInterval
    		);

    }

    this.cicada1 = document.createElement('audio');
    this.cicada1.setAttribute('src', 'audio/flyDefense/ambience/cicada1.mp3');
    this.cicada1.volume = 0.15;
    this.cicada2 = document.createElement('audio');
    this.cicada2.setAttribute('src', 'audio/flyDefense/ambience/cicada2.mp3');
    this.cicada2.volume = 0.15;
    this.cicada3 = document.createElement('audio');
    this.cicada3.setAttribute('src', 'audio/flyDefense/ambience/cicada3.mp3');
    this.cicada3.volume = 0.15;
    this.cicada4 = document.createElement('audio');
    this.cicada4.setAttribute('src', 'audio/flyDefense/ambience/cicada4.mp3');
    this.cicada4.volume = 0.15;

    this.arrayOfCicadaSounds = [this.cicada1,this.cicada2,this.cicada3,this.cicada4];

    this.scatteredCicadaInterval = undefined;
    this.setScatteredCicadaInterval = function()
    {
    	this.scatteredCicadaInterval = getRandomIntInclusive(5, 14)*1000;
    }

    this.playScatteredCicadaMultisound = function()
    {
    	this.setScatteredCicadaInterval();

    	setTimeout
    	(
    		function()

    		{
    			let randomCicadaSoundArrayIndex = getRandomIntInclusive(0,defenseGame.audioManager.ambienceManager.arrayOfCicadaSounds.length - 1);
    			defenseGame.audioManager.ambienceManager.arrayOfCicadaSounds[randomCicadaSoundArrayIndex].play(); 
    			
    		 defenseGame.audioManager.ambienceManager.setScatteredCicadaInterval();
    		 defenseGame.audioManager.ambienceManager.playScatteredCicadaMultisound()}, 

    		defenseGame.audioManager.ambienceManager.scatteredCicadaInterval
    	);
    }

}

function SFXManager()
{
	//normal loops
	this.stuckSwarmAlertSound = document.createElement('audio');
	this.stuckSwarmAlertSound.setAttribute('src', 'audio/flyDefense/pheremoneGapSwarmAlert.mp3');
	this.stuckSwarmAlertSound.loop = true;
	this.stuckSwarmAlertSound.volume = 0.5;

	//one shots
	this.beefUpTrailFeedback = document.createElement('audio');
	this.beefUpTrailFeedback.setAttribute('src', 'audio/flyDefense/beefUpTrailFeedback.mp3');

	//avoid cutoff one shots
	this.eatingFungusSound1 = document.createElement('audio');
	this.eatingFungusSound1.setAttribute('src', 'audio/flyDefense/eatingFungus.mp3');
	this.eatingFungusSound2 = document.createElement('audio');
	this.eatingFungusSound2.setAttribute('src', 'audio/flyDefense/eatingFungus.mp3');
	this.eatingFungusSound3 = document.createElement('audio');
	this.eatingFungusSound3.setAttribute('src', 'audio/flyDefense/eatingFungus.mp3');
	this.eatingFungusSoundArrayIndex = 0;
	this.arrayOfEatingFungusSounds = [];

	this.populateArrayOfEatingFungusSounds = function()
	{
		this.arrayOfEatingFungusSounds.push(this.eatingFungusSound1,this.eatingFungusSound2,this.eatingFungusSound3);
	}

	this.playEatingFungusSound = function()
	{
		this.arrayOfEatingFungusSounds[this.eatingFungusSoundArrayIndex].play();
		this.eatingFungusSoundArrayIndex++;
		if (this.eatingFungusSoundArrayIndex > this.arrayOfEatingFungusSounds.length - 1)
		{
			this.eatingFungusSoundArrayIndex = 0;
		}
		console.log('this.eatingFungusSoundArrayIndex: ' + this.eatingFungusSoundArrayIndex);
	}

	//loops that need adjusted loop points
	this.flyBuzzingNormal = document.createElement('audio');
	this.flyBuzzingNormal.setAttribute('src', 'audio/flyDefense/flyBuzzingNormal.mp3');
	this.flyBuzzingNormal.loop = true;
	this.flyBuzzingNormal.volume = 0.05;

	this.fliesSwarming = document.createElement('audio');
	this.fliesSwarming.setAttribute('src', 'audio/flyDefense/fliesSwarming.mp3');
	this.fliesSwarming.loop = true;
	this.fliesSwarming.volume = 0.1;

	this.arrayOfLoopSoundsToBeLoopedBeforeAwkwardSilence = 
	[
		this.flyBuzzingNormal, this.fliesSwarming
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