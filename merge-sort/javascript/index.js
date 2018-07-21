const { SetupAndRunAlgorithm } = require("../../_utilities/javascript");

const MergeSort = list => {
    if (list.length <= 1) {
        return list;
    }

    const middle = list.length / 2;
    const left = list.slice(0, middle);
    const right = list.slice(middle);

    return Merge(MergeSort(left), MergeSort(right));
};

const Merge = (left, right) => {
    const result = [];
    while (left.length || right.length) {
        if (left.length && right.length) {
            if (left[0] < right[0]) {
                result.push(left.shift());
            } else if (left[0] === right[0]) {
                result.push(left.shift(), right.shift());
            } else {
                result.push(right.shift());
            }
        } else if (left.length) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    return result;
};

const result = new SetupAndRunAlgorithm({
    fn: (Merge_Sort = list => {
        MergeSort(list);
    }),
    length: 100000
});
