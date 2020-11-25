/**
 * 
 * @param {String} num1 
 * @param {String} num2 
 * @return {String} 
 */
function multiply(num1, num2) {
  if (num1 === '0' || num2 === '0') return '0';

  const m = num1.length;
  const n = num2.length;
  const ansArr = new Array(m + n).fill(0);

  for (let i = m - 1; i >= 0; i--) {
    const x = num1[i] - '0';
    for (let j = n - 1; j >= 0; j--) {
      const y = num2[j] - '0';
      ansArr[i + j + 1] += x * y;
    }
  }

  for (let i = m + n - 1; i > 0; i--) {
    ansArr[i - 1] += Math.floor(ansArr[i] / 10);
    ansArr[i] %= 10;
  }

  const ans = ansArr.join('');
  return ans[0] === '0' ? ans.substring(1) : ans;
}

console.log(multiply('2', '3'));
console.log(multiply('123', '456'));