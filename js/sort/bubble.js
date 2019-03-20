function swap(array, a, b) {
  [array[a], array[b]] = [array[b], array[a]];
}

function bubbleSort(array) {
  console.time("bubbleSort");
  let i = array.length - 1;

  while(i > 0) {
    let pos = 0;

    for (let j = 0; j < i; j++) {
      if (array[j] > array[j + 1]) {
        pos = j;
        swap(array, j, j + 1);
      }
    }

    i = pos;
  }

  console.timeEnd("bubbleSort");
  return array;
}

function bubbleSort2(array) {
  console.time("bubbleSort2");
  let end = array.length - 1;

  while(end > 0) {
    let pos = 0;

    for (let j = 0; j < end; j++) {
      if (array[j] > array[j + 1]) {
        pos = j;
        swap(array, j, j + 1);
      }
    }

    end = pos;
  }

  console.timeEnd("bubbleSort2");
  return array;
}

let array = [5, 4, 3, 2, 1];
let array2 = [5, 4, 3, 2, 1];
console.log(bubbleSort(array));
console.log(bubbleSort2(array2));