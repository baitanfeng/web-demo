/**
 * 
 * @param {String} word1 
 * @param {String} word2 
 * @return {Number}
 */
function minDistance(word1, word2) {
  const n = word1.length;
  const m = word2.length;

  // 有一个字符串为空串
  if (n * m === 0) return n + m;

  const dp = new Array(n + 1);
  for (let i = 0; i < n + 1; i++) {
    dp[i] = new Array(m + 1).fill(0);
  }

  // 边界状态初始化
  for (let i = 0; i < n + 1; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j < m + 1; j++) {
    dp[0][j] = j;
  }

  // 计算所有dp值
  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      const left = dp[i - 1][j] + 1;
      const down = dp[i][j - 1] + 1;
      let leftDown = dp[i - 1][j - 1];
      if (word1[i - 1] !== word2[j - 1]) {
        leftDown += 1;
      }
      dp[i][j] = Math.min(left, down, leftDown);
    }
  }

  return dp[n][m];
}

console.log(minDistance('horse', 'ros'));
console.log(minDistance('intention', 'execution'));