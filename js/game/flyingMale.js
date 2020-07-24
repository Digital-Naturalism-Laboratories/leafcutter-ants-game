class FlyingMale {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.horizontalSpeed = 1;
        this.verticalSpeed = 2;
        this.sprite = new Sprite(tr(vec2(this.x * pixelSize, this.y * pixelSize), vec2(pixelSize / 4, pixelSize / 4)), new ImageObject("Visual Assets/8bit-queen-right.png", vec2(96, 96)));
        this.movementStates = {
            FLYING: "flying",
            FALLING: "falling"
        }
        this.movementState = this.movementStates.FALLING;
        this.collisionRadius = 10;

        flightGameUI.push(this);
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

        this.sprite.transform.position.x += this.horizontalSpeed;

        if (getDistBtwVec2(flyingQueen.sprite.transform.position, this.sprite.transform.position) < flyingQueen.collisionRadius + this.collisionRadius){
            mateCount++;
            diversityBarLength += 20;
            this.sprite.transform.position.y = 10000;
        } 
        
    }

    draw() {
        renderer.save();
        renderer.translate(-camPanX,0);
        this.sprite.drawSc();
        renderer.restore();
    }
}