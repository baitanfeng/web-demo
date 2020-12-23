/**
 *
 * @param {Number[][]} trips
 * @param {Number} capacity
 * @return {boolean}
 */
function carPooling(trips, capacity) {
  const tripsStart = [...trips.sort((a, b) => a[1] - b[1])];
  const tripsEnd = [...trips.sort((a, b) => a[2] - b[2])];
  
  const len = trips.length;
  let num = 0;
  let i = 0;
  let j = 0;
  while (i < len) {
    const positionStart = tripsStart[i][1];
    const positionEnd = tripsEnd[j][2];

    if (positionStart < positionEnd) {
      num = num + tripsStart[i][0];
      i++;
    } else {
      num = num - tripsEnd[j][0];
      j++;
    }

    if (num > capacity) {
      return false;
    }
  }

  return num <= capacity;
}

console.log(carPooling([[2,1,5],[3,3,7]], 4));
console.log(carPooling([[2,1,5],[3,3,7]], 5));
console.log(carPooling([[2,1,5],[3,5,7]], 3));
console.log(carPooling([[3,2,7],[3,7,9],[8,3,9]], 11));
console.log(carPooling([[9,3,4],[9,1,7],[4,2,4],[7,4,5]], 23));
