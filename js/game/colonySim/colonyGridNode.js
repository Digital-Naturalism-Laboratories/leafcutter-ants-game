class ColonyGridNode {
    constructor(row, col, tileType) {

        this.gridCoord = {
            col: col,
            row: row
        }

        this.pixelCoord = pixelCoordAtCenterOfTileCoord(col, row);

        this.isWalkable = (tileType === COLONY_WALL) ? false : true;
        this.isTunneled = false;
        this.isTunneledByQueen = false;

        this.neighborNodes = [];
        this.parentNode;
        this.path = [];

        this.distanceFromFungus = 0;
        this.gCost = 0; //distance from origin node
        this.hCost = 0; //distance to target node

        //debug options
        this.displayGridCoord = false;
        this.displayDistance = false;

    }

    fCost = function () {
        var cost = this.gCost + this.hCost
        return cost;
    }

    getIsWalkable = function () {
        return this.isWalkable;
    }

    resize = function () {
        this.pixelCoord = resizeVec2(this.pixelCoord);

    }

    draw = function () {

        if (this.isWalkable && this.distanceFromFungus < colony.population || colonyGridTileMap[this.gridCoord.row][this.gridCoord.col] >= 89) {
            this.isTunneled = true;
        }

        if (this.isTunneled && queen.movementState == queen.movementStates.IDLE) {
            renderer.drawImage(colonyTiles[colonyGridTileMap[this.gridCoord.row][this.gridCoord.col]], this.pixelCoord.x - (GRID_NODE_SIZE * pixelSize / 2), this.pixelCoord.y - (GRID_NODE_SIZE * pixelSize / 2), GRID_NODE_SIZE * pixelSize, GRID_NODE_SIZE * pixelSize);
        }

        if (this.isTunneledByQueen && this.isWalkable){
            renderer.drawImage(colonyTiles[colonyGridTileMap[this.gridCoord.row][this.gridCoord.col]], this.pixelCoord.x - (GRID_NODE_SIZE * pixelSize / 2), this.pixelCoord.y - (GRID_NODE_SIZE * pixelSize / 2), GRID_NODE_SIZE * pixelSize, GRID_NODE_SIZE * pixelSize);
        }

        renderer.font = (6 * pixelSize).toString() + "px Arial";
        renderer.fillStyle = "white";
        renderer.textAlign = "center";

        //display grid coords on each tile for debuging
        if (this.displayGridCoord){
            renderer.fillText(this.gridCoord.col + "," + this.gridCoord.row, this.pixelCoord.x, this.pixelCoord.y)
        }

        //display distance to fungus value on each tile for debugging
        if (this.distanceFromFungus != null && this.displayDistance) {
            renderer.fillText(Math.floor(this.distanceFromFungus), this.pixelCoord.x, this.pixelCoord.y);
        }

    }
}