const { SetupAndRunAlgorithm } = require("../../_utilities/javascript");

const HeapSort = list => {
    BuildMaxHeap(list);
    for (let i = list.length - 1; i > 0; i--) {
        swap(list, i, 0);
        list.heap_size = list.heap_size - 1;
        MaxHeapify(list, 0);
    }
};

const BuildMaxHeap = list => {
    list.heap_size = list.length;
    for (let i = Math.floor(list.heap_size / 2); i >= 0; i--) {
        MaxHeapify(list, i);
    }
};

const MaxHeapify = (list, index) => {
    let largest = index;
    let left = GetLeftChildNode(index);
    let right = GetRightChildNode(index);

    if (left < list.heap_size && list[left] > list[largest]) {
        largest = left;
    }

    if (right < list.heap_size && list[right] > list[largest]) {
        largest = right;
    }

    if (largest !== index) {
        swap(list, index, largest);
        MaxHeapify(list, largest);
    }
};

const swap = (list, index, largest) => {
    let tmp = list[index];
    list[index] = list[largest];
    list[largest] = tmp;
};

const GetLeftChildNode = index => (index << 1) + 1;

const GetRightChildNode = index => (index << 1) + 2;

const result = new SetupAndRunAlgorithm({
    fn: (Heap_Sort = list => {
        HeapSort(list);
    }),
    length: 10000000
});
