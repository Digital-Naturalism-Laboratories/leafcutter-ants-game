
var distanceBetween2AdjacentPoints = 0;
var _getPoints = false;

class Leaf
{
    constructor()
    {
        distanceBetween2AdjacentPoints = pixelSize*26;

        this.leafSprite = new Sprite(tr(vec2(gameWidth/2, gameHeight/2), vec2(pixelSize*2, pixelSize*2)),
            new ImageObject("images/UncutLeaf.png", vec2(gameWidth, gameHeight)));
        this.stemSprite = new Sprite(tr(vec2(gameWidth/2, gameHeight/2), vec2(pixelSize*2, pixelSize*2)),
            new ImageObject("images/leafToCutStem.png", vec2(gameWidth, gameHeight)));
        this.bgSprite = new Sprite(tr(vec2(gameWidth/2, gameHeight/2), vec2(pixelSize*2, pixelSize*2)),
            new ImageObject("images/leafCuttingBG.png", vec2(gameWidth, gameHeight)));
        this.bgBlackSprite = new Sprite(tr(vec2(gameWidth/2, gameHeight/2), vec2(pixelSize*2, pixelSize*2)),
            new ImageObject("images/leafCuttingBGBlack.png", vec2(gameWidth, gameHeight)));
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
        var rightOffset = gameWidth * 0.01;

        var topOffset = gameHeight * 0.105;
        var bottomOffset = gameHeight * 0.125;

        var borderPixelComparionDistance = borderTestResolutionFactor;

        var bgValueBorder = 100;

        var prevPoints = this.points.length;
        this.points = [];
        this.borderPoints = [];

        for(let y = topOffset + borderPixelComparionDistance; y < gameHeight-borderPixelComparionDistance - bottomOffset; y+=borderTestResolutionFactor)
        {
            for(let x = leftOffset + borderPixelComparionDistance; x < gameWidth-borderPixelComparionDistance - rightOffset; x+=borderTestResolutionFactor)
            {
                var thisPixel = spritesRenderer.getImageData(x, y, 1, 1).data;
                var leftPixel = spritesRenderer.getImageData(x-borderPixelComparionDistance, y, 1, 1).data;
                var rightPixel = spritesRenderer.getImageData(x+borderPixelComparionDistance, y, 1, 1).data;
                var upPixel = spritesRenderer.getImageData(x, y-borderPixelComparionDistance, 1, 1).data;
                var downPixel = spritesRenderer.getImageData(x, y+borderPixelComparionDistance, 1, 1).data;
                if(!(thisPixel[0] < bgValueBorder && thisPixel[1] < bgValueBorder && thisPixel[2] < bgValueBorder)
                && !(thisPixel[0] >= 254 && thisPixel[1] >= 254 && thisPixel[2] >= 254))
                {
                    if(
                        (leftPixel[0] < bgValueBorder && leftPixel[1] < bgValueBorder && leftPixel[2] < bgValueBorder)
                        || (rightPixel[0] < bgValueBorder && rightPixel[1] < bgValueBorder && rightPixel[2] < bgValueBorder)
                        || (upPixel[0] < bgValueBorder && upPixel[1] < bgValueBorder && upPixel[2] < bgValueBorder)
                        || (downPixel[0] < bgValueBorder && downPixel[1] < bgValueBorder && downPixel[2] < bgValueBorder)

                        && !
                        ((leftPixel[0] >= 254 && leftPixel[1] >= 254 && leftPixel[2] >= 254)
                        || (rightPixel[0] >= 254 && rightPixel[1] >= 254 && rightPixel[2] >= 254)
                        || (upPixel[0] >= 254 && upPixel[1] >= 254 && upPixel[2] >= 254)
                        || (downPixel[0] >= 254 && downPixel[1] >= 254 && downPixel[2] >= 254))
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
                if(leafcuttingScore >= 1000)
                    centerLabel1.text = string_AMAZING_AMOUNT_OF[currentLanguage];
                else if(leafcuttingScore >= 700)
                    centerLabel1.text = string_GOOD_AMOUNT_OF[currentLanguage];
                else if(leafcuttingScore >= 250)
                    centerLabel1.text = string_OK_AMOUNT_OF[currentLanguage];
                else
                    centerLabel1.text = string_BARELY_ANY[currentLanguage];
                centerLabel2.text = string_LeavesCollected[currentLanguage];
                centerLabel1.enabled = centerLabel2.enabled = true;

                leafcuttingSFX[SFX_PLAYERWIN].volume = leafcuttingBGMMaxVolume;
                leafcuttingSFX[SFX_PLAYERWIN].play();

                leafcuttingDisableBothAnts();
            }
            else if(!leafcuttingSFX[SFX_PLAYERWIN].isPlaying && leafcuttingSFX[SFX_PLAYERWIN].volume <= 0.4)
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
            else if(leafcuttingSFX[SFX_PLAYERWIN].volume > 0.4)
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

        /*for(let n = 0; n < pointsToStem.length - 1; n++)
        {
            drawLine(renderer, pointsToStem[n], pointsToStem[n+1], "white");
        }*/
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