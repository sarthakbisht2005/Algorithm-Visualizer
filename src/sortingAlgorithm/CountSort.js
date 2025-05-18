export const countSort = (array) => {
    const animations = [];
    const arr = array.slice();
    const max = Math.max(...arr);
    const count = new Array(max + 1).fill(0);

    // Count occurrences with color tracking
    for (let i = 0; i < arr.length; i++) {
        animations.push(["count", i]); // highlight counting
        count[arr[i]]++;
    }

    let idx = 0;
    for (let i = 0; i < count.length; i++) {
        while (count[i] > 0) {
            animations.push(["write", idx, i]); // write back sorted value
            arr[idx] = i;
            idx++;
            count[i]--;
        }
    }

    return animations;
};
