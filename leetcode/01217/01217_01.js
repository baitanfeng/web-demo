/**
 * 
 * @param {Number[]} position 
 * @return {Number} 
 */
function minCostToMoveChips(position) {
  const map = new Map();
  for (let i = 0, len = position.length; i < len; i++) {
    const n = position[i];
    map.set(n, map.has(n) ? (map.get(n) + 1) : 1);
  }

  const arr = [...map.entries()];
  const arrLen = arr.length;
  let min = Number.MAX_SAFE_INTEGER;

  if (arrLen <= 1) return 0;

  for (let i = 0; i < arrLen; i++) {
    const [key1] = arr[i];

    let count = 0;
    for (let j = 0; j < arrLen; j++) {
      if (j === i) continue;

      const [key2, value2] = arr[j];

      if (Math.abs(key2 - key1) % 2 === 1) {
        count += value2;
      }
    }
    min = Math.min(min, count);
  }

  return min;
}

console.log(minCostToMoveChips([1,2,3]));
console.log(minCostToMoveChips([2,2,2,3,3]));
console.log(minCostToMoveChips([3,3,1,2,2]));