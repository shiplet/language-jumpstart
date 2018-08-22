(function IIFE() {
    var gridHeight = 400;
    var gridWidth = 400;
    var perceivedWidth = 400;
    var step =
        document.getElementById("myCanvas").getAttribute("width") /
        perceivedWidth;
    var theGrid = createArray(gridWidth);
    var nextGenerationGrid = createArray(gridWidth);

    init();

    function init() {
        populateUniverse();
        animate();
    }

    function animate() {
        drawGrid();
        updateGrid();
        requestAnimationFrame(animate);
    }

    function createArray(rows) {
        var arr = [];
        for (var i = 0; i < rows; i++) {
            arr[i] = [];
        }
        return arr;
    }

    function populateUniverse() {
        for (var row = 0; row < gridHeight; row++) {
            for (var col = 0; col < gridWidth; col++) {
                var aliveOrDead = Math.floor(Math.random() * 2);
                theGrid[row][col] = aliveOrDead;
            }
        }
    }

    function drawGrid() {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, gridWidth, gridHeight);
        for (var row = 1; row < gridHeight; row += step) {
            for (var col = 1; col < gridWidth; col += step) {
                if (theGrid[row][col] === 1) {
                    ctx.fillStyle = "#000000";
                    ctx.fillRect(row, col, step, step);
                }
            }
        }
    }

    function getTotalSurroundingCells(row, col) {
        var totalCells = 0;

        totalCells += theGrid[row - 1][col - 1];
        totalCells += theGrid[row - 1][col];
        totalCells += theGrid[row - 1][col + 1];

        totalCells += theGrid[row][col - 1];
        totalCells += theGrid[row][col + 1];

        totalCells += theGrid[row + 1][col - 1];
        totalCells += theGrid[row + 1][col];
        totalCells += theGrid[row + 1][col + 1];

        return totalCells;
    }

    function isAliveOrDead(currentState, totalNeighbors) {
        return currentState === 0
            ? totalNeighbors === 3
                ? 1
                : 0
            : totalNeighbors === 2 || totalNeighbors === 3
                ? 1
                : 0;
    }

    function syncGrids() {
        for (var row = 0; row < gridHeight; row++) {
            for (var col = 0; col < gridWidth; col++) {
                theGrid[row][col] = nextGenerationGrid[row][col];
            }
        }
    }

    function updateGrid() {
        for (var row = 1; row < gridHeight - 1; row++) {
            for (var col = 1; col < gridWidth - 1; col++) {
                var totalCells = getTotalSurroundingCells(row, col);
                var nextState = isAliveOrDead(theGrid[row][col], totalCells);
                nextGenerationGrid[row][col] = nextState;
            }
        }
        syncGrids();
    }
})();
