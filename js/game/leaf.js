
var distanceBetween2AdjacentPoints = 0;
var _getPoints = false;

class Leaf
{
    constructor()
    {
        distanceBetween2AdjacentPoints = pixelSize*26;

        this.leafSprite = new Sprite(tr(vec2(gameWidth/2, gameHeight/2), vec2(pixelSize*2, pixelSize*2)),
            new ImageObject("images/UncutLeaf.png", vec2(500, 500)));
        this.stemSprite = new Sprite(tr(vec2(gameWidth/2, gameHeight/2), vec2(pixelSize*2, pixelSize*2)),
            new ImageObject("images/leafToCutStem.png", vec2(500, 500)));
        this.bgSprite = new Sprite(tr(vec2(gameWidth/2, gameHeight/2), vec2(pixelSize*2, pixelSize*2)),
            new ImageObject("images/leafCuttingBG.png", vec2(500, 500)));
        this.bgBlackSprite = new Sprite(tr(vec2(gameWidth/2, gameHeight/2), vec2(pixelSize*2, pixelSize*2)),
            new ImageObject("images/leafCuttingBGBlack.png", vec2(500, 500)));
        this.points = [];
        this.isAttachedToStem = [];
        this.noScoreForUnattachedPointsRemoval = false;
        this.borderPoints = [];
        this.voidAreas = [];

        this.stemPoint = vec2(70 * pixelSize, 380 * pixelSize);

        this.leafCanvas = document.createElement('canvas');
        this.leafCanvas.width = gameWidth;
        this.leafCanvas.height = gameHeight;
        this.leafCanvasRenderer = this.leafCanvas.getContext("2d");
        
        this.start = true;
        this.updatePoints = true;
        this.onceUpdated = false;

        this.indicationTimer = 0;
        this.currentBorderIndicationIndex = -1;
        this.pointsUpdated = 2;
    }

    resize()
    {
        distanceBetween2AdjacentPoints = pixelSize*26;

        this.leafSprite.transform.position = vec2(gameWidth/2, gameHeight/2);
        this.leafSprite.transform.scale = vec2(pixelSize*2, pixelSize*2);

        this.stemSprite.transform.position = vec2(gameWidth/2, gameHeight/2);
        this.stemSprite.transform.scale = vec2(pixelSize*2, pixelSize*2);

        this.bgSprite.transform.position = vec2(gameWidth/2, gameHeight/2);
        this.bgSprite.transform.scale = vec2(pixelSize*2, pixelSize*2);

        this.bgBlackSprite.transform.position = vec2(gameWidth/2, gameHeight/2);
        this.bgBlackSprite.transform.scale = vec2(pixelSize*2, pixelSize*2);

        if(typeof this.points != "undefined")
        {
            for(let i = 0; i < this.points.length; i++)
            {
                this.points[i] = resizeVec2(this.points[i]);
            }
        }

        if(typeof this.borderPoints != "undefined")
        {
            for(let i = 0; i < this.borderPoints.length; i++)
            {
                this.borderPoints[i] = resizeVec2(this.borderPoints[i]);
            }
        }

        if(typeof this.points != "undefined")
        {
            for(let i = 0; i < this.points.length; i++)
            {
                this.points[i] = resizeVec2(this.points[i]);
            }
        }

        if(typeof this.voidAreas != "undefined")
        {
            for(let i = 0; i < this.voidAreas.length; i++)
            {
                for(let n = 0; n < this.voidAreas[i].length; n++)
                {
                    this.voidAreas[i][n] = resizeVec2(this.voidAreas[i][n]);
                }
            }
        }

        this.stemPoint = vec2(70 * pixelSize, 380 * pixelSize);

        this.leafCanvas.width = gameWidth;
        this.leafCanvas.height = gameHeight;
    }

    update(deltaTime)
    {
        this.winCondition(deltaTime);
    }

    draw(deltaTime)
    {
        this.bgSprite.drawSc();
        if(isFirefox) this.bgBlackSprite.drawSc();
        this.leafSprite.drawSc();
        this.updatePointsMechanism();
        this.stemSprite.drawSc();
        this.drawBorderIndication(deltaTime);
        //this.drawPoints(false);
    }

