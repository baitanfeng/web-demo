/**
 *
 * @param {Number[]} nums
 * @return {Boolean}
 */
function isPossible(nums) {
  const countMap = new Map();
  const endMap = new Map();

  for (const x of nums) {
    const count = (countMap.get(x) || 0) + 1;
    countMap.set(x, count);
  }

  for (const x of nums) {
    const count = countMap.get(x) || 0;
    if (count > 0) {
      const prevEndCount = endMap.get(x - 1) || 0;
      if (prevEndCount > 0) {
        countMap.set(x, count - 1);
        endMap.set(x - 1, prevEndCount - 1);
        endMap.set(x, (endMap.get(x) || 0) + 1);
      } else {
        const nextCount = countMap.get(x + 1) || 0;
        const nextNextCount = countMap.get(x + 2) || 0;
        if (nextCount > 0 && nextNextCount > 0) {
          countMap.set(x, count - 1);
          countMap.set(x + 1, nextCount - 1);
          countMap.set(x + 2, nextNextCount - 1);
          endMap.set(x + 2, (endMap.get(x + 2) || 0) + 1);
        } else {
          return false;
        }
      }
    }
  }

  return true;
}

console.log(isPossible([1, 2, 3, 3, 4, 4, 5, 5]));
