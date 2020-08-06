function AudioManager()
{
	this.ambienceManager = new AmbienceManager();

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
    			console.log('should be hearing bird chirp');
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
    			console.log('should be hearing cicada');
    		 defenseGame.audioManager.ambienceManager.setScatteredCicadaInterval();
    		 defenseGame.audioManager.ambienceManager.playScatteredCicadaMultisound()}, 

    		defenseGame.audioManager.ambienceManager.scatteredCicadaInterval
    	);
    }

}