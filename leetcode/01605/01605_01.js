/**
 * 
 * @param {Number[]} rowSum 
 * @param {Number[]} colSum 
 * @return {Number[][]}
 */
function restoreMatrix(rowSum, colSum) {
  const rowLen = rowSum.length;
  const colLen = colSum.length;

  const ans = new Array(rowLen);
  for (let i = 0; i < rowLen; i++) {
    ans[i] = new Array(colLen).fill(0);
  }

  for (let i = 0; i < rowLen; i++) {
    ans[i][0] = rowSum[i];
  }

  for (let j = 0, colLen2 = colLen - 1; j < colLen2; j++) {
    const sum = colSum[j];

    let i = 0;
    let temp = 0;
    while(i < rowLen) {
      temp += ans[i][j];
      if (temp > sum) {
        ans[i][j + 1] = temp - sum;
        ans[i][j] -= ans[i][j + 1];

        for (let k = i + 1; k < rowLen; k++) {
          ans[k][j + 1] = ans[k][j];
          ans[k][j] = 0;
        }
        
        break;
      }
      i++;
    }
  }

  return ans;
}

console.log(restoreMatrix([3,8], [4,7]));
console.log(restoreMatrix([5,7,10], [8,6,8]));
console.log(restoreMatrix([14,9], [6,9,8]));
console.log(restoreMatrix([1,0], [1]));
console.log(restoreMatrix([0], [0]));