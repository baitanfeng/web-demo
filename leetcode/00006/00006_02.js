/**
 * 
 * @param {String} s 
 * @param {Number} numRows
 * @return {String} 
 */
function convert(s, numRows) {
  if (numRows <= 1 || numRows >= s.length) return s;

  const len = s.length;
  const cycleLen = 2 * numRows - 2;
  let ans = '';

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j + i < len; j += cycleLen) {
      ans += s[j + i];
      if (i !== 0 && i !== numRows - 1 && j + cycleLen - i < len) {
        ans += s[j + cycleLen - i];
      }
    }
  }

  return ans;
}

console.log(convert('LEETCODEISHIRING', 3));
console.log(convert('LEETCODEISHIRING', 4));