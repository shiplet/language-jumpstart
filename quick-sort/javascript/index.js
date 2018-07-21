const { SetupAndRunAlgorithm } = require("../../_utilities/javascript");

const QuickSort = list => {
    if (list.length < 2) {
        return list;
    }

    const left = [];
    const right = [];
    const pivot = list.length - 1;
    const pivotValue = list[pivot];

    list = list.slice(0, pivot).concat(list.slice(pivot + 1));

    for (let item of list) {
        item < pivotValue ? left.push(item) : right.push(item);
    }

    return QuickSort(left).concat([pivotValue], QuickSort(right));
};

const result = new SetupAndRunAlgorithm({
    fn: (Quick_Sort = list => {
        QuickSort(list);
    }),
    length: 100000
});
