class FlyingQueen {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.horizontalSpeed = 2;
        this.verticalSpeed = 3;
        //this.sprite = new Sprite(tr(vec2(this.x * pixelSize, this.y * pixelSize), vec2(pixelSize / 3, pixelSize / 3)), new ImageObject("images/placeholder_antQueen.png", vec2(96, 96)));
        this.sprite = new Sprite(tr(vec2(this.x * pixelSize, this.y * pixelSize), vec2(pixelSize / 3, pixelSize / 3)), new ImageObject("Visual Assets/8bit-Queen-right.png", vec2(96, 96)));
        this.flyingMomentum = 0;
        this.fallingMomentum = 0;

        this.movementStates = {
            FLYING: "flying",
            FALLING: "falling"
        }
        this.movementState = this.movementStates.FALLING;

        flightGameUI.push(this);
    }

    event() {

        if (isTouched) {
            this.movementState = this.movementStates.FLYING;
        } else {
            this.movementState = this.movementStates.FALLING;
        }

    }

    update() {

        switch (this.movementState) {
            case 'flying':
                if (this.sprite.transform.position.y > 0) {
                    this.sprite.transform.position.y -= this.verticalSpeed * 3;
                }
                break;
            case 'falling':
                if (this.sprite.transform.position.y < gameHeight) {
                    this.sprite.transform.position.y += this.verticalSpeed;
                }

                break;
        }

        this.sprite.transform.position.x += this.horizontalSpeed;
        //this.x += this.horizontalSpeed;
    }

    draw() {
        this.sprite.drawSc();
    }
}