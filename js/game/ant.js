
function moveInDir(spr, value, offset)
{
    if(typeof offset == "undefined") offset = 0;
    spr.transform.position.x += Math.cos(spr.transform.rotation + offset) * value;
    spr.transform.position.y += Math.sin(spr.transform.rotation + offset) * value;
}

class Ant
{
    constructor()
    {
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
        this.voidAreas = [];

        this.destinationPoint = this.bodySprite.transform.position;
        this.pointIndex = -1;

        this.leafPoints = [];
        this.pointsToCutLeaf = [];
        this.leafBorderTouchMinimumDistance = 50;
        this.updateLeafPoints = true;

        this.noTouchCounter = 0;

        this.updatingJawTransform();
    }

    event()
    {
        if(isTouched && this.noTouchCounter > 10)
        {
            this.noTouchCounter = 0;

            var lastDist = 999999.9;
            for(let i = 0; i < this.pointsToCutLeaf.length; i++)
            {
                var dist = this.pointsToCutLeaf[i].distance(vec2(touchPos[0].x - canvasStartX, touchPos[0].y - canvasStartY));
                if(dist < lastDist)
                {
                    lastDist = dist;

                    if(dist < this.leafBorderTouchMinimumDistance)
                    {
                        this.destinationPoint = this.pointsToCutLeaf[i];
                        this.pointIndex = i;
                    }
                }
            }

            if(isPointInCircle(vec2(touchPos[0].x - canvasStartX, touchPos[0].y - canvasStartY), this.cuttingJawControlPos, 45 * pixelSize))
            {
                if(this.isCuttingJawLed)
                {
                    this.cutTimer = this.cutDuration;
                    this.isCuttingJawLed = false;
                    leafcuttingHint = leafcuttingHints[LEAFCUTTINGHINT_JAWS];
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
            moveInDir(this.bodySprite, 2);
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
            do
            {
                if(!this.alternateRotation)
                    this.bodySprite.transform.rotation -= 0.025/2;
                else
                    this.bodySprite.transform.rotation += 0.025/2;
                
                moveInDir(this.bodySprite, 1/2);
                this.updatingJawTransform();

                var pixelData = renderer.getImageData(this.cutPoint.x, this.cutPoint.y, 1, 1).data;

                if(this.cutPointTimer <= 0)
                {
                    var newPoint = this.cutPoint.add(vec2(Math.random() * 5, Math.random() * 5));
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
            while (pixelData[0] < 10 && pixelData[1] < 10 && pixelData[2] < 10);
            this.cutTimer -= deltaTime;
        }
    }

    draw(deltatime)
    {
        this.drawVoidAreas();
        this.getLeafPoints(pixelSize*12);
        for(let i = 0; i < this.cutPointLines.length-1; i++)
            drawLine(renderer, this.cutPointLines[i], this.cutPointLines[i+1], "black");
        this.bodySprite.drawScRot();
        this.leadingJawSprite.drawScRot();
        this.cuttingJawSprite.drawScRot();
        this.drawLeafCuttingPoints();
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

    drawVoidAreas()
    {
        for(let i = 0; i < this.voidAreas.length; i++)
        {
            renderer.fillStyle = "black";
            renderer.beginPath();
            if(this.voidAreas[i].length > 1)
            {
                renderer.moveTo(this.voidAreas[i][0].x, this.voidAreas[i][0].y);
                for(let n = 0; n < this.voidAreas[i].length; n++)
                    renderer.lineTo(this.voidAreas[i][n].x, this.voidAreas[i][n].y)
            }
            renderer.fill();
        }
    }

    addVoidAreaWhenPointsConnect(newPoint)
    {
        if(this.cutPointLines.length > 2)
        {
            for(let i = 0; i < this.cutPointLines.length-1; i++)
            {
                if(this.cutPointLines[i].distance(newPoint) < 10)
                {
                    this.voidAreas.push([]);
                    for(let i = 0; i < this.cutPointLines.length; i++)
                        this.voidAreas[this.voidAreas.length-1].push(vec2(this.cutPointLines[i].x, this.cutPointLines[i].y));
                    this.cutPointLines = [];
                    return true;
                }
            }
        }

        return false;
    }

    drawLeafCuttingPoints()
    {
        for(let i = 0; i < this.leafPoints.length; i++)
        {
            drawCircle(renderer, this.leafPoints[i], 1 * pixelSize, true, "white", 1);
        }
        for(let i = 0; i < this.pointsToCutLeaf.length; i++)
        {
            drawCircle(renderer, this.pointsToCutLeaf[i], 2 * pixelSize, true, "red", 1);
        }
    }

    onLeafCutSuccess()
    {
        this.rotationMode = false;
        this.pointsToCutLeaf[this.pointIndex] = vec2(-1000, -1000);
        this.pointIndex = -1;
        this.updateLeafPoints = true;
        this.alternateRotation = !this.alternateRotation;
        leafcuttingHint = leafcuttingHints[LEAFCUTTINGHINT_SUCCESS];
    }

    getLeafPoints(borderTestResolutionFactor)
    {
        var borderPixelComparionDistance = borderTestResolutionFactor;
        if(this.updateLeafPoints)
        {
            var prevLeafPoints = this.leafPoints.length;
            this.leafPoints = [];
            this.pointsToCutLeaf = [];
            for(let y = borderPixelComparionDistance; y < gameHeight-borderPixelComparionDistance; y+=borderTestResolutionFactor)
            {
                for(let x = borderPixelComparionDistance; x < gameWidth-borderPixelComparionDistance; x+=borderTestResolutionFactor)
                {
                    var thisPixel = renderer.getImageData(x, y, 1, 1).data;
                    var leftPixel = renderer.getImageData(x-borderPixelComparionDistance, y, 1, 1).data;
                    var rightPixel = renderer.getImageData(x+borderPixelComparionDistance, y, 1, 1).data;
                    var upPixel = renderer.getImageData(x, y-borderPixelComparionDistance, 1, 1).data;
                    var downPixel = renderer.getImageData(x, y+borderPixelComparionDistance, 1, 1).data;

                    //if the pixel is not black
                    if(thisPixel[0] > 10 || thisPixel[1] > 10 || thisPixel[2] > 10)
                    {
                        //...and any of the surrounding pixels is black
                        if(
                            (leftPixel[0] < 10 && leftPixel[1] < 10 && leftPixel[2] < 10)
                            || (rightPixel[0] < 10 && rightPixel[1] < 10 && rightPixel[2] < 10)
                            || (upPixel[0] < 10 && upPixel[1] < 10 && upPixel[2] < 10)
                            || (downPixel[0] < 10 && downPixel[1] < 10 && downPixel[2] < 10)
                        )
                        {
                            //then, it is a border pixel.
                            this.pointsToCutLeaf.push(vec2(x,y));
                        }

                        this.leafPoints.push(vec2(x,y));
                    }
                }
            }
            var leafPointsRemoved = prevLeafPoints - this.leafPoints.length;
            if(leafPointsRemoved > 0) leafcuttingScore += leafPointsRemoved * 10;
            this.updateLeafPoints = false;
        }
    }
}