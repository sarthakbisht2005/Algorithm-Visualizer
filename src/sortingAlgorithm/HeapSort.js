export const heapSort = (array) => {
    const animations = [];
    const arr = array.slice();

    const swap = (arr, i, j) => {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    };

    const heapify = (n, i) => {
        let largest = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;

        if (l < n) {
            animations.push(["compare", l, largest]);
            if (arr[l] > arr[largest]) largest = l;
        }
        if (r < n) {
            animations.push(["compare", r, largest]);
            if (arr[r] > arr[largest]) largest = r;
        }

        if (largest !== i) {
            animations.push(["swap", i, largest]);
            swap(arr, i, largest);
            heapify(n, largest);
        }
    };

    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
        heapify(arr.length, i);
    }

    for (let i = arr.length - 1; i > 0; i--) {
        animations.push(["pivot", 0]);          // Highlight max
        animations.push(["swap", 0, i]);        // Move max to end
        swap(arr, 0, i);
        heapify(i, 0);
    }

    return animations;
};
