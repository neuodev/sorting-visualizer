function insertionSort(array, position, arraySteps, colorSteps) {
  let colorKey = colorSteps[colorSteps.length - 1].slice();
  let n = array.length;
  for (let i = 1; i < n; i++) {
    let current = array[i];
    let j = i - 1;
    while (j > -1 && current < array[j]) {
      array[j + 1] = array[j];
      j--;
      arraySteps.push(array.slice());
      colorKey[j + 1] = 3;
      // color all the sorted sub array 
      for (let k = 0; k < i - 1; k++) {
        if (k === j + 1) {
          colorKey[k] = 3;
        } else {
          colorKey[k] = 1;
        }
      }
      colorSteps.push(colorKey.slice());
      colorKey[j + 1] = 0;
      colorKey[j] = 0;
    }
    array[j + 1] = current;
    // colorKey[array.length - 1 - i] = 2;
    arraySteps.push(array.slice());
    colorSteps.push(colorKey.slice());
  }
  colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
  return array;
}

export default insertionSort;
