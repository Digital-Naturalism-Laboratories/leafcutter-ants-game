class ColonyWingedMale {
    constructor(col, row) {

        this.gridCoord = {
            col: col,
            row: row
        }
        this.pixelCoord = pixelCoordAtCenterOfTileCoord(col, row);

        this.sprite = new Sprite(tr(this.pixelCoord, vec2(pixelSize * 0.2, pixelSize * 0.2)), new ImageObject("images/Animations/Male_Ant_Flying_Spritesheet.png", vec2(0, 0)));
        this.currentFacing = FACING_RIGHT;
        this.speed = (Math.random() - 0.5) * 0.5;

        this.inSize = {
            x: 250,
            y: 242
        }

        this.animationFrameLength = 4;
        this.animationFrameCount = 1;
        this.animationFrameCurrent = 0;
        this.animationTimer = 0;

        colonyWingedMales.push(this);
    }

    event() {

    }

    update() {

        var nextTileCol = colAtXCoord((this.pixelCoord.x + this.speed) / pixelSize);
        var nextTileRow = rowAtYCoord((this.pixelCoord.y + this.speed) / pixelSize);

        if (colonyGridTileMap[nextTileRow][nextTileCol] == COLONY_WALL ||
            colonyGridNodes[nextTileRow][nextTileCol].isTunneled === false) {

            this.speed *= -1;

        }

        this.currentFacing = this.speed >= 0 ? FACING_RIGHT : FACING_LEFT;

        this.pixelCoord.x += this.speed;
    }

    resize() {

        this.pixelCoord = resizeVec2(this.pixelCoord);

    }

    draw() {

        this.animateSprite(this.sprite, this.animationFrameLength, this.animationFrameCount, this.inSize);

        //display grid coord for debugging
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
        
        this.animationFrameCurrent = this.currentFacing == FACING_RIGHT ? 0 : 19;

        this.animationTimer++
        animationSprite.drawScIn(inPos, inSize);

    }
}