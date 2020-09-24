
function moveInDir(spr, value, offset)
{
    if(typeof offset == "undefined") offset = 0;
    spr.transform.position.x += Math.cos(spr.transform.rotation + offset) * value;
    spr.transform.position.y += Math.sin(spr.transform.rotation + offset) * value;
}

function isVectorInArray(vec, array)
{
    for(let i = 0; i < array.length; i++)
    {
        if(array[i].x > vec.x - (0.25 * pixelSize)
        && array[i].x < vec.x + (0.25 * pixelSize)
        && array[i].y > vec.y - (0.25 * pixelSize)
        && array[i].y < vec.y + (0.25 * pixelSize))
            return true;
    }
    return false;
}

var maxHeadFrames = 32;
var maxTopDownAntFrames = 11;

class Ant
{
    constructor(leaf)
    {
        this.leaf = leaf;

        this.antAnimationFrameIndex = 0;
        this.antAnimationFrameSize = vec2(150, 150);
        this.bodySprite = new Sprite(tr(vec2(-40 * pixelSize, 540 * pixelSize),vec2(pixelSize/2,pixelSize/2)), topDownSoldierAntImageObject);
        this.bodySprite.transform.rotation = -Math.PI/4;
        this.cutPoint = vec2();

        this.cutLeaves = [];
        for(let i = 1; i <= 13; i++)
            this.cutLeaves.push(new Sprite(tr(vec2(), vec2(pixelSize*2, pixelSize*2)), cutLeafImageObjects[i]));
        this.cutLeafIndex = -1;
        this.leafCarryPoint = vec2();

        this.headImageIndex = 0;
        this.headImageFrameSize = vec2(350, 250);
        this.headSprite = new Sprite(tr(vec2(475 * pixelSize, 360 * pixelSize), vec2(pixelSize*1.2, pixelSize*1.2)), antHeadImageObject);
        this.headLeadJawRotationOffset = 0;
        this.headLeadJawSprite = new Sprite(tr(vec2(425 * pixelSize, 450 * pixelSize), vec2(pixelSize*1.2, pixelSize*1.2), Math.PI*1.5), leadingJawImageObject);
        this.headCutJawVibrationOffset = vec2();
        this.headCutJawSprite = new Sprite(tr(vec2(505 * pixelSize, 450 * pixelSize), vec2(pixelSize*1.2, pixelSize*1.2)), cuttingJawImageObject);

        this.animationTimer = 0;
        this.animationDelay = 60/2;

        this.leadingJawControlPos = vec2(400 * pixelSize, 440 * pixelSize);
        this.cuttingJawControlPos = vec2(530 * pixelSize, 440 * pixelSize);
        
        this.isCuttingJawLed = false;
        this.jawSpeedPenalty = 0;
        this.jawSpeedPenaltyTotalTurns = 3;
        this.cutDuration = 85;
        this.cutTimer = 0;
        this.rotationMode = false;
        this.alternateRotation = true;
        this.rotationCounter = 0.0;

        this.timedJawMinRadius = 40 * pixelSize;
        this.timedJawMaxRadius = 80 * pixelSize;
        this.timedJawRadius = this.timedJawMaxRadius;
        this.timedJawSpeedFactorDefault = 0.08;
        this.timedJawSpeedFactorMax = 0.15;
        this.timedJawSpeedFactorMin = 0.05;
        this.timedJawSpeedFactor = this.timedJawSpeedFactorDefault;
        this.timedJawSpeedFactorStep = 0.01;
        this.timedJawCutSpeedBonus = 0;
        this.timedJawCutSpeedBonusFactor = 0.03;
        this.timedJawCutTimeBonus = 0;
        this.timedJawCutTimeBonusFactor = 2.5;
        this.isJawButtonClickable = false;

        this.cutPointLines = [];
        this.cutPointDelay = 150.0;
        this.cutPointTimer = this.cutPointDelay;

        this.forcedDestination = true;
        this.destinationPoints = [];
        this.destinationPointsIndex = -1;
        this.destinationPoint = vec2(60 * pixelSize, 360 * pixelSize);
        this.pointIndex = -1;

        this.disabled = false;
        this.disabling = false;

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
            if(isTouched)
            {
                this.leafBorderTouchInput();
                this.jawButtonsInput();
                isTouched = false;
            }
        }
    }

    resize()
    {
        this.bodySprite.transform.position = resizeVec2(this.bodySprite.transform.position);
        this.bodySprite.transform.scale = vec2(pixelSize/2, pixelSize/2);

        for(let i = 0; i < 12; i++)
        {
            this.cutLeaves[i].transform.scale = vec2(pixelSize*2, pixelSize*2);
        }

        this.headSprite.transform.position = vec2(475 * pixelSize, 360 * pixelSize);
        this.headSprite.transform.scale = vec2(pixelSize*1.2, pixelSize*1.2);

        this.headLeadJawSprite.transform.position = vec2(425 * pixelSize, 450 * pixelSize);
        this.headLeadJawSprite.transform.scale = vec2(pixelSize*1.2, pixelSize*1.2)

        this.headCutJawSprite.transform.position = vec2(505 * pixelSize, 450 * pixelSize);
        this.headCutJawSprite.transform.scale = vec2(pixelSize*1.2, pixelSize*1.2);

        this.leadingJawControlPos = vec2(400 * pixelSize, 440 * pixelSize);
        this.cuttingJawControlPos = vec2(530 * pixelSize, 440 * pixelSize);

        if(typeof this.cutPointLines != "undefined")
        {
            for(let i = 0; i < this.cutPointLines.length; i++)
            {
                this.cutPointLines[i] = resizeVec2(this.cutPointLines[i]);
            }
        }

        this.destinationPoint = vec2(60 * pixelSize, 360 * pixelSize);
        if(typeof this.destinationPoints != "undefined")
        {
            for(let i = 0; i < this.destinationPoints.length; i++)
            {
                this.destinationPoints[i] = resizeVec2(this.destinationPoints[i]);
            }
        }

        this.timedJawMinRadius = 40 * pixelSize;
        this.timedJawMaxRadius = 80 * pixelSize;
        this.timedJawRadius = this.timedJawMaxRadius;
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
                    this.cutLeafIndex = -1;
                }
            }
            else if(!this.rotationMode && this.pointIndex > -1)
            {
                this.rotationMode = true;
                this.cutPointLines = [];
                this.cutPointTimer = this.cutPointDelay;
                this.leaf.currentBorderIndicationIndex = -2; //means no indication at all!
            }
            else if(this.rotationMode && this.cutTimer > 0)
            {
                this.rotationMechanic(deltaTime);
                this.cutTimer -= deltaTime;
            }

            if(this.rotationMode)
            {
                this.timedJawRadius -= this.timedJawSpeedFactor * deltaTime * pixelSize;

                if(this.timedJawRadius <= this.timedJawMinRadius)
                    this.timedJawRadius = this.timedJawMaxRadius;
            }

            this.updateAnimation(deltaTime);
        }
    }

    draw(deltatime)
    {
        //this.drawDestinationPath();
        this.drawLeafCuttingLines();

        if(!this.rotationMode && (this.pointIndex > -1 || this.forcedDestination)
            && this.destinationPoint.distance(this.bodySprite.transform.position) > 5 * pixelSize)
        {
            this.bodySprite.drawScRotIn(vec2(((maxTopDownAntFrames*2) + ((this.antAnimationFrameIndex*2)%11)) * this.antAnimationFrameSize.x, 0), this.antAnimationFrameSize);
        }
        else if(this.rotationMode && this.cutTimer > 0)
        {
            this.bodySprite.drawScRotIn(vec2(((maxTopDownAntFrames*1) + this.antAnimationFrameIndex) * this.antAnimationFrameSize.x, 0), this.antAnimationFrameSize);
        }
        else
        {
            this.bodySprite.drawScRotIn(vec2(((maxTopDownAntFrames*0) + this.antAnimationFrameIndex) * this.antAnimationFrameSize.x, 0), this.antAnimationFrameSize);
        }

        if(this.cutLeafIndex > -1)
        {
            this.cutLeaves[this.cutLeafIndex].transform.position = this.leafCarryPoint;
            this.cutLeaves[this.cutLeafIndex].drawScRot();
        }
        this.drawJawControls();
    }

    drawLeafCuttingLines()
    {
        for(let i = 0; i < this.cutPointLines.length-1; i++)
        {
            drawLine(renderer, this.cutPointLines[i], this.cutPointLines[i+1], "#000000");
        }
    }

    moveToDestination(deltaTime)
    {
        var targetAngle = 0;
        if(this.destinationPoints.length <= 1)
        {
            targetAngle = this.destinationPoint.angle(this.bodySprite.transform.position);
            this.bodySprite.transform.rotation = targetAngle;
        }
        else
        {
            targetAngle = this.destinationPoints[this.destinationPointsIndex].angle(this.bodySprite.transform.position);
            if(this.destinationPoints[this.destinationPointsIndex].distance(this.bodySprite.transform.position) > 5 * pixelSize)
                this.bodySprite.transform.rotation = targetAngle;
            else if(this.destinationPointsIndex + 1 < this.destinationPoints.length - 1)
                this.destinationPointsIndex++;
            else
            {
                this.destinationPointsIndex = -1;
                this.destinationPoints = [];
            }
        }

        if(this.bodySprite.transform.rotation == targetAngle)
            moveInDir(this.bodySprite, 5 * pixelSize);

        if(!leafcuttingSFX[SFX_ANTWALK].isPlaying)//leafcuttingSFX[SFX_ANTWALK].currentTime <= 0 || leafcuttingSFX[SFX_ANTWALK].currentTime > 1.2)
        {
            leafcuttingSFX[SFX_ANTWALK].volume = leafcuttingBGMMaxVolume/2.0;
            //leafcuttingSFX[SFX_ANTWALK].currentTime = 0;
            leafcuttingSFX[SFX_ANTWALK].play();
        }

        this.updatingJawTransform();
    }

    updatingJawTransform()
    {
        this.cutPoint = vec2(this.bodySprite.transform.position.x + (Math.sin(-this.bodySprite.transform.rotation + Math.PI/2) * (31.25 * pixelSize)),
            this.bodySprite.transform.position.y + (Math.cos(-this.bodySprite.transform.rotation + Math.PI/2) * (31.25 * pixelSize)));
        this.leafCarryPoint = vec2(this.cutPoint.x, this.cutPoint.y - (31.25 * 1.25 * pixelSize));
    }

    drawJawControls()
    {
        if(this.rotationMode)
        {
            renderer.globalAlpha = 0.6;
            this.headSprite.drawScIn(vec2((Math.floor(this.headImageIndex/2.0)) * this.headImageFrameSize.x, 0), this.headImageFrameSize);

            this.headCutJawSprite.transform.position = this.headCutJawSprite.transform.position.add(this.headCutJawVibrationOffset);
            this.headCutJawSprite.drawSc();
            this.headCutJawSprite.transform.position = this.headCutJawSprite.transform.position.subtract(this.headCutJawVibrationOffset);

            this.headLeadJawSprite.transform.rotation += this.headLeadJawRotationOffset;
            var tempPos = vec2(this.headLeadJawSprite.transform.position.x, this.headLeadJawSprite.transform.position.y);
            this.headLeadJawSprite.transform.position = rotateAroundPoint(this.headLeadJawSprite.transform.position,
                this.headLeadJawSprite.transform.position.subtract(vec2(0, 30*pixelSize)), this.headLeadJawRotationOffset);
            this.headLeadJawSprite.drawScRot();
            this.headLeadJawSprite.transform.rotation -= this.headLeadJawRotationOffset;
            this.headLeadJawSprite.transform.position = tempPos;
            renderer.globalAlpha = 1;
            
            var redColor = Math.floor((this.timedJawRadius - this.timedJawMinRadius)* 4.0 / pixelSize);
            var greenColor = Math.floor((this.timedJawMaxRadius - this.timedJawRadius)* 4.0 / pixelSize);
            //if(redColor > 100 && (greenColor > 100 || greenColor < 0)) { greenColor = 0; }
            //if(redColor <= 0 && greenColor <= 0) { redColor = greenColor = 127 }
            if(redColor > 150) { redColor = 255; greenColor = 0; }
            else if(greenColor > 80) { greenColor = 255; redColor = 0; }

            if (greenColor >= redColor * 0.75){
                this.isJawButtonClickable = true;
            } else {
                this.isJawButtonClickable = false;
            }

            drawCircle(renderer, this.isCuttingJawLed ? this.cuttingJawControlPos : this.leadingJawControlPos,
                this.timedJawMinRadius, true, "#ffffff44", pixelSize);
            drawCircle(renderer, this.isCuttingJawLed ? this.cuttingJawControlPos : this.leadingJawControlPos,
                this.timedJawRadius, false, this.jawSpeedPenalty <= 0 ? rgba(redColor, greenColor, 0, 0.75) : "#99999955", (this.timedJawRadius - this.timedJawMinRadius));
            renderer.lineWidth = 1;
        }
    }

    addVoidAreaWhenRotationCompletes()
    {
        if(this.cutPointLines.length > 2)
        {
            if(this.rotationCounter >= Math.PI * 2.0)
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
        this.cutLeafIndex = Math.floor(Math.random() * this.cutLeaves.length);

        this.disabling = true;
        this.secondAnt.disabled = false;
        this.secondAnt.forcedDestination = true;
        this.secondAnt.destinationPoint = vec2(60 * pixelSize, 360 * pixelSize);

        this.forcedDestination = true;
        this.destinationPoints = [];
        this.destinationPoint = vec2(-40 * pixelSize, 540 * pixelSize);
        this.destinationPointsIndex = 0;
        this.calculateDestinationPoints();

        if(totalAutoAnts < maxAutoAnts) totalAutoAnts++;

        if(typeof autoAnts != "undefined" && autoAnts.length > 0 && this == autoAnts[0].primaryAnt)
        {
            autoAnts2.splice(0, autoAnts2.length);
            autoAnts2 = [];
            for(let i = 0; i < totalAutoAnts; i++)
            {
                var an = new AutoAnt(this.leaf, vec2((-20*(i+1)) * pixelSize, (25*(i+1)) * pixelSize));
                an.setPrimaryAnt(this.secondAnt);
                autoAnts2.push(an);
            }
        }
        else if(typeof autoAnts2 != "undefined" && autoAnts2.length > 0 && typeof autoAnts2[0].primaryAnt != "undefined" && this == autoAnts2[0].primaryAnt)
        {
            autoAnts.splice(0, autoAnts.length);
            autoAnts = [];
            for(let i = 0; i < totalAutoAnts; i++)
            {
                var an = new AutoAnt(this.leaf, vec2((-20*(i+1)) * pixelSize, (25*(i+1)) * pixelSize));
                an.setPrimaryAnt(this.secondAnt);
                autoAnts.push(an);
            }
        }
        else if(typeof autoAnts2 == "undefined" && typeof autoAnts != "undefined")
        {
            autoAnts2.splice(0, autoAnts2.length);
            autoAnts2 = [];
            for(let i = 0; i < totalAutoAnts; i++)
            {
                var an = new AutoAnt(this.leaf, vec2((-20*(i+1)) * pixelSize, (25*(i+1)) * pixelSize));
                an.setPrimaryAnt(this.secondAnt);
                autoAnts2.push(an);
            }
        }
        else
        {
            autoAnts.splice(0, autoAnts.length);
            autoAnts = [];
            for(let i = 0; i < totalAutoAnts; i++)
            {
                var an = new AutoAnt(this.leaf, vec2((-20*(i+1)) * pixelSize, (25*(i+1)) * pixelSize));
                an.setPrimaryAnt(this.secondAnt);
                autoAnts.push(an);
            }
        }
    }

    onLeafCutSuccess()
    {
        this.leaf.cutterAnt = this;
        this.leaf.updatePoints = true;
        this.leaf.currentBorderIndicationIndex = -1;

        this.rotationMode = false;
        this.leaf.borderPoints[this.pointIndex] = vec2(-10000, -10000);
        this.pointIndex = -1;
        this.alternateRotation = !this.alternateRotation;

        this.isCuttingJawLed = false;

        this.timedJawRadius = this.timedJawMinRadius;
        this.jawSpeedPenalty = 0;
        this.cutTimer = 0;
        this.timedJawSpeedFactor = this.timedJawSpeedFactorDefault;

        this.leaf.getPoints(distanceBetween2AdjacentPoints);

        leafcuttingSFX[SFX_LEAFSUCCESS].volume = leafcuttingBGMMaxVolume;
        leafcuttingSFX[SFX_LEAFSUCCESS].play();
    }

    leafBorderTouchInput()
    {
        if(!this.forcedDestination)
        {
            var lastDist = 999999.9;
            for(let i = 0; i < this.leaf.borderPoints.length; i++)
            {
                if(typeof this.leaf.borderPoints[i] != "undefined")
                {
                    var dist = this.leaf.borderPoints[i].distance(vec2(touchPos[0].x - canvasStartX, touchPos[0].y - canvasStartY));
                    if(dist < lastDist)
                    {
                        lastDist = dist;

                        if(dist < this.leafBorderTouchMinimumDistance && !this.rotationMode)
                        {
                            this.destinationPoint = this.leaf.borderPoints[i];
                            this.leaf.currentBorderIndicationIndex = i;
                            this.destinationPointsIndex = 0;
                            this.destinationPoints = [];
                            this.calculateDestinationPoints();
                            this.pointIndex = i;
                        }
                    }
                }
            }
        }
    }

    calculateDestinationPoints()
    {
        if(this.destinationPoints.length <= 0)
        {
            this.destinationPoints.push(vec2(this.bodySprite.transform.position.x, this.bodySprite.transform.position.y));

            if(this.disabling)
            {
                this.destinationPoints.push(vec2(this.leaf.stemPoint.x, this.leaf.stemPoint.y));
                this.destinationPoints.push(vec2(this.destinationPoint.x, this.destinationPoint.y));
            }
            else
            {
                while(this.destinationPoints.length < 50)
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
                        && !isVectorInArray(adjacentPoints[i], this.destinationPoints))
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
                    //if(this.timedJawCutSpeedBonus <= 2.1)
                    if(!this.isJawButtonClickable)
                    {
                        this.timedJawCutSpeedBonus /= 2;

                        if(this.timedJawSpeedFactor > this.timedJawSpeedFactorMin)
                            this.timedJawSpeedFactor -= this.timedJawSpeedFactorStep;

                        leafcuttingSFX[SFX_JAWBUTTON].currentTime = 0;
                        leafcuttingSFX[SFX_JAWBUTTON].play();
                    }
                    else
                    {
                        if(this.timedJawSpeedFactor < this.timedJawSpeedFactorMax)
                            this.timedJawSpeedFactor += this.timedJawSpeedFactorStep;

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
                //Jaw Penalty Removed
                /*else
                {
                    if(this.jawSpeedPenalty < this.jawSpeedPenaltyTotalTurns)
                        this.jawSpeedPenalty = this.jawSpeedPenaltyTotalTurns;

                    leafcuttingSFX[SFX_JAWPENALTY].currentTime = 0;
                    leafcuttingSFX[SFX_JAWPENALTY].play();
                }*/
            }
            else if(isPointInCircle(vec2(touchPos[0].x - canvasStartX, touchPos[0].y - canvasStartY), this.leadingJawControlPos, this.timedJawMinRadius))
            {
                if(!this.isCuttingJawLed)
                {
                    this.timedJawCutTimeBonus = (this.timedJawMaxRadius - this.timedJawRadius) * this.timedJawCutTimeBonusFactor;
                    
                    //TIMED JAW CUT TIME PENALTY RULE
                    //if(this.timedJawCutTimeBonus <= 90)
                    if(!this.isJawButtonClickable)
                    {
                        this.timedJawCutTimeBonus -= 200;

                        if(this.timedJawSpeedFactor > this.timedJawSpeedFactorMin)
                            this.timedJawSpeedFactor -= this.timedJawSpeedFactorStep;

                        leafcuttingSFX[SFX_JAWBUTTON].currentTime = 0;
                        leafcuttingSFX[SFX_JAWBUTTON].play();
                    }
                    else
                    {
                        if(this.timedJawSpeedFactor < this.timedJawSpeedFactorMax)
                            this.timedJawSpeedFactor += this.timedJawSpeedFactorStep;

                        leafcuttingSFX[SFX_JAWTIMED].currentTime = 0;
                        leafcuttingSFX[SFX_JAWTIMED].play();
                    }

                    if(this.jawSpeedPenalty > 0 && this.timedJawCutTimeBonus > 0) this.timedJawCutTimeBonus = 0;

                    this.timedJawRadius = this.timedJawMinRadius;

                    this.timedJawCutSpeedBonus = 1;

                    this.isCuttingJawLed = true;
                }
                //Jaw Penalty Removed
                /*else
                {
                    if(this.jawSpeedPenalty < this.jawSpeedPenaltyTotalTurns)
                        this.jawSpeedPenalty = this.jawSpeedPenaltyTotalTurns;

                    leafcuttingSFX[SFX_JAWPENALTY].currentTime = 0;
                    leafcuttingSFX[SFX_JAWPENALTY].play();
                }*/
            }
        }
    }

    rotationMechanic(deltaTime)
    {
        var bgValueBorder = 100;
        var loopCount = 0;
        do
        {
            loopCount++;
            if (loopCount > 10000) break;

            if(!this.alternateRotation)
            {
                this.bodySprite.transform.rotation -= (0.025 * this.timedJawCutSpeedBonus);
                this.rotationCounter += (0.025 * this.timedJawCutSpeedBonus);
            }
            else
            {
                this.bodySprite.transform.rotation += (0.025 * this.timedJawCutSpeedBonus);
                this.rotationCounter += (0.025 * this.timedJawCutSpeedBonus);
            }
            
            moveInDir(this.bodySprite, (0.3 * pixelSize) * this.timedJawCutSpeedBonus);
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
        while ((pixelData[0] < bgValueBorder && pixelData[1] < bgValueBorder && pixelData[2] < bgValueBorder)
        || (this.cutPoint.x < 0 || this.cutPoint.y < 0 || this.cutPoint.x > gameWidth || this.cutPoint.y > gameHeight));

        if(this.addVoidAreaWhenRotationCompletes())
            this.onLeafCutSuccess();
    }

    updateAnimation(deltaTime)
    {
        //IMAGE TO IMAGE ANIMATION
        if(this.animationTimer <= 0)
        {
            if(this.headImageIndex + 1 < maxHeadFrames)
                this.headImageIndex++;
            else
                this.headImageIndex = 0;

            if(this.antAnimationFrameIndex + 1 < maxTopDownAntFrames)
                this.antAnimationFrameIndex++;
            else
                this.antAnimationFrameIndex = 0;

            this.animationTimer = this.animationDelay;
        }
        else
        {
            this.animationTimer -= deltaTime;
        }

        //PROCEDURAL/CODED ANIMATION
        if(this.rotationMode)
        {
            if(this.isCuttingJawLed)
            {
                if(this.headLeadJawRotationOffset < Math.PI/4) this.headLeadJawRotationOffset += 0.003 * deltaTime;
            }
            else if(!this.isCuttingJawLed && this.headLeadJawRotationOffset > 0)
            {
                this.headLeadJawRotationOffset -= 0.003 * deltaTime;
                this.headCutJawVibrationOffset = vec2((-5 + (Math.random() * 10)) * pixelSize, (-5 + (Math.random() * 10)) * pixelSize);
            }
            else
            {
                this.headLeadJawRotationOffset = vec2();
                this.headLeadJawRotationOffset = 0;
            }
        }
        else
        {
            this.headLeadJawRotationOffset = vec2();
            this.headLeadJawRotationOffset = 0;
        }
    }
}