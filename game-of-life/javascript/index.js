(function IIFE() {
    var gridSize = 600;
    var pixelSize = 3;
    var speed = 1000 / 24;
    var rowLength = (colLength = gridSize / pixelSize);
    var grid, transferGrid;

    init();

    function init() {
        let [canvas, context] = constructGridCanvas();
        prependGridCanvasToDocumentBody(canvas);

        grid = buildGridOfSize(rowLength);
        transferGrid = buildGridOfSize(rowLength);

        buildInitialGridState(context);

        animate({ context, speed });
    }

    function animate({ context, speed = 0 }) {
        if (speed === 0) {
            animateNormally(context);
        } else {
            animateWithSpeed({ context, speed });
        }
    }

    function animateNormally(context) {
        progressGenerations(context);
        requestAnimationFrame(function() {
            animateNormally(context);
        });
    }

    function animateWithSpeed({ context, speed }) {
        setInterval(function() {
            progressGenerations(context);
        }, speed);
    }

    function constructGridCanvas() {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");

        canvas.style.border = "1px solid black";
        context.canvas.width = context.canvas.height = gridSize;
        return [canvas, context];
    }

    function prependGridCanvasToDocumentBody(canvas) {
        document.body.prepend(canvas);
    }

    function buildGridOfSize(size) {
        var rows = (cols = size);
        var arr = [];
        for (let i = 0; i < rows; i++) {
            arr.push([]);
        }
        return arr;
    }

    function buildInitialGridState(context) {
        loopThroughGrid({ pixelFn: populateGrid, context });
    }

    function loopThroughGrid({
        startIndex = 0,
        endIndex = rowLength,
        pixelFn,
        context
    }) {
        for (let row = startIndex; row < endIndex; row++) {
            for (let col = startIndex; col < endIndex; col++) {
                pixelFn({ row, col, context });
            }
        }
    }

    function populateGrid({ row, col, context }) {
        grid[row][col] = getRandomBinary();
        drawPixel({ context, row, col, alive: grid[row][col] });
    }

    function getRandomBinary() {
        return Math.floor(Math.random() * 2);
    }

    function drawPixel({ context, row, col, alive }) {
        if (alive) {
            context.fillRect(
                row * pixelSize,
                col * pixelSize,
                pixelSize,
                pixelSize
            );
        }
    }

    function progressGenerations(context) {
        context.clearRect(0, 0, gridSize, gridSize);
        loopThroughGrid({
            pixelFn: setLifeState,
            startIndex: 1,
            endIndex: rowLength - 1,
            context
        });
        loopThroughGrid({
            pixelFn: updateLifeState,
            context
        });
    }

    function setLifeState({ row, col }) {
        var totalLivingNeighbors = getLivingNeighbors(row, col);
        var aliveOrDead =
            grid[row][col] === 0
                ? totalLivingNeighbors === 3
                    ? 1
                    : 0
                : totalLivingNeighbors === 2 || totalLivingNeighbors === 3
                    ? 1
                    : 0;
        transferGrid[row][col] = aliveOrDead;
    }

    function updateLifeState({ row, col, context }) {
        grid[row][col] = transferGrid[row][col];
        drawPixel({ row, col, context, alive: grid[row][col] });
    }

    function getLivingNeighbors(row, col) {
        let total = 0;
        total += grid[row - 1][col - 1];
        total += grid[row - 1][col];
        total += grid[row - 1][col + 1];

        total += grid[row][col - 1];
        total += grid[row][col + 1];

        total += grid[row + 1][col - 1];
        total += grid[row + 1][col];
        total += grid[row + 1][col + 1];

        return total;
    }
})();
