INFECTION = "ALERT: PHORID FLY INFECTION!";

class ColonyMessageBanner {
    constructor() {
        this.isActive = false;
        this.bannerHeight = 30 * pixelSize;
        this.bannerPosY = gameHeight * 0.75;
        this.message = INFECTION;
    }

    draw() {
        if (!this.isActive) return;

        //draw banner background
        renderer.fillStyle = 'orange';
        renderer.fillRect(0, this.bannerPosY - 50 * pixelSize, gameWidth, this.bannerHeight);

        //draw banner text
        renderer.font = (30 * pixelSize) + "px SmallBoldPixel";
        renderer.fillStyle = 'red';
        renderer.textAlign = 'center';
        renderer.fillText (this.message, gameWidth / 2, this.bannerPosY - this.bannerHeight);
    }
}