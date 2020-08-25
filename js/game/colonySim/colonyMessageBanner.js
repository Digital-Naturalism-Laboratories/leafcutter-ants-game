INFECTION = "ALERT: PHORID FLY INFECTION!";

class ColonyMessageBanner {
    constructor() {
        this.isActive = false;
        this.bannerHeight = 20 * pixelSize;
        this.bannerPosY = gameHeight * 0.80;
        this.message = INFECTION;
        this.messages = [];
    }

    update(){
        this.messages = [];

        if (leafMaterial > 0){
            this.messages.push(string_LEAF_BONUS[currentLanguage] + leafMaterial + "mg")
        } 

        if (badFungusFromLeaves > 0){
            this.messages.push(string_CONTAMINATED_FUNGUS_RETURNED[currentLanguage] + badFungusFromLeaves + "mg");
        }

        if (timeToReturnWithLeaves > 0){
            this.messages.push(string_TIME_BONUS_FOR_RETURNING_WITH_LEAVES[currentLanguage] + timeToReturnWithLeaves);
        }

        if (infectedAntsReturning > 0){
            this.messages.push(string_PARASITE_INFECTIONS[currentLanguage] + infectedAntsReturning);
        }

        if (colony.geneticDiversity > 0){
            this.messages.push (string_GENETIC_DIVERSITY_FROM_MATING[currentLanguage] + colony.geneticDiversity * 100 + "%");
        }

        if (this.messages.length > 0){
            this.isActive = true;
        } else {
            this.isActive = false;
        }

    }

    draw() {
        if (!this.isActive) return;

        //draw banner background
        renderer.fillStyle = 'orange';
        //renderer.fillRect(0, this.bannerPosY - 50 * pixelSize, gameWidth, this.bannerHeight);
        for (var i = 0; i < this.messages.length; i++){
            renderer.fillRect(0, this.bannerPosY - (50 * (i + 1)) + (20 * i) * pixelSize, gameWidth, this.bannerHeight);
        }

        //draw banner text
        renderer.font = (24 * pixelSize) + "px SmallBoldPixel";
        renderer.fillStyle = 'red';
        renderer.textAlign = 'center';
        for (var i = 0; i < this.messages.length; i++){
            renderer.fillText (this.messages[i], gameWidth / 2, this.bannerPosY - this.bannerHeight - (20 * i));
        }
        //renderer.fillText (this.message, gameWidth / 2, this.bannerPosY - this.bannerHeight);
    }
}