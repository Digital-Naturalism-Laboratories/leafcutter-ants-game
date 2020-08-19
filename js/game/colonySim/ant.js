class ColonyAnt {
    constructor(col, row) {

        this.gridCoord = {
            col: col,
            row: row
        }

        this.pixelCoord = pixelCoordAtCenterOfTileCoord(col, row);

        this.sprite = new Sprite(tr(vec2(this.pixelCoord.x, this.pixelCoord.y), vec2(pixelSize * 0.25, pixelSize * 0.25)), new ImageObject("images/Animations/Soldier_Topdown_Walk_UpDown_Spritesheet.png", vec2(0, 0)));

        this.speedX = (Math.random() - 0.5) * 3;
        this.speedY = (Math.random() - 0.5) * 3;

        colonyGameUI.push(this);
    }

    event() {

    }

    update() {
        this.pixelCoord.x += this.speedX;
        this.pixelCoord.y += this.speedY;

        this.sprite.transform.position.x = this.pixelCoord.x;
        this.sprite.transform.position.y = this.pixelCoord.y;

        this.XNextFrame = this.pixelCoord.x + this.speedX;
        this.YNextFrame = this.pixelCoord.y + this.speedY;

        this.colNextFrame = colAtXCoord(this.XNextFrame / pixelSize);
        this.rowNextFrame = rowAtYCoord(this.YNextFrame / pixelSize);

        this.gridCoord.col = colAtXCoord(this.pixelCoord.x / pixelSize);
        this.gridCoord.row = rowAtYCoord(this.pixelCoord.y / pixelSize);

        if (colonyGridNodes[this.rowNextFrame][this.colNextFrame] === undefined) {
            this.speedX *= -1;
            this.speedY *= -1;
        } else if (!colonyGridNodes[this.rowNextFrame][this.colNextFrame].isWalkable) {

            this.speedX = (Math.random() - 0.5) * 3;
            this.speedY = (Math.random() - 0.5) * 3;

            //var prevSpeedX = this.speedX;
            //var prevSpeedY = this.speedY;

            //this.speedX = prevSpeedY;
            //this.speedY = prevSpeedX;
        }

    }

    draw() {

        var inSize = {
            x: 150,
            y: 150
        }

        var inPos = {
            //x: (this.animationFrameCurrent * inSize.x),
            x: 0,
            y: 0
        }

        this.sprite.drawScIn(inPos, inSize);
    }
}