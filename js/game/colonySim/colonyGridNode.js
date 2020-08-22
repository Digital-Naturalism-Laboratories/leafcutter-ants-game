class ColonyGridNode {
    constructor(row, col, tileType) {

        this.gridCoord = {
            col: col,
            row: row
        }

        this.pixelCoord = pixelCoordAtCenterOfTileCoord(col, row);

        this.isWalkable = (tileType === COLONY_WALL) ? false : true;
        this.isTunneled = false;

        this.neighborNodes = [];
        this.parentNode;
        this.path = [];

        this.distanceFromFungus = 0;
        this.gCost = 0; //distance from origin node
        this.hCost = 0; //distance to target node

    }

    fCost = function () {
        var cost = this.gCost + this.hCost
        return cost;
    }

    getIsWalkable = function () {
        return this.isWalkable;
    }

    draw = function () {

        if (this.isWalkable && this.distanceFromFungus < colony.population || colonyGridTileMap[this.gridCoord.row][this.gridCoord.col] >= 90) {
            this.isTunneled = true;
        }
        
        if (this.isTunneled){
            renderer.drawImage(colonyTiles[colonyGridTileMap[this.gridCoord.row][this.gridCoord.col]], this.pixelCoord.x - (GRID_NODE_SIZE * pixelSize / 2), this.pixelCoord.y - (GRID_NODE_SIZE * pixelSize / 2), GRID_NODE_SIZE * pixelSize, GRID_NODE_SIZE * pixelSize);
        }
        
        renderer.font = (14 * pixelSize).toString() + "px SmallBoldPixel";
        renderer.fillStyle = "white";
        renderer.textAlign = "center";

        //write distance to fungus value on each tile for troublshooting
        //if (this.distanceFromFungus != null) {
            //renderer.fillText(Math.floor(this.distanceFromFungus), this.pixelCoord.x, this.pixelCoord.y);
        //}

    }
}