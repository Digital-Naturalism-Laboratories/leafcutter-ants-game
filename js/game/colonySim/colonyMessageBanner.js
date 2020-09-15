INFECTION = "ALERT: PHORID FLY INFECTION!";

class ColonyMessageBanner {
    constructor() {
        this.isActive = false;
        this.bannerHeight = 20 * pixelSize;
        this.bannerPosY = gameHeight * 0.60;
        this.message = INFECTION;
        this.messages = [];
    }

    update(){

        this.bannerHeight = 20 * pixelSize;
        this.bannerPosY = gameHeight * 0.80;

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
            this.messages.push (string_GENETIC_DIVERSITY_FROM_MATING[currentLanguage] + Math.floor(colony.geneticDiversity * 100) + "%");
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
        for (var i = 1; i <= this.messages.length; i++){
            //renderer.fillRect(0, this.bannerPosY - (42 * (i + 1)) + (20 * i) * pixelSize, gameWidth, this.bannerHeight);
            renderer.fillRect(0, this.bannerPosY - (this.bannerHeight * (i + 1)), gameWidth, this.bannerHeight - 2);
        }

        //draw banner text
        renderer.font = (24 * pixelSize) + "px SmallBoldPixel";
        renderer.fillStyle = 'red';
        renderer.textAlign = 'center';
        for (var i = 0; i < this.messages.length; i++){
            renderer.fillText (this.messages[i], gameWidth / 2, this.bannerPosY - (6 * pixelSize) - (this.bannerHeight * (i + 1)));
        }

    }

}