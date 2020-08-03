
function moveInDir(spr, value, offset)
{
    if(typeof offset == "undefined") offset = 0;
    spr.transform.position.x += Math.cos(spr.transform.rotation + offset) * value;
    spr.transform.position.y += Math.sin(spr.transform.rotation + offset) * value;
}

class Ant
{
    constructor(leaf)
    {
        this.leaf = leaf;

        this.bodySprite = new Sprite(tr(vec2(180 * pixelSize, 420 * pixelSize),vec2(pixelSize,pixelSize)),
            new ImageObject("images/body.png", vec2(64,64)));
        this.bodySprite.transform.rotation = -Math.PI/4;
        this.leadingJawSprite = new Sprite(tr(vec2(),vec2(pixelSize,pixelSize)),
            new ImageObject("images/jaw2.png", vec2(32,32)));
        this.cuttingJawSprite = new Sprite(tr(vec2(),vec2(pixelSize,pixelSize)),
            new ImageObject("images/jaw1.png", vec2(32,32)));
        this.cutPoint = vec2();

        this.cuttingJawControlPos = vec2(550 * pixelSize, 420 * pixelSize);
        this.leadingJawControlPos = vec2(400 * pixelSize, 420 * pixelSize);
        this.isCuttingJawLed = false;
        this.cutDuration = 300;
        this.cutTimer = 0;
        this.rotationMode = false;
        this.alternateRotation = true;

        this.cutPointLines = [];
        this.cutPointDelay = 200.0;
        this.cutPointTimer = this.cutPointDelay;

        this.destinationPoint = this.bodySprite.transform.position;
        this.pointIndex = -1;

        this.noTouchCounter = 0;

        this.leafBorderTouchMinimumDistance = 50 * pixelSize;

        this.updatingJawTransform();
    }

    event()
    {
        if(isTouched && this.noTouchCounter > 10)
        {
            this.noTouchCounter = 0;
            this.leafBorderTouchInput();
            this.jawButtonsInput();
        }
        else
        {
            this.noTouchCounter++;
        }
    }

    update(deltaTime)
    {
        if(!this.rotationMode && this.pointIndex > -1 && this.destinationPoint.distance(this.bodySprite.transform.position) > 5)
        {
            this.bodySprite.transform.rotation = this.destinationPoint.angle(this.bodySprite.transform.position);
            moveInDir(this.bodySprite, 2 * pixelSize);
            this.updatingJawTransform();
        }
        else if(!this.rotationMode && this.pointIndex > -1)
        {
            this.rotationMode = true;
            this.cutPointLines = [];
            this.cutPointTimer = this.cutPointDelay;
            leafcuttingHint = leafcuttingHints[LEAFCUTTINGHINT_JAWS];
        }
        else if(this.rotationMode && this.cutTimer > 0)
        {
            this.rotationMechanic(deltaTime);
            this.cutTimer -= deltaTime;
        }
    }

    draw(deltatime)
    {
        for(let i = 0; i < this.cutPointLines.length-1; i++)
            drawLine(renderer, this.cutPointLines[i], this.cutPointLines[i+1], bgHEX);
        this.bodySprite.drawScRot();
        this.leadingJawSprite.drawScRot();
        this.cuttingJawSprite.drawScRot();
        this.drawJawControls();
    }

    updatingJawTransform()
    {
        this.leadingJawSprite.transform.position = vec2(this.bodySprite.transform.position.x + (Math.sin(-this.bodySprite.transform.rotation + Math.PI/1.75) * (50 * pixelSize)),
            this.bodySprite.transform.position.y + (Math.cos(-this.bodySprite.transform.rotation + Math.PI/1.75) * (50 * pixelSize)));
        this.cuttingJawSprite.transform.position = vec2(this.bodySprite.transform.position.x + (Math.sin(-this.bodySprite.transform.rotation + Math.PI/2.25) * (50 * pixelSize)),
            this.bodySprite.transform.position.y + (Math.cos(-this.bodySprite.transform.rotation + Math.PI/2.25) * (50 * pixelSize)));
        this.leadingJawSprite.transform.rotation = this.cuttingJawSprite.transform.rotation = this.bodySprite.transform.rotation;
        this.cutPoint = vec2(this.bodySprite.transform.position.x + (Math.sin(-this.bodySprite.transform.rotation + Math.PI/2) * (62.5 * pixelSize)),
            this.bodySprite.transform.position.y + (Math.cos(-this.bodySprite.transform.rotation + Math.PI/2) * (62.5 * pixelSize)));
    }

