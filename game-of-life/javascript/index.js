(function InitializeGameOfLife() {
    var rowSize = window.innerWidth;
    var colSize = window.innerHeight;
    var pixelSize = 4;
    var speed = 50;
    var rowLength = rowSize / pixelSize;
    var colLength = colSize / pixelSize;
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

        context.canvas.width = rowSize;
        context.canvas.height = colSize;
        context.fillStyle = "#FFFFFF";
        return [canvas, context];
    }

    function prependGridCanvasToDocumentBody(canvas) {
        document.body.prepend(canvas);
    }

    function buildGridOfSize(rows) {
        var arr = [];
        for (let i = 0; i < rows; i++) {
            arr.push([]);
        }
        return arr;
    }

    function buildInitialGridState(context) {
        loopThroughGrid({ pixelFn: populateGrid, context });
    }

    function loopThroughGrid({ pixelFn, context }) {
        for (let row = 0; row < rowLength; row++) {
            for (let col = 0; col < colLength; col++) {
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
        context.clearRect(0, 0, rowSize, colSize);
        loopThroughGrid({
            pixelFn: setLifeState,
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

        try {
            total += grid[row - 1][col - 1];
            total += grid[row - 1][col];
            total += grid[row - 1][col + 1];
        } catch (e) {}

        total += grid[row][col - 1];
        total += grid[row][col + 1];

        try {
            total += grid[row + 1][col - 1];
            total += grid[row + 1][col];
            total += grid[row + 1][col + 1];
        } catch (e) {}

        return total;
    }
})();
