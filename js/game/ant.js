
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

        this.bodySprite = new Sprite(tr(vec2(-40 * pixelSize, 540 * pixelSize),vec2(pixelSize,pixelSize)),
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
        this.jawSpeedPenalty = 0;
        this.jawSpeedPenaltyTotalTurns = 3;
        this.cutDuration = 350;
        this.cutTimer = 0;
        this.rotationMode = false;
        this.alternateRotation = true;
        this.rotationCounter = 0.0;

        this.timedJawMinRadius = 45 * pixelSize;
        this.timedJawMaxRadius = 80 * pixelSize;
        this.timedJawRadius = this.timedJawMaxRadius;
        this.timedJawSpeedFactor = 0.075;
        this.timedJawCutSpeedBonus = 0;
        this.timedJawCutSpeedBonusFactor = 0.025;
        this.timedJawCutTimeBonus = 0;
        this.timedJawCutTimeBonusFactor = 5;

        this.cutPointLines = [];
        this.cutPointDelay = 200.0;
        this.cutPointTimer = this.cutPointDelay;

        this.forcedDestination = true;
        this.destinationPoints = [];
        this.destinationPointsIndex = -1;
        this.destinationPoint = vec2(60 * pixelSize, 360 * pixelSize);
        this.pointIndex = -1;

        this.disabled = false;
        this.disabling = false;

        this.noTouchCounter = 0;

        this.leafBorderTouchMinimumDistance = 50 * pixelSize;

        this.updatingJawTransform();
    }

    setSecondAnt(secondAnt)
    {
        this.secondAnt = secondAnt;
    }

    event()
    {
        if(!this.disabled)
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
    }

    update(deltaTime)
    {
        if(!this.disabled)
        {
            if(!this.rotationMode && (this.pointIndex > -1 || this.forcedDestination)
            && this.destinationPoint.distance(this.bodySprite.transform.position) > 5 * pixelSize)
            {
                this.moveToDestination(deltaTime);
            }
            else if(this.forcedDestination)
            {
                this.forcedDestination = false;
                this.pointIndex = -1;
                if(this.disabling)
                {
                    this.disabled = true;
                    this.disabling = false;
                    this.destinationPoints = [];
                    this.destinationPointsIndex = -1;
                }
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

            if(this.rotationMode)
            {
                this.timedJawRadius -= this.timedJawSpeedFactor * deltaTime;

                if(this.timedJawRadius <= this.timedJawMinRadius)
                    this.timedJawRadius = this.timedJawMaxRadius;
            }
        }
    }

    draw(deltatime)
    {
        this.drawDestinationPath();
        for(let i = 0; i < this.cutPointLines.length-1; i++)
        {
            var pixelData1 = renderer.getImageData(this.cutPointLines[i].x, this.cutPointLines[i].y, 1, 1).data;
            var pixelData2 = renderer.getImageData(this.cutPointLines[i+1].x, this.cutPointLines[i+1].y, 1, 1).data;
            if(pixelData1[1] >= 70 && pixelData2[1] >= 70)
                drawLine(renderer, this.cutPointLines[i], this.cutPointLines[i+1], "#000000");
        }
        this.bodySprite.drawScRot();
        this.leadingJawSprite.drawScRot();
        this.cuttingJawSprite.drawScRot();
        this.drawJawControls();
    }

    moveToDestination(deltaTime)
    {
        if(this.destinationPoints.length <= 1)
        {
            this.bodySprite.transform.rotation = changeValueInSteps(this.bodySprite.transform.rotation, this.destinationPoint.angle(this.bodySprite.transform.position), 0.05 * deltaTime);
        }
        else
        {
            if(this.destinationPoints[this.destinationPointsIndex].distance(this.bodySprite.transform.position) > 5 * pixelSize)
                this.bodySprite.transform.rotation = changeValueInSteps(this.bodySprite.transform.rotation, this.destinationPoints[this.destinationPointsIndex].angle(this.bodySprite.transform.position), 0.05 * deltaTime);
            else
                this.destinationPointsIndex++;
        }

        moveInDir(this.bodySprite, 2 * pixelSize);


        if(leafcuttingSFX[SFX_ANTWALK].currentTime <= 0 || leafcuttingSFX[SFX_ANTWALK].currentTime > 1.2)
        {
            leafcuttingSFX[SFX_ANTWALK].currentTime = 0;
            leafcuttingSFX[SFX_ANTWALK].play();
        }

        this.updatingJawTransform();
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
            drawCircle(renderer, this.leadingJawControlPos, this.timedJawMinRadius, !this.isCuttingJawLed, !this.isCuttingJawLed ? "white" : "red", pixelSize);
            drawCircle(renderer, this.cuttingJawControlPos, this.timedJawMinRadius, this.isCuttingJawLed, this.isCuttingJawLed ? "white" : "red", pixelSize);
            drawCircle(renderer, this.isCuttingJawLed ? this.cuttingJawControlPos : this.leadingJawControlPos,
                this.timedJawRadius, false, this.jawSpeedPenalty <= 0 ? rgb(Math.floor((this.timedJawRadius - this.timedJawMinRadius)*4),
                Math.floor((this.timedJawMaxRadius - this.timedJawRadius)*4), 0) : "grey", (this.timedJawRadius - this.timedJawMinRadius) * pixelSize);
            renderer.lineWidth = 1;
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

    addVoidAreaWhenRotationCompletes()
    {
        if(this.cutPointLines.length > 2)
        {
            if(this.rotationCounter >= Math.PI * 2.2)
            {
                this.leaf.voidAreas.push([]);
                for(let i = 0; i < this.cutPointLines.length; i++)
                    this.leaf.voidAreas[this.leaf.voidAreas.length-1].push(vec2(this.cutPointLines[i].x, this.cutPointLines[i].y));
                this.cutPointLines = [];
                this.rotationCounter = 0.0;
                return true;
            }
        }

        return false;
    }

    antDestionationAfterLeafCutSuccess()
    {
        this.disabling = true;
        this.secondAnt.disabled = false;
        this.secondAnt.forcedDestination = true;
        this.secondAnt.destinationPoint = vec2(60 * pixelSize, 360 * pixelSize);

        this.forcedDestination = true;
        this.destinationPoints = [];
        this.destinationPoint = vec2(-40 * pixelSize, 540 * pixelSize);
        this.destinationPointsIndex = 0;
        this.calculateDestinationPoints();
    }

    onLeafCutSuccess()
    {
        this.leaf.cutterAnt = this;
        this.leaf.updatePoints = true;

        this.rotationMode = false;
        this.leaf.borderPoints[this.pointIndex] = vec2(-10000, -10000);
        this.pointIndex = -1;
        this.alternateRotation = !this.alternateRotation;
        leafcuttingHint = leafcuttingHints[LEAFCUTTINGHINT_SUCCESS];

        this.timedJawRadius = this.timedJawMinRadius;
        this.jawSpeedPenalty = 0;
        this.cutTimer = 0;

        this.leaf.getPoints(distanceBetween2AdjacentPoints);
    }

    leafBorderTouchInput()
    {
        if(!this.forcedDestination)
        {
            var lastDist = 999999.9;
            for(let i = 0; i < this.leaf.borderPoints.length; i++)
            {
                var dist = this.leaf.borderPoints[i].distance(vec2(touchPos[0].x - canvasStartX, touchPos[0].y - canvasStartY));
                if(dist < lastDist)
                {
                    lastDist = dist;

                    if(dist < this.leafBorderTouchMinimumDistance && !this.rotationMode)
                    {
                        this.destinationPoint = this.leaf.borderPoints[i];
                        this.destinationPointsIndex = 0;
                        this.destinationPoints = [];
                        this.calculateDestinationPoints();
                        this.pointIndex = i;
                    }
                }
            }
        }
    }

    isVectorInArray(vec, array)
    {
        for(let i = 0; i < array.length; i++)
        {
            if(array[i].x > vec.x - (0.5 * pixelSize)
            && array[i].x < vec.x + (0.5 * pixelSize)
            && array[i].y > vec.y - (0.5 * pixelSize)
            && array[i].y < vec.y + (0.5 * pixelSize))
                return true;
        }
        return false;
    }

    calculateDestinationPoints()
    {
        if(this.destinationPoints.length <= 0)
        {
            this.destinationPoints.push(vec2(this.bodySprite.transform.position.x, this.bodySprite.transform.position.y));

            if(this.disabling) //go to nearest border point
            {
                var index = -1;
                var distance = 99999;
                for(let i = 0; i < this.leaf.borderPoints.length; i++)
                {
                    var tempDistance = this.leaf.borderPoints[i].distance(this.bodySprite.transform.position);
                    if(tempDistance < distance)
                    {
                        distance = tempDistance;
                        index = i;
                    }
                }

                if(index > -1)
                {
                    this.destinationPoints.push(vec2(this.leaf.borderPoints[index].x,
                    this.leaf.borderPoints[index].y));
                    console.log("index is " + index.toString())
                }
            }

            while(this.destinationPoints.length < 40)
            {
                if(this.destinationPoints[this.destinationPoints.length - 1].distance(this.destinationPoint) <= distanceBetween2AdjacentPoints * 1.67)
                {
                    this.destinationPoints.push(vec2(this.destinationPoint.x, this.destinationPoint.y));
                    break;
                }

                var adjacentPoints = [];
                var pointToIgnore = -1;
                for(let i = 0; i < this.leaf.points.length; i++)
                {
                    if(pointToIgnore < 0 && isPointInCircle(this.destinationPoints[this.destinationPoints.length - 1], this.leaf.points[i], distanceBetween2AdjacentPoints / 2))
                    {
                        pointToIgnore = i;
                    }
                    else if(isPointInCircle(this.destinationPoints[this.destinationPoints.length - 1], this.leaf.points[i], distanceBetween2AdjacentPoints * 1.67))
                    {
                        adjacentPoints.push(vec2(this.leaf.points[i].x, this.leaf.points[i].y));
                    }
                }

                var distanceFromDestinationPoint = 999999;
                var adjacentPointIndexCloserToDestination = vec2(99999, 99999);
                for(let i = 0; i < adjacentPoints.length; i++)
                {
                    var distance = this.destinationPoint.distance(adjacentPoints[i]);
                    if(distance < distanceFromDestinationPoint
                    && !this.isVectorInArray(adjacentPoints[i], this.destinationPoints))
                    {
                        distanceFromDestinationPoint = distance;
                        adjacentPointIndexCloserToDestination = adjacentPoints[i];
                    }
                }

                if(adjacentPointIndexCloserToDestination.x < 99990)
                {
                    this.destinationPoints.push(vec2(adjacentPointIndexCloserToDestination.x, adjacentPointIndexCloserToDestination.y));
                }
                else
                {
                    this.destinationPoints.push(vec2(this.destinationPoint.x, this.destinationPoint.y));
                    break;
                }
            }
        }
    }

    drawDestinationPath()
    {
        if(this.destinationPoints.length > 1 && !this.rotationMode && !this.disabled)
        {
            for(let i = 1; i < this.destinationPoints.length; i++)
            {
                drawLine(renderer, this.destinationPoints[i - 1], this.destinationPoints[i], "#ffffff99");
            }
        }
    }

    jawButtonsInput()
    {
        if(this.rotationMode)
        {
            if(isPointInCircle(vec2(touchPos[0].x - canvasStartX, touchPos[0].y - canvasStartY), this.cuttingJawControlPos, this.timedJawMinRadius))
            {
                if(this.isCuttingJawLed)
                {
                    this.timedJawCutSpeedBonus = 1 + ((this.timedJawMaxRadius - this.timedJawRadius) * this.timedJawCutSpeedBonusFactor);
                    
                    //TIMED JAW CUT SPEED PENALTY RULE
                    if(this.timedJawCutSpeedBonus <= 1.5)
                    {
                        this.timedJawCutSpeedBonus /= 2;
                        leafcuttingSFX[SFX_JAWBUTTON].currentTime = 0;
                        leafcuttingSFX[SFX_JAWBUTTON].play();
                    }
                    else
                    {
                        leafcuttingSFX[SFX_JAWTIMED].currentTime = 0;
                        leafcuttingSFX[SFX_JAWTIMED].play();
                    }

                    if(this.jawSpeedPenalty > 0 && this.timedJawCutSpeedBonus > 1) this.timedJawCutSpeedBonus = 1;

                    this.timedJawRadius = this.timedJawMinRadius;

                    this.cutTimer = (this.cutDuration * (this.jawSpeedPenalty > 0 ? 0.5 : 1.0)) + this.timedJawCutTimeBonus;
                    this.timedJawCutTimeBonus = 0;

                    this.isCuttingJawLed = false;
                    this.jawSpeedPenalty--;
                }
                else
                {
                    if(this.jawSpeedPenalty < this.jawSpeedPenaltyTotalTurns)
                        this.jawSpeedPenalty = this.jawSpeedPenaltyTotalTurns;
                    leafcuttingHint = leafcuttingHints[LEAFCUTTINGHINT_FAIL];
                }
            }
            else if(isPointInCircle(vec2(touchPos[0].x - canvasStartX, touchPos[0].y - canvasStartY), this.leadingJawControlPos, this.timedJawMinRadius))
            {
                if(!this.isCuttingJawLed)
                {
                    this.timedJawCutTimeBonus = (this.timedJawMaxRadius - this.timedJawRadius) * this.timedJawCutTimeBonusFactor;
                    
                    //TIMED JAW CUT TIME PENALTY RULE
                    if(this.timedJawCutTimeBonus <= 150)
                    {
                        this.timedJawCutTimeBonus -= 200;
                        leafcuttingSFX[SFX_JAWBUTTON].currentTime = 0;
                        leafcuttingSFX[SFX_JAWBUTTON].play();
                    }
                    else
                    {
                        leafcuttingSFX[SFX_JAWTIMED].currentTime = 0;
                        leafcuttingSFX[SFX_JAWTIMED].play();
                    }

                    if(this.jawSpeedPenalty > 0 && this.timedJawCutTimeBonus > 0) this.timedJawCutTimeBonus = 0;

                    this.timedJawRadius = this.timedJawMinRadius;

                    this.timedJawCutSpeedBonus = 1;

                    this.isCuttingJawLed = true;
                    leafcuttingHint = leafcuttingHints[LEAFCUTTINGHINT_JAWS];
                }
                else
                {
                    if(this.jawSpeedPenalty < this.jawSpeedPenaltyTotalTurns)
                        this.jawSpeedPenalty = this.jawSpeedPenaltyTotalTurns;
                    leafcuttingHint = leafcuttingHints[LEAFCUTTINGHINT_FAIL];
                }
            }
        }
    }

    rotationMechanic(deltaTime)
    {
        var bgValueBorder = 100;
        do
        {
            if(!this.alternateRotation)
            {
                this.bodySprite.transform.rotation -= (0.0125 * this.timedJawCutSpeedBonus);
                this.rotationCounter += (0.0125 * this.timedJawCutSpeedBonus);
            }
            else
            {
                this.bodySprite.transform.rotation += (0.0125 * this.timedJawCutSpeedBonus);
                this.rotationCounter += (0.0125 * this.timedJawCutSpeedBonus);
            }
            
            moveInDir(this.bodySprite, (0.5 * pixelSize) * this.timedJawCutSpeedBonus);
            this.updatingJawTransform();

            var pixelData = renderer.getImageData(this.cutPoint.x, this.cutPoint.y, 1, 1).data;

            if(this.cutPointTimer <= 0)
            {
                var newPoint = this.cutPoint.add(vec2(Math.random() * 3 * pixelSize, Math.random() * 3 * pixelSize));
                this.cutPointLines.push(newPoint);
                this.cutPointTimer = this.cutPointDelay;
            }
            else
            {
                this.cutPointTimer -= deltaTime;
            }
        }
        //while ((pixelData[0] == bgRGB[0] && pixelData[1] == bgRGB[1] && pixelData[2] == bgRGB[2])
        while ((pixelData[0] < bgValueBorder && pixelData[1] < bgValueBorder && pixelData[2] < bgValueBorder)
        || (this.cutPoint.x < 0 || this.cutPoint.y < 0 || this.cutPoint.x > gameWidth || this.cutPoint.y > gameHeight));

        if(this.addVoidAreaWhenRotationCompletes())
            this.onLeafCutSuccess();
    }
}