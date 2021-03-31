/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = function (s, p) {
  const m = s.length;
  const n = p.length;

  const dp = new Array(m + 1);
  for (let i = 0; i < m + 1; i++) {
    dp[i] = new Array(n + 1).fill(false);
  }
  dp[0][0] = true;

  for (let i = 1; i < n + 1; i++) {
    if (p[i - 1] === '*') {
      dp[0][i] = true;
    } else {
      break;
    }
  }

  for (let i = 1; i < m + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      if (p[j - 1] === '*') {
        dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
      } else if (p[j - 1] === '?' || s[i - 1] === p[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      }
    }
  }

  return dp[m][n];
};

console.log(isMatch('aa', 'a'));
console.log(isMatch('aa', '*'));
console.log(isMatch('cb', '?a'));
console.log(isMatch('adceb', '*a*b'));
console.log(isMatch('acdcb', 'a*c?b'));
