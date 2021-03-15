function heapSort(array, position, arraySteps, colorSteps) {
  let size = array.length;
  let colorKey = colorSteps[colorSteps.length - 1].slice();
  for (let i = Math.floor(size / 2 - 1); i >= 0; i--) {
    heapify(array, size, i, colorKey, colorSteps);
    arraySteps.push(array.slice());
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    colorKey[i] = 1;
    colorKey[left] = 1;
    colorKey[right] = 1;
    colorSteps.push(colorKey.slice());
    colorKey[i] = 0;
    colorKey[left] = 0;
    colorKey[right] = 0;
  }

  for (let i = size - 1; i >= 0; i--) {
    let temp = array[0];
    array[0] = array[i];
    array[i] = temp;
    arraySteps.push(array.slice());
    colorKey[i] = 1;
    colorKey[0] = 1;
    colorSteps.push(colorKey.slice());
    colorKey[i] = 0;
    colorKey[0] = 0;
    heapify(array, i, 0);
  }
  colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
  return;
}

function heapify(array, size, i) {
  let max = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < size && array[left] > array[max]) {
    max = left;
  }

  if (right < size && array[right] > array[max]) {
    max = right;
  }
  if (max != i) {
    let temp = array[i];
    array[i] = array[max];
    array[max] = temp;

    heapify(array, size, max);
  }
}

export default heapSort;
