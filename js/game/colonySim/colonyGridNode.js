class ColonyGridNode {
    constructor(row, col, tileType) {

        this.gridCoord = {
            x: col,
            y: row
        }

        this.pixelCoord = pixelCoordAtCenterOfTileCoord(col, row);

        //this.tileType = tileType;
        this.isWalkable = (tileType === COLONY_WALL) ? false : true;

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
        //if (this.isWalkable) {
        //renderer.fillStyle = 'green';
        //renderer.fillRect(this.pixelCoord.x, this.pixelCoord.y, GRID_NODE_SIZE * pixelSize, GRID_NODE_SIZE * pixelSize);
        //}

        //if (this.isWalkable && this.gCost < 100) {
        if (this.isWalkable && this.distanceFromFungus < (totalMilliseconds / 500) || colonyGridTileMap[this.gridCoord.y][this.gridCoord.x] === 9) {
            renderer.drawImage(colonyTiles[colonyGridTileMap[this.gridCoord.y][this.gridCoord.x]], this.pixelCoord.x - (GRID_NODE_SIZE * pixelSize / 2), this.pixelCoord.y - (GRID_NODE_SIZE * pixelSize / 2), GRID_NODE_SIZE * pixelSize, GRID_NODE_SIZE * pixelSize);
        }

        renderer.font = (14 * pixelSize).toString() + "px SmallBoldPixel";
        renderer.fillStyle = "white";
        renderer.textAlign = "center";

        if (this.distanceFromFungus != null) {
            //renderer.fillText(Math.floor(this.distanceFromFungus), this.pixelCoord.x, this.pixelCoord.y);
        }

        //if (worker.pathToDestination != undefined) {
        //    for (var k = 0; k < worker.pathToDestination.length; k++) {
        //        if (worker.pathToDestination[k] === this) {
        //            renderer.fillStyle = 'yellow';
        //            renderer.fillRect(this.pixelCoord.x, this.pixelCoord.y, GRID_NODE_SIZE * pixelSize, GRID_NODE_SIZE * pixelSize);
        //        }
        //    }
        //}

        //if (this.gCost < (totalMilliseconds / 1000) && this.isWalkable) {
        //    renderer.drawImage(colonyTiles[COLONY_TUNNEL_4WAY], this.pixelCoord.x, this.pixelCoord.y, GRID_NODE_SIZE * pixelSize, GRID_NODE_SIZE * pixelSize);
        //}
    }
}