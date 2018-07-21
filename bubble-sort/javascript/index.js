const { SetupAndRunAlgorithm } = require("../../_utilities/javascript");

function BubbleSort(list) {
    let doItAgain = false;
    const limit = list.length;
    const defaultNextVal = Number.POSITIVE_INFINITY;

    for (let i = 0; i < limit; i++) {
        let thisValue = list[i];
        let nextValue = i + 1 < limit ? list[i + 1] : defaultNextVal;

        if (nextValue < thisValue) {
            list[i] = nextValue;
            list[i + 1] = thisValue;
            doItAgain = true;
        }
    }

    if (doItAgain) {
        BubbleSort(list);
    }
    return list;
}

const result = new SetupAndRunAlgorithm({
    fn: (Bubble_Sort = list => {
        BubbleSort(list);
    }),
    length: 10000
});
