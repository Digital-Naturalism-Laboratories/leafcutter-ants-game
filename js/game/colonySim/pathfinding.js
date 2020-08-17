function findPath(originCol, originRow, destinationCol, destinationRow) {
    var originNode = colonyGridNodes[originRow][originCol];
    var destinationNode = colonyGridNodes[destinationRow][destinationCol];

    var openSet = [];
    var closedSet = [];

    openSet.push(originNode);

    while (openSet.length > 0) {
        var currentNode = openSet[0];
        for (var i = 1; i < openSet.length; i++) {
            if (openSet[i].fCost() < currentNode.fCost() || (openSet[i].fCost() == currentNode.fCost() && openSet[i].hCost < currentNode.hCost)) {
                currentNode = openSet[i];
            }
        }

        closedSet.push(openSet.pop());

        if (currentNode === destinationNode) {
            console.log("path found");
            return retracePath(originNode, destinationNode);
        }

        var neighbors = getNeighbors(currentNode);
        for (i = 0; i < neighbors.length; i++) {

            if (!neighbors[i].isWalkable || closedSet.includes(neighbors[i])) {
                continue;
            }

            var newMovementCostToNeighbor = currentNode.gCost + getDistance(currentNode, neighbors[i]);
            if (newMovementCostToNeighbor < neighbors[i].gCost || !openSet.includes(neighbors[i])) {
                neighbors[i].gCost = newMovementCostToNeighbor;
                neighbors[i].hCost = getDistance(neighbors[i], destinationNode);

                neighbors[i].parent = currentNode;

                if (!openSet.includes(neighbors[i])) {
                    openSet.push(neighbors[i]);
                }
                
            }
        }

    }
}

function getDistance(nodeA, nodeB) {
    var distanceX = Math.abs(nodeA.gridCoord.x - nodeB.gridCoord.x);
    var distanceY = Math.abs(nodeA.gridCoord.y - nodeB.gridCoord.y);

    if (distanceX > distanceY) {
        return (14 * distanceY + 10 * (distanceX - distanceY));
    } else {
        return (14 * distanceX + 10 * (distanceY - distanceX));
    }
}

function retracePath(originNode, destinationNode) {
    var path = [];
    var currentNode = destinationNode

    while (currentNode != originNode) {
        path.push(currentNode);
        currentNode = currentNode.parent;
    }

    path.reverse();
    return path;
}