    updatePointsMechanism()
    {
        if(isFirefox)
        {
            this.drawVoidAreas();
            this.drawUnattachedPointVoidArea();
        }
        
        if(this.start || typeof this.cutterAnt != "undefined" || typeof this.cutterAutoAnt != "undefined")
        {
            if(this.updatePoints)
            {
                if(!isFirefox)
                {
                    this.updateLeafSprite();
                }
                else
                {
                    _getPoints = true;
                }

                this.updatePoints = false;
            }

            if(_getPoints)
            {
                this.getPoints(distanceBetween2AdjacentPoints);
                if(typeof this.cutterAnt != "undefined" && !this.updatePoints)
                {
                    this.cutterAnt.antDestionationAfterLeafCutSuccess();
                    this.cutterAnt = undefined;
                }

                this.cutterAutoAnt = undefined;

                this.start = false;

                _getPoints = false;
            }
        }
    }

    drawBorderIndication(deltaTime)
    {
        var indicationMaxSize = 15 * pixelSize;
        this.indicationTimer += deltaTime;

        if(this.currentBorderIndicationIndex == -1)
        {
            if(this.pointsUpdated > 0)
            {
                this.getPoints(distanceBetween2AdjacentPoints);
                this.pointsUpdated--;
            }

            for(let i = 0; i < this.borderPoints.length; i++)
            {
                if(typeof this.borderPoints[i] != "undefined" && typeof this.borderPoints[i].x != "undefined" && this.borderPoints[i].x > -9999)
                {
                    var radius = Math.sin((this.indicationTimer/500) + (i*0.05)) * indicationMaxSize;
                    drawCircle(renderer, this.borderPoints[i], radius, true, "#ffff0044", 1);
                }
            }
        }
        else if(this.currentBorderIndicationIndex >= 0)
        {
            this.pointsUpdated = 2;
            if(typeof this.borderPoints[this.currentBorderIndicationIndex] != "undefined" && typeof this.borderPoints[this.currentBorderIndicationIndex].x != "undefined" && this.borderPoints[this.currentBorderIndicationIndex].x > -9999)
            {
                var radius = Math.sin((this.indicationTimer/500) + (i*0.05)) * indicationMaxSize;
                drawCircle(renderer, this.borderPoints[this.currentBorderIndicationIndex], radius, true, "#ffffff44", 1);
            }
        }
        else
        {
            this.pointsUpdated = 2;
        }
    }

    drawPoints(onlyBorders)
    {
        if(!onlyBorders)
        {
            for(let i = 0; i < this.points.length; i++)
            {
                drawCircle(renderer, this.points[i], 3 * pixelSize, true, this.isAttachedToStem[i] ? "#ffffff55" : "#00000099", 1);
            }
        }

        for(let i = 0; i < this.borderPoints.length; i++)
        {
            drawCircle(renderer, this.borderPoints[i], 1 * pixelSize, true, "red", 1);
        }

        drawCircle(renderer, this.stemPoint, 2 * pixelSize, true, "white", 1);
    }

