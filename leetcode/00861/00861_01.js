/**
 * 
 * @param {Number[][]} A 
 * @return {Number}
 */
function matrixScore(A) {
  const rowCount = A.length;
  const colCount = A[0].length;
  let ans = 0;

  for (let i = 0; i < rowCount; i++) {
    if (A[i][0] === 0) {
      for (let j = 0; j < colCount; j++) {
        A[i][j] = A[i][j] ^ 1;
      }
    }
  }

  for (let j = 0; j < colCount; j++) {
    let zeroCount = 0;
    for (let i = 0; i < rowCount; i++) {
      if (A[i][j] === 0) zeroCount++;
    }
    const count = Math.max(zeroCount, rowCount - zeroCount);
    ans += (2**(colCount - j - 1)) * count;
  }

  return ans;
}

console.log(matrixScore([[0,0,1,1],[1,0,1,0],[1,1,0,0]]));