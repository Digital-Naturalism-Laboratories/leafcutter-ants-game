class Fungus {
    constructor(col, row) {

        this.gridCoord = {
            col: col,
            row: row
        }

        this.pixelCoord = pixelCoordAtCenterOfTileCoord(col, row);
        this.width = (fungusNest.width / 2) * pixelSize;
        this.height = (fungusNest.height / 2) * pixelSize;
    }

    update = function(){
        findPath(this.gridCoord.col, this.gridCoord.row, 16, 5);
    }

    draw = function(){
        renderer.drawImage(fungusNest, this.pixelCoord.x - (this.width / 2), this.pixelCoord.y - (this.height / 2), this.width, this.height);
        //colorCircle(this.pixelCoord.x, this.pixelCoord.y, GRID_NODE_SIZE, 'green');
    }

}