    getPoints(borderTestResolutionFactor)
    {
        var leftOffset = gameWidth * 0.1;
        var rightOffset = 0;

        var topOffset = gameHeight * 0.105;
        var bottomOffset = gameHeight * 0.1;

        var borderPixelComparionDistance = borderTestResolutionFactor;

        var bgValueBorder = 100;

        var prevPoints = this.points.length;
        this.points = [];
        this.borderPoints = [];

        var pixels = spritesRenderer.getImageData(0, 0, gameWidth, gameHeight);

        for(let y = topOffset + borderPixelComparionDistance; y < gameHeight-borderPixelComparionDistance - bottomOffset; y+=borderTestResolutionFactor)
        {
            for(let x = leftOffset + borderPixelComparionDistance; x < gameWidth-borderPixelComparionDistance - rightOffset; x+=borderTestResolutionFactor)
            {
                var thisIndex = (((Math.floor(y) * Math.floor(gameWidth)) + Math.floor(x)) * 4);
                if(!(pixels.data[thisIndex] < bgValueBorder && pixels.data[thisIndex+1] < bgValueBorder && pixels.data[thisIndex+2] < bgValueBorder)
                && !(pixels.data[thisIndex] >= 254 && pixels.data[thisIndex+1] >= 254 && pixels.data[thisIndex+2] >= 254))
                {
                    var leftIndex = (((Math.floor(y) * Math.floor(gameWidth)) + (Math.floor(x)-Math.floor(borderPixelComparionDistance))) * 4);
                    var rightIndex = (((Math.floor(y) * Math.floor(gameWidth)) + (Math.floor(x)+Math.floor(borderPixelComparionDistance))) * 4);
                    var upIndex = ((((Math.floor(y)-Math.floor(borderPixelComparionDistance)) * Math.floor(gameWidth)) + Math.floor(x)) * 4);
                    var downIndex = ((((Math.floor(y)+Math.floor(borderPixelComparionDistance)) * Math.floor(gameWidth)) + Math.floor(x)) * 4);

                    if(
                        (pixels.data[leftIndex] < bgValueBorder && pixels.data[leftIndex+1] < bgValueBorder && pixels.data[leftIndex+2] < bgValueBorder)
                        || (pixels.data[rightIndex] < bgValueBorder && pixels.data[rightIndex+1] < bgValueBorder && pixels.data[rightIndex+2] < bgValueBorder)
                        || (pixels.data[upIndex] < bgValueBorder && pixels.data[upIndex+1] < bgValueBorder && pixels.data[upIndex+2] < bgValueBorder)
                        || (pixels.data[downIndex] < bgValueBorder && pixels.data[downIndex+1] < bgValueBorder && pixels.data[downIndex+2] < bgValueBorder)
                        && !
                        ((pixels.data[leftIndex] >= 254 && pixels.data[leftIndex+1] >= 254 && pixels.data[leftIndex+2] >= 254)
                        || (pixels.data[rightIndex] >= 254 && pixels.data[rightIndex+1] >= 254 && pixels.data[rightIndex+2] >= 254)
                        || (pixels.data[upIndex] >= 254 && pixels.data[upIndex+1] >= 254 && pixels.data[upIndex+2] >= 254)
                        || (pixels.data[downIndex] >= 254 && pixels.data[downIndex+1] >= 254 && pixels.data[downIndex+2] >= 254))
                    )
                    {
                        this.borderPoints.push(vec2(x,y));
                        this.onceUpdated = true;
                    }

                    this.points.push(vec2(x,y));
                    this.isAttachedToStem.push(false);
                }
            }
        }

        if(this.noScoreForUnattachedPointsRemoval)
        {
            this.noScoreForUnattachedPointsRemoval = false;
        }
        else if(prevPoints > 0)
        {
            var leafPointsRemoved = this.points.length - prevPoints;
            if(leafPointsRemoved > 0) leafcuttingScore += leafPointsRemoved * 10;
        }

        var isAnyPointUnattached = false;
        for(let i = 0; i < this.points.length; i++)
        {
            if(this.calulateIsPointAttachedToStem(i))
                isAnyPointUnattached = true;
        }

        if(isAnyPointUnattached)
        {
            this.noScoreForUnattachedPointsRemoval = true;
            this.updatePoints = true;
        }
    }

    drawVoidAreas()
    {
        for(let i = 0; i < this.voidAreas.length; i++)
        {
            spritesRenderer.fillStyle = "#000000";
            spritesRenderer.beginPath();
            if(this.voidAreas[i].length > 1)
            {
                spritesRenderer.moveTo(this.voidAreas[i][0].x, this.voidAreas[i][0].y);
                for(let n = 0; n < this.voidAreas[i].length; n++)
                    spritesRenderer.lineTo(this.voidAreas[i][n].x, this.voidAreas[i][n].y)
            }
            spritesRenderer.fill();
        }
    }

    updateLeafSprite()
    {
        spritesRenderer = this.leafCanvasRenderer;

        this.leafCanvasRenderer.globalCompositeOperation = "source-over";
        this.leafSprite.drawSc();

        this.leafCanvasRenderer.globalCompositeOperation = "destination-out";
        this.drawVoidAreas();
        this.drawUnattachedPointVoidArea();

        var newLeafImage = new Image();
        newLeafImage.src = this.leafCanvas.toDataURL("image/png", 1);
        newLeafImage.width = gameWidth / (pixelSize*2);
        newLeafImage.height = gameHeight / (pixelSize*2);
        this.leafSprite.imageObject.image = newLeafImage;
        this.leafSprite.imageObject.image.onload = function() {
            _getPoints = true;
        }

        spritesRenderer = renderer;
    }

