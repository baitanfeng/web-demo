/**
 * 
 * @param {Number[]} position 
 * @return {Number} 
 */
function minCostToMoveChips(position) {
  let even = 0;
  let odd = 0;

  for (let i = 0, len = position.length; i < len; i++) {
    (position[i] % 2 === 0) ? even++ : odd++;
  }

  return Math.min(even, odd);
}

console.log(minCostToMoveChips([1,2,3]));
console.log(minCostToMoveChips([2,2,2,3,3]));
console.log(minCostToMoveChips([3,3,1,2,2]));