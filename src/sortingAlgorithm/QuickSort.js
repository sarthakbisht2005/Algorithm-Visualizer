export const quickSort = (array) => {
    const animations = [];
    const arr = array.slice();

    const swap = (array, i, j) => {
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    };

    const partition = (low, high) => {
        const pivot = arr[high];
        animations.push(["pivot", high]); // Mark pivot bar

        let i = low - 1;
        for (let j = low; j < high; j++) {
            animations.push(["compare", j, high]);
            if (arr[j] < pivot) {
                i++;
                animations.push(["swap", i, j]);
                swap(arr, i, j);
            }
        }
        animations.push(["swap", i + 1, high]); // final pivot swap
        swap(arr, i + 1, high);
        return i + 1;
    };

    const quick = (low, high) => {
        if (low < high) {
            const pi = partition(low, high);
            quick(low, pi - 1);
            quick(pi + 1, high);
        }
    };

    quick(0, arr.length - 1);
    return animations;
};
