let data = [];
const input = document.getElementById('dataset');
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const submit = document.getElementById("submit");

const animationSpeed = 200;

function sleep(ms) { 
    return new Promise(r => setTimeout(r, ms)); 
}

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
    document.getElementById('data').innerText = `Raw Data: ${data}`;

}

function reset(){
    data = [];
    input.value = "";
    document.getElementById('data').innerText = "Raw Data: ";
    document.getElementById('range').innerText = "Range: "
    document.getElementById('mean').innerText = "Mean: "
    document.getElementById('median').innerText = "Median: "
    document.getElementById('stdev').innerText = "Standard Deviation: "
    canvas.width = 500;
    canvas.height = 400;
    ctx.clearRect(0, 0, canvas.width, canvas.height)

}

function drawData(arr) {
    const dataSize = arr.length;
    canvas.width = 20*dataSize+10;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const maxVal = Math.max(...arr, 1);
    const scale = (canvas.height - 10) / (maxVal * 10);
    arr.forEach((v,i) => {
      const height = v * 10 * scale;
      ctx.fillRect(20*i+10, canvas.height - height, 10, height);
    });
  }

async function sortData() {
    let dataset = data;
    const algorithm = document.getElementById('algorithm').value;

    if (algorithm === 'bubble') {
        bubbleSort(dataset);
    } else if (algorithm === 'quick') {
        quickSort(dataset);
    } else if (algorithm === 'merge') {
        mergeSort(dataset);
    }

    // ctx.fillStyle = randColor();
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    // const dataSize = dataset.length;
    // canvas.width = 20*dataSize+10;

    // let scale = sortedData[sortedData.length-1]*10/(canvas.height-10);
    // for(let i = 0; i < sortedData.length; i++){
    //     ctx.fillStyle = randColor();
    //     ctx.fillRect(20*i+10, canvas.height-sortedData[i]*10/scale, 10, sortedData[i]*10/scale);  
    // }
    
    let sortedData = data.sort((a, b) => a - b);
    document.getElementById('sorted').innerText = `Sorted Data: ${sortedData}`;
    document.getElementById('range').innerText = `Range: ${findRange(sortedData).toFixed(3)}`;
    document.getElementById('mean').innerText = `Mean: ${findMean(sortedData).toFixed(3)}`;
    document.getElementById('median').innerText = `Median: ${findMedian(sortedData).toFixed(3)}`;
    document.getElementById('stdev').innerText = `Standard Deviation: ${findStdDev(sortedData).toFixed(3)}`;

} 

async function bubbleSort(arr) {
    const nums = [...arr];
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length - i - 1; j++) {
            if (nums[j] > nums[j + 1]) {
                [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
                drawData(nums);                      
                await sleep(animationSpeed);   
            }
        }
    }
}


//switch from recurssion to a for loop
async function quickSort(arr) {
    const nums = [...arr];
    if (nums.length <= 1) drawData(nums);
    const pivot = nums[nums.length - 1];
    const left = nums.filter(el => el < pivot);
    const equal = nums.filter(el => el === pivot);
    const right = nums.filter(el => el > pivot);
    
    drawData(nums);                      
    await sleep(animationSpeed);   

    nums = [...quickSort(left), ...equal, ...quickSort(right)];
}

async function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    const result = [];
    
    //switch to for loop to make animating easier
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }

    }
}

// add all and divide by number of elements
// array doesn't have to be sorted 
function findMean(arr){
    let mean;
    let sum = 0;
    for(i = 0; i < arr.length; i++){
        sum += arr[i];
    }
    mean = sum/arr.length;
    return mean;
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
    let stdDev;
    let mean = findMean(arr);
    let sum = 0;
    for (let i = 0; i < arr.length; i++){
        sum += (arr[i]-mean) ** 2;
    }

    let variance = sum/(arr.length-1);
    stdDev = Math.sqrt(variance);
    return stdDev;
}
