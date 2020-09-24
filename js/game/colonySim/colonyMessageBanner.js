class ColonyMessageBanner {
    constructor() {
        this.isActive = true;
        this.bannerHeight = 20 * pixelSize;
        this.bannerPosY = gameHeight * 0.60;
        this.messages = [];
        this.bannerDisplayDuration = 600;
        this.bannerDisplayTimer = 0;

        this.leafMaterial;
        this.badFungusFromLeaves;
        this.timeToReturnWithLeaves;
        this.infectedAntsReturning;
    }

    update() {

        this.bannerHeight = 20 * pixelSize;
        this.bannerPosY = gameHeight * 0.80;

        this.messages = [];

        if (leafMaterial > 0) this.leafMaterial = leafMaterial;
        if (badFungusFromLeaves > 0) this.badFungusFromLeaves = badFungusFromLeaves;
        if (timeToReturnWithLeaves > 0) this.timeToReturnWithLeaves = timeToReturnWithLeaves;
        if (infectedAntsReturning > 0) this.infectedAntsReturning = infectedAntsReturning;

        if (this.leafMaterial > 0) {
            this.messages.push(string_LEAF_BONUS[currentLanguage] + this.leafMaterial + "mg")
        }

        if (this.badFungusFromLeaves > 0) {
            this.messages.push(string_CONTAMINATED_FUNGUS_RETURNED[currentLanguage] + this.badFungusFromLeaves + "mg");
        }

        if (this.timeToReturnWithLeaves > 0) {
            this.messages.push(string_TIME_BONUS_FOR_RETURNING_WITH_LEAVES[currentLanguage] + timeToReturnWithLeaves);
        }

        if (this.infectedAntsReturning > 0) {
            this.messages.push(string_PARASITE_INFECTIONS[currentLanguage] + this.infectedAntsReturning);
        }

        if (colony.geneticDiversity > 0) {
            this.messages.push(string_GENETIC_DIVERSITY_FROM_MATING[currentLanguage] + Math.floor(colony.geneticDiversity * 100) + "%");
        }

        if (this.isActive) {
            this.bannerDisplayTimer++
        }

        if (this.bannerDisplayTimer >= this.bannerDisplayDuration) {
            this.isActive = false;
            this.messages = [];
        }
    }

    reset() {
        this.isActive = true;
        this.bannerDisplayTimer = 0;
        this.messages = [];
    }

    draw() {

        if (this.messages.length == 0) return;

        //draw banner background
        renderer.fillStyle = 'orange';
        for (var i = 1; i <= this.messages.length; i++) {
            renderer.fillRect(0, this.bannerPosY - (this.bannerHeight * (i + 1)), gameWidth, this.bannerHeight - 2);
        }

        //draw banner text
        renderer.font = (24 * pixelSize) + "px SmallBoldPixel";
        renderer.fillStyle = 'red';
        renderer.textAlign = 'center';
        for (var i = 0; i < this.messages.length; i++) {
            renderer.fillText(this.messages[i], gameWidth / 2, this.bannerPosY - (6 * pixelSize) - (this.bannerHeight * (i + 1)));
        }
    }
}