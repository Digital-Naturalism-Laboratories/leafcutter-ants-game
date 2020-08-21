var lastTouchPos;

class Queen {
    constructor(col, row) {

        this.gridCoord = {
            col: col,
            row: row
        }

        this.pixelCoord = pixelCoordAtCenterOfTileCoord(col, row);
        //this.x = this.pixelCoord.x;
        //this.y = this.pixelCoord.y;
        this.speedX = 2;
        this.speedY = 2;
        this.sprite = new Sprite(tr(vec2(this.pixelCoord.x, this.pixelCoord.y - 20 * pixelSize), vec2(pixelSize * 0.4, pixelSize * 0.4)), new ImageObject("Visual Assets/8bit-Queen-no-wings-left.png", vec2(0, 0)));
        this.collisionRadius = 15;

        colonyGameUI.push(this);
    }

    event() {

        if (isTouched) {

            lastTouchPos = {
                x: touchPos[0].x - canvas.getBoundingClientRect().left,
                y: touchPos[0].y - canvas.getBoundingClientRect().top
            }

            if (getDistBtwVec2(this.sprite.transform.position, vec2(lastTouchPos.x, lastTouchPos.y)) < 20) {
                ui.stateIndex = FLIGHTGAMEUI;
            }

        }

    }

    update() {
        /*
        if (this.x < lastTouchPos.x) {
            this.x += this.speedX;
        }

        if (this.x > lastTouchPos.x) {
            this.x -= this.speedX;
        }

        if (this.y < lastTouchPos.y) {
            this.y += this.speedY;
        }

        if (this.y > lastTouchPos.y) {
            this.y -= this.speedY;
        }

        this.y = clamp(this.y, COLONY_H * 3 * pixelSize, gameHeight);

        this.sprite.transform.position.x = this.x;
        this.sprite.transform.position.y = this.y;
        */
    }

    draw() {
        this.sprite.drawSc();
    }

}