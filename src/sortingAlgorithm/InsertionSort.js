export const insertionSort = (array) => {
    const animations = [];
    const arr = array.slice();

    const swap = (array, i, j) => {
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    };

    for (let i = 1; i < arr.length; i++) {
        let j = i;
        while (j > 0 && arr[j] < arr[j - 1]) {
            animations.push([j, j - 1, true]);
            swap(arr, j, j - 1);
            j--;
        }
        if (j > 0) animations.push([j, j - 1, false]);
    }
    return animations;
};
