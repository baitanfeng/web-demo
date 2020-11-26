/**
 * 
 * @param {String} s 
 * @return {Number} 
 */
function numberOfSubstrings(s) {
  const len = s.length;
  const charMap = new Map([
    ['a', 0],
    ['b', 0],
    ['c', 0]
  ]);
  let ans = 0;

  for (let i = 0, j = 0; i < len; i++) {
    if (i > 0) {
      const beforeFirstChar = s[i - 1];
      charMap.set(beforeFirstChar, charMap.get(beforeFirstChar) - 1);
    }

    if (checkChar(charMap)) {
      ans += len - j + 1;
      continue;
    }

    while(j < len) {
      const char = s[j];
      charMap.set(char, charMap.get(char) + 1);
      if (checkChar(charMap)) {
        ans += len - j;
        j++;
        break;
      }
      j++;
    }
  }

  return ans;
}

function checkChar(charMap = new Map()) {
  return charMap.get('a') > 0
    && charMap.get('b') > 0
    && charMap.get('c') > 0;
}

console.log(numberOfSubstrings('abcabc'));
console.log(numberOfSubstrings('aaacb'));
console.log(numberOfSubstrings('abc'));