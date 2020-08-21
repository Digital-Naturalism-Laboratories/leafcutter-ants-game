
class AutoAnt
{
    constructor(leaf, destP)
    {
        this.leaf = leaf;

        this.antAnimationFrameIndex = 0;
        this.antAnimationFrameSize = vec2(150, 150);
        this.bodySprite = new Sprite(tr(vec2(-40 * pixelSize, 540 * pixelSize),vec2(pixelSize/2.5,pixelSize/2.5)),
            new ImageObject("images/Animations/TopDown_Soldier_Ant_Spritesheet.png"), vec2(4950, 150) );
        this.bodySprite.transform.rotation = -Math.PI/4;
        this.cutPoint = vec2();

        this.cutLeaves = [];
        for(let i = 1; i <= 13; i++)
        {
            this.cutLeaves.push(new Sprite(tr(vec2(), vec2(pixelSize*2, pixelSize*2)),
                new ImageObject("images/CutLeaves/" + i.toString() + ".png", vec2(gameWidth, gameHeight))));
        }
        this.cutLeafIndex = -1;
        this.leafCarryPoint = vec2();

        this.animationTimer = 0;
        this.animationDelay = 60/2;

        this.isCuttingJawLed = false;
        this.timedJawCutSpeedBonus = 0;
        this.cutDuration = 100;
        this.cutTimer = 0;
        this.rotationMode = false;
        this.alternateRotation = true;
        this.rotationCounter = 0.0;

        this.cutPointLines = [];
        this.cutPointDelay = 100.0;
        this.cutPointTimer = this.cutPointDelay;

        this.forcedDestination = true;
        this.destinationPoints = [];
        this.destinationPointsIndex = -1;
        this.destinationPoint = vec2(60 * pixelSize, 360 * pixelSize).add(destP);
        this.pointIndex = -1;

        this.disabled = false;
        this.disabling = false;

        this.leafBorderTouchMinimumDistance = 50 * pixelSize;

        this.updatingJawTransform();
    }

    setPrimaryAnt(primaryAnt)
    {
        this.primaryAnt = primaryAnt;
    }

    event()
    {
        if(!this.disabled)
        {
            if(this.cutTimer <= 0)
            {
                this.cutTimer = this.primaryAnt.cutTimer * 1.75;
                this.timedJawCutSpeedBonus = this.primaryAnt.timedJawCutSpeedBonus * 1.5;
            }

            if(this.primaryAnt.pointIndex > -1 && this.pointIndex <= -1)
            {
                do
                {
                    this.pointIndex = Math.floor(Math.random() * this.leaf.borderPoints.length);

                    if(this.pointIndex == this.primaryAnt.pointIndex)
                    {
                        if(this.pointIndex > 0)
                            this.pointIndex--;
                        else
                            this.pointIndex++;
                    }
                } while((this.leaf.borderPoints[this.pointIndex].distance(this.leaf.stemPoint) < 112 * pixelSize && this.leaf.borderPoints.length > 25)
                || (this.leaf.borderPoints[this.pointIndex].x < -9999 || this.leaf.borderPoints[this.pointIndex].y < -9999));

                this.destinationPoint = this.leaf.borderPoints[this.pointIndex];
                this.destinationPointsIndex = 0;
                this.destinationPoints = [];
                this.calculateDestinationPoints();
            }

            if(this.primaryAnt.disabled) this.disabled = true;
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
                    this.cutLeafIndex = -1;
                }
            }
            else if(!this.rotationMode && this.pointIndex > -1)
            {
                this.rotationMode = true;
                this.cutPointLines = [];
                this.cutPointTimer = this.cutPointDelay;
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

            this.updateAnimation(deltaTime);
        }
        
        if(this.primaryAnt.disabling && this.rotationMode)
        {
            this.returnWithoutLeaf();
        }
    }

    draw(deltatime)
    {
        if(!this.disabled)
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
        }
    }

    drawLeafCuttingLines()
    {
        var bgValueBorder = 100;
        for(let i = 0; i < this.cutPointLines.length-1; i++)
        {
            var pixelData1 = renderer.getImageData(this.cutPointLines[i].x, this.cutPointLines[i].y, 1, 1).data;
            var pixelData2 = renderer.getImageData(this.cutPointLines[i+1].x, this.cutPointLines[i+1].y, 1, 1).data;
            if((pixelData1[0] >= bgValueBorder || pixelData1[1] >= bgValueBorder || pixelData1[2] >= bgValueBorder)
            || (pixelData2[0] >= bgValueBorder || pixelData2[1] >= bgValueBorder || pixelData2[2] >= bgValueBorder))
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
        /*else if(this.disabling)
        {
            targetAngle = vec2(-60 * pixelSize, 550 * pixelSize).angle(this.bodySprite.transform.position);
            this.bodySprite.transform.rotation = targetAngle;
        }*/
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

    returnWithoutLeaf()
    {
        this.rotationMode = false;
        this.leaf.borderPoints[this.pointIndex] = vec2(-10000, -10000);
        this.pointIndex = -1;
        this.antDestionationAfterLeafCutSuccess();
        this.cutLeafIndex = -1; //no leaf to carry back
        this.alternateRotation = !this.alternateRotation;
        this.isCuttingJawLed = false;
        this.jawSpeedPenalty = 0;
        this.cutTimer = 0;
        this.timedJawSpeedFactor = this.timedJawSpeedFactorDefault;
    }

    antDestionationAfterLeafCutSuccess()
    {
        this.cutLeafIndex = Math.floor(Math.random() * this.cutLeaves.length);
        this.disabling = true;
        this.forcedDestination = true;
        this.destinationPoints = [];
        this.destinationPoint = vec2(-40 * pixelSize, 540 * pixelSize);
        this.destinationPointsIndex = 0;
        this.calculateDestinationPoints();
    }

    onLeafCutSuccess()
    {
        //this.leaf.cutterAutoAnt = this;
        this.leaf.cutterAnt = this;

        this.leaf.updatePoints = true;

        this.rotationMode = false;
        this.leaf.borderPoints[this.pointIndex] = vec2(-10000, -10000);
        this.pointIndex = -1;
        this.alternateRotation = !this.alternateRotation;
        this.isCuttingJawLed = false;
        this.jawSpeedPenalty = 0;
        this.cutTimer = 0;
        this.timedJawSpeedFactor = this.timedJawSpeedFactorDefault;

        this.leaf.getPoints(distanceBetween2AdjacentPoints);

        leafcuttingSFX[SFX_LEAFSUCCESS].volume = leafcuttingBGMMaxVolume/5;
        leafcuttingSFX[SFX_LEAFSUCCESS].play();

        this.antDestionationAfterLeafCutSuccess();
    }

    calculateDestinationPoints()
    {
        if(this.destinationPoints.length <= 0)
        {
            this.destinationPoints.push(vec2(this.bodySprite.transform.position.x, this.bodySprite.transform.position.y));

            if(this.disabling)
            {
                this.destinationPoints.push(vec2(this.leaf.stemPoint.x, this.leaf.stemPoint.y));
                this.destinationPoints.push(vec2(-60 * pixelSize, 550 * pixelSize));
                this.destinationPoints.push(vec2(-99999 * pixelSize, 99999 * pixelSize));
                this.destinationPoints.push(vec2(-99999 * pixelSize, 99999 * pixelSize));
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

    rotationMechanic(deltaTime)
    {
        var bgValueBorder = 100;
        do
        {
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
    }
}