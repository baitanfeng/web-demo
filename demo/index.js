/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
const minKBitFlips = function (A, K) {
  const n = A.length;
  const diff = new Array(n + 1).fill(0);
  let ans = 0;
  let revCnt = 0;

  for (let i = 0; i < n; i++) {
    revCnt += diff[i];
    if ((A[i] + revCnt) % 2 === 0) {
      if (i + K > n) return -1;

      ans++;
      revCnt++;
      diff[i + K]--;
    }
  }

  return ans;
};

console.log(minKBitFlips([0, 1, 0], 1));
console.log(minKBitFlips([1, 1, 0], 2));
console.log(minKBitFlips([0, 0, 0, 1, 0, 1, 1, 0], 3));
