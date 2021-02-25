/**
 *
 * @param {Number[]} nums
 * @return {Number}
 */
function waysToMakeFair(nums) {
  const len = nums.length;

  const beforeEven = [0];
  const beforeOdd = [0];
  const afterEven = [0];
  const afterOdd = [0];

  for (let i = 1; i < len; i++) {
    const even = i % 2 === 1 ? nums[i - 1] : 0;
    const odd = i % 2 === 0 ? nums[i - 1] : 0;
    beforeEven.push(beforeEven[beforeEven.length - 1] + even);
    beforeOdd.push(beforeOdd[beforeOdd.length - 1] + odd);
  }
  for (let i = len - 2; i >= 0; i--) {
    const even = i % 2 === 1 ? nums[i + 1] : 0;
    const odd = i % 2 === 0 ? nums[i + 1] : 0;
    afterEven.push(afterEven[afterEven.length - 1] + even);
    afterOdd.push(afterOdd[afterOdd.length - 1] + odd);
  }
  afterEven.reverse();
  afterOdd.reverse();

  let ans = 0;
  for (let i = 0; i < len; i++) {
    if (beforeEven[i] + afterOdd[i] === beforeOdd[i] + afterEven[i]) ans++;
  }

  return ans;
}

console.log(waysToMakeFair([2, 1, 6, 4]));
console.log(waysToMakeFair([1, 1, 1]));
console.log(waysToMakeFair([1, 2, 3]));
