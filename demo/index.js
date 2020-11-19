/**
 * 
 * @param {String} s 
 * @param {Number} k 
 * @returns {Boolean} 
 */
function hasAllCodes(s, k) {
  if (s.length < k) return false;

  const countK = 2 ** k;
  const subSet = new Set();

  for (let i = 0, len = s.length; i <= len - k; i++) {
    const subStr = s.substring(i, i + k);
    subSet.add(subStr);
    if (countK === subSet.size) return true;
  }

  return false;
}

console.log(hasAllCodes('00110110', 2));
console.log(hasAllCodes('00110', 2));
console.log(hasAllCodes('0110', 1));
console.log(hasAllCodes('0110', 2));
console.log(hasAllCodes('0000000001011100', 4));