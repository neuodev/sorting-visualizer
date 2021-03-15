function selectionSort(array, position, arraySteps, colorSteps) {
  let n = array.length;
  let colorKey = colorSteps[colorSteps.length - 1].slice();
  for (let i = 0; i < n; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[min]) {
        min = j;
      }
      arraySteps.push(array.slice());
      colorKey[j] = 1;
      colorKey[min] = 3;
      colorSteps.push(colorKey.slice());
      colorKey[j] = 0;
      colorKey[min] = 0;
    }

    if (min != i) {
      [array[min], array[i]] = [array[i], array[min]];
    }
    colorKey[i] = 2;
    arraySteps.push(array.slice());
    colorSteps.push(colorKey.slice());
  }


  return;
}

export default selectionSort;
