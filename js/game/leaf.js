
var distanceBetween2AdjacentPoints = 0;
var _getPoints = false;

class Leaf
{
    constructor()
    {
        distanceBetween2AdjacentPoints = pixelSize*24;

        this.leafSprite = new Sprite(tr(vec2(gameWidth/2, gameHeight/2), vec2(pixelSize*2, pixelSize*2)),
            new ImageObject("images/UncutLeaf.png", vec2(gameWidth, gameHeight)));
        this.stemSprite = new Sprite(tr(vec2(gameWidth/2, gameHeight/2), vec2(pixelSize*2, pixelSize*2)),
            new ImageObject("images/leafToCutStem.png", vec2(gameWidth, gameHeight)));
        this.bgSprite = new Sprite(tr(vec2(gameWidth/2, gameHeight/2), vec2(pixelSize*2, pixelSize*2)),
            new ImageObject("images/leafCuttingBG.png", vec2(gameWidth, gameHeight)));
        this.points = [];
        this.borderPoints = [];
        this.voidAreas = [];

        this.leafCanvas = document.createElement('canvas');
        this.leafCanvas.width = gameWidth;
        this.leafCanvas.height = gameHeight;
        this.leafCanvasRenderer = this.leafCanvas.getContext("2d");
        
        this.start = true;
        this.updatePoints = true;
        this.onceUpdated = false;
    }

    update(deltaTime)
    {
        this.winCondition(deltaTime);
    }

    draw()
    {
        this.bgSprite.drawSc();
        this.stemSprite.drawSc();
        this.leafSprite.drawSc();
        this.updatePointsMechanism();
        this.drawPoints(false);
    }

    updatePointsMechanism()
    {
        if(this.start || typeof this.cutterAnt != "undefined")
        {
            if(this.updatePoints)
            {
                this.updateLeafSprite();

                this.updatePoints = false;
            }

            if(_getPoints)
            {
                this.getPoints(distanceBetween2AdjacentPoints);
                if(typeof this.cutterAnt != "undefined")
                {
                    this.cutterAnt.antDestionationAfterLeafCutSuccess();
                    this.cutterAnt = undefined;
                }

                this.start = false;

                _getPoints = false;
            }
        }
    }

    drawPoints(onlyBorders)
    {
        if(!onlyBorders)
        {
            for(let i = 0; i < this.points.length; i++)
            {
                drawCircle(renderer, this.points[i], 1 * pixelSize, true, "white", 1);
            }
        }

        for(let i = 0; i < this.borderPoints.length; i++)
        {
            drawCircle(renderer, this.borderPoints[i], 2 * pixelSize, true, "red", 1);
        }
    }

    getPoints(borderTestResolutionFactor)
    {
        var borderPixelComparionDistance = borderTestResolutionFactor;
        var bgValueBorder = 100;

        var prevPoints = this.points.length;
        this.points = [];
        this.borderPoints = [];

        for(let y = borderPixelComparionDistance; y < gameHeight-borderPixelComparionDistance; y+=borderTestResolutionFactor)
        {
            for(let x = borderPixelComparionDistance; x < gameWidth-borderPixelComparionDistance; x+=borderTestResolutionFactor)
            {
                var thisPixel = spritesRenderer.getImageData(x, y, 1, 1).data;
                var leftPixel = spritesRenderer.getImageData(x-borderPixelComparionDistance, y, 1, 1).data;
                var rightPixel = spritesRenderer.getImageData(x+borderPixelComparionDistance, y, 1, 1).data;
                var upPixel = spritesRenderer.getImageData(x, y-borderPixelComparionDistance, 1, 1).data;
                var downPixel = spritesRenderer.getImageData(x, y+borderPixelComparionDistance, 1, 1).data;
                if(!(thisPixel[0] < bgValueBorder && thisPixel[1] < bgValueBorder && thisPixel[2] < bgValueBorder))
                {
                    if(
                        (leftPixel[0] < bgValueBorder && leftPixel[1] < bgValueBorder && leftPixel[2] < bgValueBorder)
                        || (rightPixel[0] < bgValueBorder && rightPixel[1] < bgValueBorder && rightPixel[2] < bgValueBorder)
                        || (upPixel[0] < bgValueBorder && upPixel[1] < bgValueBorder && upPixel[2] < bgValueBorder)
                        || (downPixel[0] < bgValueBorder && downPixel[1] < bgValueBorder && downPixel[2] < bgValueBorder)
                    )
                    {
                        this.borderPoints.push(vec2(x,y));

                        this.onceUpdated = true;
                    }

                    this.points.push(vec2(x,y));
                }
            }
        }
        var leafPointsRemoved = prevPoints - this.points.length;
        if(leafPointsRemoved > 0) leafcuttingScore += leafPointsRemoved * 10;
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
        if((this.borderPoints.length <= 10 || this.borderPoints.length == this.points.length)
        && leafcuttingTimeLeft > 0 && !this.updatePoints && !_getPoints && this.onceUpdated)
        {
            if(!areLeafcuttingAntsDisabled())
            {
                leafcuttingSFX[SFX_PLAYERWIN].volume = leafcuttingBGMMaxVolume;
                leafcuttingSFX[SFX_PLAYERWIN].play();
                leafcuttingHint = leafcuttingHints[LEAFCUTTINGHINT_WIN];
                leafcuttingDisableBothAnts();
            }
            else if(!leafcuttingSFX[SFX_PLAYERWIN].isPlaying && leafcuttingSFX[SFX_PLAYERWIN].volume <= 0.4)
            {
                leafMaterial += leafcuttingScore * leafcuttingWinBonus;
                leafcuttingResetGame();
                ui.stateIndex = COLONYGAMEUI;
            }
            else if(leafcuttingSFX[SFX_PLAYERWIN].volume > 0.4)
            {
                leafcuttingSFX[SFX_PLAYERWIN].volume -= 0.00005 * deltaTime;
            }
        }
    }
}