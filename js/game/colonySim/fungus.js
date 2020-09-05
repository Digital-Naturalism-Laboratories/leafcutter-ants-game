class Fungus {
    constructor(col, row) {

        this.gridCoord = {
            col: col,
            row: row
        }

        this.pixelCoord = pixelCoordAtCenterOfTileCoord(col, row);
        this.width = (fungusNest.width * 0.38) * pixelSize;
        this.height = (fungusNest.height * 0.38) * pixelSize;
    }

    update = function () {
        
    }

    draw = function () {

        renderer.drawImage(fungusNest, this.pixelCoord.x - (this.width / 2), this.pixelCoord.y - 35 * pixelSize, this.width, this.height);
        
    }

}