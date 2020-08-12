class FlyingMale {

    constructor() {
        this.x = Math.random() * gameWidth;
        this.y = Math.random() * gameHeight;
        this.horizontalSpeed = (Math.random() * 8) + 0.2 ;
        this.verticalSpeed = (Math.random() * 3) + .25;
        this.sprite = new Sprite(tr(vec2(this.x * pixelSize, this.y * pixelSize), vec2(pixelSize / 4, pixelSize / 4)), new ImageObject("images/Animations/Male_Ant_Flying_Spritesheet.png", vec2(96, 96)));
        this.movementStates = {
            FLYING: "flying",
            FALLING: "falling"
        }
        this.movementState = this.movementStates.FALLING;
        this.collisionRadius = 10;

        flightGameUI.push(this);

        this.animationFrameLength = 2;
        this.animationFrameCount = 20;
        this.animationFrameCurrent = 0;
        this.animationTimer = 0
    }

    event() {

    }

    update() {

        switch (this.movementState) {
            case 'flying':

                if (this.sprite.transform.position.y < (gameHeight * 0.25)){
                    this.movementState = this.movementStates.FALLING;
                }

                if (this.sprite.transform.position.y > 0) {
                    this.sprite.transform.position.y -= this.verticalSpeed;
                }
                break;
            case 'falling':

                if (this.sprite.transform.position.y > (gameHeight * 0.75)){
                    this.movementState = this.movementStates.FLYING;
                }

                if (this.sprite.transform.position.y < gameHeight) {
                    this.sprite.transform.position.y += this.verticalSpeed;
                }
                break;
        }

        if (this.sprite.transform.position.x > gameWidth || this.sprite.transform.position.x < 0){
            this.horizontalSpeed = -this.horizontalSpeed;
        }

        this.sprite.transform.position.x += this.horizontalSpeed;

        if (getDistBtwVec2(flyingQueen.sprite.transform.position, this.sprite.transform.position) < flyingQueen.collisionRadius + this.collisionRadius){
            mateCount++;
            diversityBarLength += 5;
            this.sprite.transform.position.y = 10000;
        }

        for (var i = 0; i < rivalQueens.length; i++){
            if (getDistBtwVec2(rivalQueens[i].sprite.transform.position, this.sprite.transform.position) < rivalQueens[i].collisionRadius + this.collisionRadius){
                this.sprite.transform.position.y = 10000;
            }
        }
        
    }

    draw() {
        renderer.save();
        renderer.translate(-camPanX,0);

        var inSize = {
            x : 250,
            y : 242
        }

        var inPos = {
            x : (this.animationFrameCurrent * inSize.x),
            y : 0
        }

        this.sprite.drawScIn(inPos, inSize);

        if (this.animationTimer > this.animationFrameLength - 1) {
            this.animationFrameCurrent++
            this.animationTimer = 0;
        }

        if (this.animationFrameCurrent >= this.animationFrameCount){
            this.animationFrameCurrent = 0;
        }

        this.animationTimer++;

        renderer.restore();
    }
}