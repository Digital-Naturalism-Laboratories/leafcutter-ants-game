class FlyingMale {

    constructor() {
        do {
            this.x = Math.random() * gameWidth;
            this.y = Math.random() * gameHeight;
        } while (getDistBtwVec2(flyingQueen.defaultPos, vec2(this.x, this.y)) < 200 * pixelSize);

        this.horizontalSpeed = (Math.random() * 8) + 0.2;
        this.verticalSpeed = (Math.random() * 3) + .25;
        this.direction = 0;
        this.sprite = new Sprite(tr(vec2(this.x, this.y), vec2(pixelSize / 3, pixelSize / 3)), new ImageObject("images/Animations/Male_Ant_Flying_Spritesheet.png", vec2(96, 96)));
        this.movementStates = {
            FLYING: "flying",
            FALLING: "falling"
        }
        this.movementState = this.movementStates.FALLING;
        this.collisionRadius = 10;
        this.isMating = false;
        this.hasMated = false;

        //flightGameUI.push(this);

        this.animationFrameLength = 2;
        this.animationFrameCount = 20;
        this.animationFrameCurrent = Math.floor(Math.random() * 20);
        this.animationTimer = 0
    }

    event() {

    }

    update() {

        if (!this.hasMated) {

            //reverse direction after passing the top or bottom of screen
            if (this.sprite.transform.position.y + this.verticalSpeed < (-40 * pixelSize) || this.sprite.transform.position.y + this.verticalSpeed > gameHeight + (40 * pixelSize)) {
                this.verticalSpeed *= -1;
            }

            //reverse direction when reaching the right side of the screen
            if (this.sprite.transform.position.x > gameWidth) {
                if (!this.hasMated) {
                    this.horizontalSpeed = (Math.random() * -8) + -2.2;
                }
            }

            //reverse direction when reaching the left side of the screen
            if (this.sprite.transform.position.x < 0) {
                if (!this.hasMated) {
                    this.horizontalSpeed = (Math.random() * 8) + 0.2;
                }
            }

            //reverse direction when nearing the center of the screen
            if (getDistBtwVec2(flyingQueen.defaultPos, this.sprite.transform.position) < 100 * pixelSize && !this.hasMated) {
                this.horizontalSpeed *= -1;
                this.verticalSpeed *= -1;
            }

            //face the direction it's moving
            if (this.horizontalSpeed >= 0) {
                this.direction = FACING_RIGHT;
            } else {
                this.direction = FACING_LEFT;
            }

            //trigger mating when near the queen
            if (getDistBtwVec2(flyingQueen.sprite.transform.position, this.sprite.transform.position) < flyingQueen.collisionRadius + this.collisionRadius) {
                if (!flyingQueen.isMating && !this.hasMated) {
                    flyingQueen.startMating(this);
                    this.sprite.transform.position.y = 10000;
                    this.verticalSpeed = 0;
                    this.horizontalSpeed = -2;
                }
            }

            //trigger mating when near a rival queen
            /*
            for (var i = 0; i < rivalQueens.length; i++) {
                if (getDistBtwVec2(rivalQueens[i].sprite.transform.position, this.sprite.transform.position) * pixelSize < ((rivalQueens[i].collisionRadius - 40) + this.collisionRadius) * pixelSize) {
                    rivalQueens[i].startMating(this);
                    this.sprite.transform.position.y = 10000;
                    this.verticalSpeed = 0;
                    this.horizontalSpeed = -2;
                }
            }
            */
        }

        //update position based on speed
        this.sprite.transform.position.x += this.horizontalSpeed * pixelSize;
        this.sprite.transform.position.y += this.verticalSpeed * pixelSize;
    }

    stopMating() {
        this.isMating = false;
        this.hasMated = true;
        this.verticalSpeed = 4;
        this.horizontalSpeed -= 1;
        this.direction = 0;
        this.sprite.transform.position.x = flyingQueen.x;
        this.sprite.transform.position.y = flyingQueen.y;
    }

    resize() {

        this.sprite.transform.position = resizeVec2(this.sprite.transform.position);
        this.sprite.transform.scale = vec2(pixelSize / 3, pixelSize / 3);

        this.x /= prevGameWidth;
        this.y /= prevGameHeight;

        this.x *= gameWidth;
        this.y *= gameHeight;

    }

    draw() {
        renderer.save();
        renderer.translate(-camPanX, 0);

        var inSize = {
            x: 250,
            y: 242
        }

        var inPos = {
            x: (this.animationFrameCurrent * inSize.x),
            y: (0 + this.direction) * inSize.y
        }

        if (!this.isMating) {
            this.sprite.drawScIn(inPos, inSize);
        }

        if (this.animationTimer > this.animationFrameLength - 1) {
            this.animationFrameCurrent++
            this.animationTimer = 0;
        }

        if (this.animationFrameCurrent >= this.animationFrameCount) {
            this.animationFrameCurrent = 0;
        }

        this.animationTimer++;

        renderer.restore();
    }
}