/**
 *
 * @param {Number[]} nums
 * @return {Number[]}
 */
function getSumAbsoluteDifferences(nums) {
  const len = nums.length;
  const result = new Array(len).fill(0);

  const num0 = nums[0];
  let sum0 = 0;
  for (let i = 1; i < len; i++) {
    sum0 += Math.abs(num0 - nums[i]);
  }
  result[0] = sum0;

  for (let i = 1; i < len; i++) {
    const subtractAbs = Math.abs(nums[i] - nums[i - 1]);
    result[i] = result[i - 1] + subtractAbs * i - subtractAbs * (len - i);
  }

  return result;
}

console.log(getSumAbsoluteDifferences([2, 3, 5]));
console.log(getSumAbsoluteDifferences([1, 4, 6, 8, 10]));
