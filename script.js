function sortData() {
    const dataset = document.getElementById('dataset').value.split(',').map(Number);
    const algorithm = document.getElementById('algorithm').value;
    let sortedData;

    if (algorithm === 'bubble') {
        sortedData = bubbleSort(dataset);
    } else if (algorithm === 'quick') {
        sortedData = quickSort(dataset);
    } else if (algorithm === 'merge') {
        sortedData = quickSort(dataset);
    }
 
    document.getElementById('output').innerText = `Sorted Data: ${sortedData}`;
}

function bubbleSort(arr) {
    const data = [...arr];
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length - i - 1; j++) {
            if (data[j] > data[j + 1]) {
                [data[j], data[j + 1]] = [data[j + 1], data[j]];
            }
        }
    }
    return data;
}

function quickSort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[arr.length - 1];
    const left = arr.filter((el) => el < pivot);
    const right = arr.filter((el) => el > pivot);
    return [...quickSort(left), pivot, ...quickSort(right)];
}

function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "red";
ctx.fillRect(0, 0, 150, 75);

