/**
 * 
 * @param {String} s 
 * @param {Number} k 
 * @returns {Boolean} 
 */
function hasAllCodes(s, k) {
  const dp = new Array(k + 1);
  for (let i = 0; i < k + 1; i++) {
    dp[i] = [];
  }
  dp[0] = [''];

  for (let i = 1; i < k + 1; i++) {
    dp[i - 1].forEach(item => {
      dp[i].push(`0${item}`, `1${item}`);
    });

    const isUninclude = dp[i].some(item => !s.includes(item));
    if (isUninclude) return false;
  }

  return true;
}

console.log(hasAllCodes('00110110', 2));
console.log(hasAllCodes('00110', 2));
console.log(hasAllCodes('0110', 1));
console.log(hasAllCodes('0110', 2));
console.log(hasAllCodes('0000000001011100', 4));