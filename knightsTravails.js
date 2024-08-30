function initNeighbors(num) {
    const currentCoordinates = convertToCoordinates(num);
    const moves = [[2, 1], [2, -1], [1, 2], [1, -2], [-2, 1], [-2, -1], [-1, 2], [-1, -2]];
    const neighbors = [];
    for (let move of moves) {
        const nextCoordinates = [currentCoordinates[0] + move[0], currentCoordinates[1] + move[1]];
        if (coordinatesIsValid(nextCoordinates)) {
            neighbors.push(convertToNum(nextCoordinates));
        }
    }
    return neighbors;
}

function coordinatesIsValid(coordinates) {
    return coordinates[0] >= 0 && coordinates[0] <= 7 && coordinates[1] >= 0 && coordinates[1] <= 7;
}

function convertToNum(coordinates) {
    return coordinates[0] * 8 + coordinates[1];
}

function convertToCoordinates(num) {
    return [Math.floor(num / 8), num % 8];
}

function bfs(graph, source, par, dist) {
    const queue = [];
    dist[source] = 0;
    queue.push(source);
    while (queue.length !== 0) {
        const currentNum = queue[0];
        queue.splice(0, 1);

        for (let neighbors of graph[currentNum]) {
            if (dist[neighbors] === -1) {
                dist[neighbors] = dist[currentNum] + 1;
                par[neighbors] = currentNum;
                queue.push(neighbors);
            }
        }
    }
}

function knightMoves(sourceCoordinates, destinationCoordinates) {
    const par = Array(64).fill(-1);
    const dist = Array(64).fill(-1);
    bfs(graph, convertToNum(sourceCoordinates), par, dist);
    
    const path = [];
    let currentPosition = convertToNum(destinationCoordinates);
    while (par[currentPosition] !== -1) {
        path.unshift(convertToCoordinates(currentPosition));
        currentPosition = par[currentPosition];
    }
    path.unshift(sourceCoordinates);
    const moveTimes = dist[convertToNum(destinationCoordinates)];
    console.log(`You made it in ${moveTimes} ${(moveTimes > 1) ? "moves" : "move"}! Here's your path:`);
    path.forEach((pos) => console.log(`[${pos}]`));
}

const graph = function() {
    const graph = [];
    for (let i = 0; i < 64; i++){
        graph[i] = initNeighbors(i);
    }
    return graph;
}();