    drawJawControls()
    {
        if(this.rotationMode)
        {
            drawCircle(renderer, this.leadingJawControlPos, 60 * pixelSize, !this.isCuttingJawLed, !this.isCuttingJawLed ? "white" : "red", 2);
            drawCircle(renderer, this.cuttingJawControlPos, 60 * pixelSize, this.isCuttingJawLed, this.isCuttingJawLed ? "white" : "red", 2);
            var tempPos = vec2(this.cuttingJawSprite.transform.position.x, this.cuttingJawSprite.transform.position.y);
            this.cuttingJawSprite.transform.position = this.cuttingJawControlPos;
            this.cuttingJawSprite.drawSc();
            this.cuttingJawSprite.transform.position = tempPos;
            var tempPos = vec2(this.leadingJawSprite.transform.position.x, this.leadingJawSprite.transform.position.y);
            this.leadingJawSprite.transform.position = this.leadingJawControlPos;
            this.leadingJawSprite.drawSc();
            this.leadingJawSprite.transform.position = tempPos;
        }
    }

    addVoidAreaWhenPointsConnect(newPoint)
    {
        if(this.cutPointLines.length > 2)
        {
            for(let i = 0; i < this.cutPointLines.length-1; i++)
            {
                if(this.cutPointLines[i].distance(newPoint) < 6 * pixelSize)
                {
                    this.leaf.voidAreas.push([]);
                    for(let i = 0; i < this.cutPointLines.length; i++)
                        this.leaf.voidAreas[this.leaf.voidAreas.length-1].push(vec2(this.cutPointLines[i].x, this.cutPointLines[i].y));
                    this.cutPointLines = [];
                    return true;
                }
            }
        }

        return false;
    }

    onLeafCutSuccess()
    {
        this.rotationMode = false;
        this.leaf.borderPoints[this.pointIndex] = vec2(-10000, -10000);
        this.pointIndex = -1;
        this.leaf.updatePoints = true;
        this.alternateRotation = !this.alternateRotation;
        leafcuttingHint = leafcuttingHints[LEAFCUTTINGHINT_SUCCESS];
    }

    leafBorderTouchInput()
    {
        var lastDist = 999999.9;
        for(let i = 0; i < this.leaf.borderPoints.length; i++)
        {
            var dist = this.leaf.borderPoints[i].distance(vec2(touchPos[0].x - canvasStartX, touchPos[0].y - canvasStartY));
            if(dist < lastDist)
            {
                lastDist = dist;

                if(dist < this.leafBorderTouchMinimumDistance)
                {
                    this.destinationPoint = this.leaf.borderPoints[i];
                    this.pointIndex = i;
                }
            }
        }
    }

    jawButtonsInput()
    {
        if(this.rotationMode)
        {
            if(isPointInCircle(vec2(touchPos[0].x - canvasStartX, touchPos[0].y - canvasStartY), this.cuttingJawControlPos, 45 * pixelSize))
            {
                if(this.isCuttingJawLed)
                {
                    this.cutTimer = this.cutDuration;
                    this.isCuttingJawLed = false;
                }
                else
                {
                    this.cutPointLines = [];
                    leafcuttingHint = leafcuttingHints[LEAFCUTTINGHINT_FAIL];
                }
            }
            else if(isPointInCircle(vec2(touchPos[0].x - canvasStartX, touchPos[0].y - canvasStartY), this.leadingJawControlPos, 45 * pixelSize))
            {
                if(!this.isCuttingJawLed)
                {
                    this.isCuttingJawLed = true;
                    leafcuttingHint = leafcuttingHints[LEAFCUTTINGHINT_JAWS];
                }
                else
                {
                    this.cutPointLines = [];
                    leafcuttingHint = leafcuttingHints[LEAFCUTTINGHINT_FAIL];
                }
            }
        }
    }

    rotationMechanic(deltaTime)
    {
        do
        {
            if(!this.alternateRotation)
                this.bodySprite.transform.rotation -= 0.025/2;
            else
                this.bodySprite.transform.rotation += 0.025/2;
            
            moveInDir(this.bodySprite, 0.5 * pixelSize);
            this.updatingJawTransform();

            var pixelData = renderer.getImageData(this.cutPoint.x, this.cutPoint.y, 1, 1).data;

            if(this.cutPointTimer <= 0)
            {
                var newPoint = this.cutPoint.add(vec2(Math.random() * 6 * pixelSize, Math.random() * 6 * pixelSize));
                this.cutPointLines.push(newPoint);
                if(this.addVoidAreaWhenPointsConnect(newPoint))
                {
                    this.onLeafCutSuccess();
                }
                this.cutPointTimer = this.cutPointDelay;
            }
            else
            {
                this.cutPointTimer -= deltaTime;
            }
        }
        while ((pixelData[0] == bgRGB[0] && pixelData[1] == bgRGB[1] && pixelData[2] == bgRGB[2])
        || (this.cutPoint.x < 0 || this.cutPoint.y < 0 || this.cutPoint.x > gameWidth || this.cutPoint.y > gameHeight));
    }
}