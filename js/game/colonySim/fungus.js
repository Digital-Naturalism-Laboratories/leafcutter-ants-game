class Fungus {
    constructor(col, row) {

        this.gridCoord = {
            col: col,
            row: row
        }

        this.pixelCoord = pixelCoordAtCenterOfTileCoord(col, row);

        this.sprite = new Sprite(tr(vec2(this.pixelCoord.x, this.pixelCoord.y - 15), vec2(pixelSize * 0.3, pixelSize * 0.3)), new ImageObject("images/Fungus_Nest.png", vec2(0, 0)));
       
    }

    update = function () {

        this.sprite.transform.scale = vec2(pixelSize * Math.min(colony.fungus / 12, 0.5) + 0.01, pixelSize * Math.min(colony.fungus / 12, 0.5) + 0.01);
    
    }

    resize()
    {
 
        this.pixelCoord = resizeVec2(this.pixelCoord);
        this.sprite.transform.position = resizeVec2(this.sprite.transform.position);
        this.sprite.transform.scale = vec2(pixelSize * 0.3, pixelSize * 0.3);

    }

    draw = function () {

        this.sprite.drawSc();
        
    }

}