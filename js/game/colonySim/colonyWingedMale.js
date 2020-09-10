class ColonyWingedMale {
    constructor(col, row) {

        this.gridCoord = {
            col: col,
            row: row
        }
        this.pixelCoord = pixelCoordAtCenterOfTileCoord(col, row);

        this.sprite = new Sprite(tr(this.pixelCoord, vec2(pixelSize * 0.2, pixelSize * 0.2)), new ImageObject("images/Animations/Male_Ant_Flying_Spritesheet.png", vec2(0, 0)));
        //this.leftWingSprite = new Sprite(tr(this.pixelCoord, vec2(pixelSize * 0.3, pixelSize * 0.3)), new ImageObject("images/wing_left.png", vec2(0, 0)));
        //this.rightWingSprite = new Sprite(tr(this.pixelCoord, vec2(pixelSize * 0.3, pixelSize * 0.3)), new ImageObject("images/wing_right.png", vec2(0, 0)));
        this.currentFacing = FACING_RIGHT;

        this.inSize = {
            x: 250,
            y: 242
        }

        this.animationFrameLength = 4;
        this.animationFrameCount = 1;
        this.animationFrameCurrent = 0;
        this.animationTimer = 0;

        colonyWingedMales.push(this);
        colonyGameUI.push(this);
    }

    event() {

    }

    update() {

    }

    resize() {

        this.pixelCoord = resizeVec2(this.pixelCoord);

    }

    draw() {

        this.animateSprite(this.sprite, this.animationFrameLength, this.animationFrameCount, this.inSize);
        //this.rightWingSprite.drawSc();
        //drawCircle(this.pixelCoord.x, this.pixelCoord.y + (5 * pixelSize), (circleIndicatorTimer / 60) * 20 * pixelSize, 4 * pixelSize, 'green');
        //renderer.fillText(this.gridCoord.col + "," + this.gridCoord.row, this.pixelCoord.x, this.pixelCoord.y)

    }

    animateSprite(sprite, frameLength, framerameCount, inSize) {

        var animationSprite = sprite;
        var animationFrameLength = frameLength;
        var animationFrameCount = framerameCount;
        var inSize = inSize;

        var inPos = {
            x: (this.animationFrameCurrent * this.inSize.x),
            y: (this.inSize.y * this.currentFacing)
        }

        if (this.animationTimer > animationFrameLength - 1) {
            this.animationFrameCurrent++
            this.animationTimer = 0;
        }

        if (this.animationFrameCurrent >= animationFrameCount) {
            this.animationFrameCurrent = 0;
        }

        this.animationTimer++
        animationSprite.drawScIn(inPos, inSize);

    }
}