const { SetupAndRunAlgorithm } = require("../../_utilities/javascript");

const SelectionSort = list => {
    for (let i = 0; i < list.length; i++) {
        let currentMinIndex = i;
        for (let x = currentMinIndex; x < list.length; x++) {
            if (list[x] < list[currentMinIndex]) {
                currentMinIndex = x;
            }
        }

        if (currentMinIndex !== i) {
            let oldMinValue = list[i];
            list[i] = list[currentMinIndex];
            list[currentMinIndex] = oldMinValue;
        }
    }
    return list;
};

const result = new SetupAndRunAlgorithm({
    fn: (Selection_Sort = list => {
        SelectionSort(list);
    }),
    length: 1000000
});