    winCondition(deltaTime)
    {
        if((this.borderPoints.length <= 15 || this.borderPoints.length == this.points.length)
        && leafcuttingTimeLeft > 0 && this.onceUpdated)
        {
            if(!areLeafcuttingAntsDisabled())
            {
                if(leafcuttingScore >= 2400)
                    leafCenterLabel1.text = string_AMAZING_AMOUNT_OF[currentLanguage];
                else if(leafcuttingScore >= 1200)
                    leafCenterLabel1.text = string_GOOD_AMOUNT_OF[currentLanguage];
                else if(leafcuttingScore >= 600)
                    leafCenterLabel1.text = string_OK_AMOUNT_OF[currentLanguage];
                else
                    leafCenterLabel1.text = string_BARELY_ANY[currentLanguage];
                leafCenterLabel2.text = string_LeavesCollected[currentLanguage];
                leafCenterLabel1.enabled = leafCenterLabel2.enabled = true;

                leafcuttingSFX[SFX_PLAYERWIN].volume = leafcuttingBGMMaxVolume;
                leafcuttingSFX[SFX_PLAYERWIN].play();

                leafcuttingDisableBothAnts();
            }
            else if(!leafcuttingSFX[SFX_PLAYERWIN].isPlaying && leafcuttingSFX[SFX_PLAYERWIN].volume <= 0.04)
            {
                leafMaterial += leafcuttingScore * leafcuttingWinBonus;
                leafcuttingResetGame();
                ui.stateIndex = DEFENSEGAMEINTROUI;

                //copied here from mainmenuUI to fix crash when starting game from leafcutting game rather than the main menu
	            defenseGame.audioManager.sfxManager.populateArrayOfEatingFungusSounds();
                defenseGame.audioManager.sfxManager.populateArrayOfFlyChasedSounds();
                defenseGame.audioManager.ambienceManager.startAmbience();
                defenseGame.audioManager.sfxManager.calculateAndSetAvoidAwkwardSilenceTimestamps();
                defenseGame.audioManager.sfxManager.flyBuzzingNormal.play();
                defenseGame.audioManager.sfxManager.groundMinimFootsteps.play();
            }
            else if(leafcuttingSFX[SFX_PLAYERWIN].volume > 0.04)
            {
                leafcuttingSFX[SFX_PLAYERWIN].volume -= 0.00005 * deltaTime;
            }
        }
    }

    calulateIsPointAttachedToStem(i)
    {
        var pointsToStem = [];
        pointsToStem.push(vec2(this.points[i].x, this.points[i].y));

        while(pointsToStem.length < 40)
        {
            if(pointsToStem[pointsToStem.length - 1].distance(this.stemPoint) <= distanceBetween2AdjacentPoints * 1.67)
            {
                pointsToStem.push(vec2(this.stemPoint.x, this.stemPoint.y));
                break;
            }

            var adjacentPoints = [];
            var pointToIgnore = -1;
            for(let i = 0; i < this.points.length; i++)
            {
                if(pointToIgnore < 0 && isPointInCircle(pointsToStem[pointsToStem.length - 1], this.points[i], distanceBetween2AdjacentPoints / 2))
                {
                    pointToIgnore = i;
                }
                else if(isPointInCircle(pointsToStem[pointsToStem.length - 1], this.points[i], distanceBetween2AdjacentPoints * 1.67))
                {
                    adjacentPoints.push(vec2(this.points[i].x, this.points[i].y));
                }
            }

            var distanceFromDestinationPoint = 999999;
            var adjacentPointIndexCloserToDestination = vec2(99999, 99999);
            for(let i = 0; i < adjacentPoints.length; i++)
            {
                var distance = this.stemPoint.distance(adjacentPoints[i]);
                if(distance < distanceFromDestinationPoint
                && !isVectorInArray(adjacentPoints[i], pointsToStem))
                {
                    distanceFromDestinationPoint = distance;
                    adjacentPointIndexCloserToDestination = adjacentPoints[i];
                }
            }

            if(adjacentPointIndexCloserToDestination.x < 99990)
            {
                pointsToStem.push(vec2(adjacentPointIndexCloserToDestination.x, adjacentPointIndexCloserToDestination.y));
            }
            else if(pointsToStem[pointsToStem.length-1].distance(this.stemPoint) <= distanceBetween2AdjacentPoints * 1.67)
            {
                pointsToStem.push(vec2(this.stemPoint.x, this.stemPoint.y));
                break;
            }
            else
            {
                break;
            }
        }

        this.isAttachedToStem[i] = pointsToStem[pointsToStem.length-1].x == this.stemPoint.x
            && pointsToStem[pointsToStem.length-1].y == this.stemPoint.y;

        if(!this.isAttachedToStem[i])
            return true;
        else
            return false;
    }

    drawUnattachedPointVoidArea()
    {
        for(let i = 0; i < this.points.length; i++)
        {
            if(!this.isAttachedToStem[i])
                drawCircle(spritesRenderer, this.points[i], distanceBetween2AdjacentPoints, true, "black");
        }
    }
}