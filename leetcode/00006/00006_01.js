/**
 * 
 * @param {String} s 
 * @param {Number} numRows
 * @return {String} 
 */
function convert(s, numRows) {
  if (numRows <= 1 || numRows >= s.length) return s;

  const ans = new Array(numRows).fill('');
  let row = 0;
  let isIncrease = false;

  for (let i = 0, len = s.length; i < len; i++) {
    ans[row] += s[i];
    if (row === 0 || row === numRows - 1) isIncrease = !isIncrease;
    row += isIncrease ? 1 : -1;
  }

  return ans.join('');
}

console.log(convert('LEETCODEISHIRING', 3));
console.log(convert('LEETCODEISHIRING', 4));