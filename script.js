let data = [];
const input = document.getElementById('dataset');
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const submit = document.getElementById("submit");

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        document.getElementById("submit").click();
    }
});


function randomElement(array){
    const random = Math.floor(Math.random() * array.length);
    return array[random];
}

function randColor(){
    let list = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
    let hex = String(randomElement(list))+String(randomElement(list))+String(randomElement(list))
                +String(randomElement(list))+String(randomElement(list))+String(randomElement(list));
    let newColor = "#"+hex;
    return newColor;
}

function addToData(){
    const newVal = input.value.split(',').map(Number);
    data = data.concat(newVal); 
    input.value = "";
    document.getElementById('output').innerText = `Raw Data: ${data}`;

}

function reset(){
    data = [];
    input.value = "";
    document.getElementById('output').innerText = `Raw Data: ${data}`;

}

function sortData() {
    let dataset = data;
    const algorithm = document.getElementById('algorithm').value;
    let sortedData;

    if (algorithm === 'bubble') {
        sortedData = bubbleSort(dataset);
    } else if (algorithm === 'quick') {
        sortedData = quickSort(dataset);
    } else if (algorithm === 'merge') {
        sortedData = mergeSort(dataset);
    }
    

    document.getElementById('output').innerText = `Sorted Data: ${sortedData}`;

    ctx.fillStyle = randColor();
    ctx.clearRect(0, 0, 500, 200)
    const dataSize = dataset.length;
    canvas.width = 20*dataSize+10;
    canvas.height = 10*sortedData[sortedData.length-1]+10;
    for(let i = 0; i < sortedData.length; i++){
        ctx.fillStyle = randColor();
        ctx.fillRect(20*i+10, canvas.height-sortedData[i]*10, 10, sortedData[i]*10);  
    }

    document.getElementById('range').innerText = `Range: ${findRange(sortedData)}`;
    document.getElementById('mean').innerText = `Mean: ${findMean(sortedData)}`;
    document.getElementById('median').innerText = `Median: ${findMedian(sortedData)}`;
    document.getElementById('stdev').innerText = `Standard Deviation: ${findStdDev(sortedData)}`;

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
    const left = arr.filter(el => el < pivot);
    const equal = arr.filter(el => el === pivot);
    const right = arr.filter(el => el > pivot);
    return [...quickSort(left), ...equal, ...quickSort(right)];
}

function mergeSort(arr) {
     if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
}

// add all and divide by number of elements
// array doesn't have to be sorted 
function findMean(arr){
    let sum = 0;
    for(i = 0; i < arr.length; i++){
        sum += arr[i];
    }
    let mean = sum/arr.length;
    return mean.toFixed(3);
}

// remove elements from either end of the sorted set until one or two remain
// if one remains thats the median, if two remail take the average of them and thets the median
// array must be sorted for this to work
function findMedian(arr){
    let median;
    let tempArr = [...arr];
    while (tempArr.length  >= 3){
        tempArr.pop();
        tempArr.shift();
    }

    if (tempArr.length == 2){
        median = (tempArr[0]+tempArr[1])/2;
        
    } else if (tempArr.length == 1){
        median = tempArr[0];
    }

    return median;
}

// largest value - smallest value
// array must be sorted for this to work
function findRange(arr){
    let range;
    range = arr[arr.length-1]-arr[0];
    return range;
}

// for every value in the data set, find the distance from the mean and square it
// sum all of these squares and divide by the size of the data set
function findStdDev(arr){
    let mean = findMean(arr);
    let sum = 0;
    for (let i = 0; i < arr.length; i++){
        sum += (arr[i]-mean) ** 2;
    }

    let variance = sum/(arr.length-1);
    let stdDev = Math.sqrt(variance);
    return stdDev.toFixed(3);
}
