function minDistance(s1, s2) {
  const len1 = s1.length;
  const len2 = s2.length;

  const dp = new Array(len1 + 1);
  for (let i = 0; i <= len1; i++) {
    dp[i] = new Array(len2 + 1).fill(0);
  }

  for (let i = 0; i <= len1; i++) {
    for (let j = 0; j <= len2; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = i + j;
        continue;
      }

      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[len1][len2];
}

console.log(minDistance('sea', 'ate'));