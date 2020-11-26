/**
 * 
 * @param {String} s 
 * @return {Number} 
 */
function numberOfSubstrings(s) {
  const len = s.length;
  const chars = new Array(100).fill(0);
  let ans = 0;

  for (let i = 0, j = 0; i < len; i++) {
    if (i > 0) {
      chars[s[i - 1].charCodeAt()]--;
    }

    if (checkChar(chars)) {
      ans += len - j + 1;
      continue;
    }

    while(j < len) {
      chars[s[j].charCodeAt()]++;
      if (checkChar(chars)) {
        ans += len - j;
        j++;
        break;
      }
      j++;
    }
  }

  return ans;
}

function checkChar(chars) {
  return chars[97] > 0
    && chars[98] > 0
    && chars[99] > 0;
}

console.log(numberOfSubstrings('abcabc'));
console.log(numberOfSubstrings('aaacb'));
console.log(numberOfSubstrings('abc'));