const { SetupAndRunAlgorithm } = require("../../_utilities/javascript");

const StdlibSort = list => {
    return list.sort((a, b) => a - b);
};

const result = new SetupAndRunAlgorithm({
    fn: StdlibSort,
    length: 10000000
});
