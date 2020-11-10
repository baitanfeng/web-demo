function minDistance(word1, word2) {
  const len1 = word1.length;
  const len2 = word2.length;
  const memo = new Array(len1 + 1);
  for (let i = 0; i <= len1; i++) {
    memo[i] = new Array(len2 + 1).fill(0);
  }

  return len1 + len2 - 2 * lcs(word1, word2, len1, len2, memo);
}

/**
 * 最长公共子序列
 * 
 * @param {String} s1 待比较的字符串s1
 * @param {String} s2 待比较的字符串s2
 * @param {Number} m 字符串s1的前m个字符
 * @param {Number} n 字符串s2的前n个字符
 * @param {*} memo memo[m][n] 用来保存 lcs(s1, s2, m, n, memo) 的返回值
 * 
 * @returns {Number} s1与s2的最长公共子序列
 */
function lcs(s1, s2, m, n, memo) {
  if (m === 0 || n === 0) return 0;
  if (memo[m][n] > 0) return memo[m][n];

  if (s1[m - 1] === s2[n - 1]) {
    memo[m][n] = 1 + lcs(s1, s2, m - 1, n - 1, memo);
  } else {
    memo[m][n] = Math.max(lcs(s1, s2, m, n - 1, memo), lcs(s1, s2, m - 1, n, memo));
  }

  return memo[m][n];
}

console.log(minDistance('sea', 'ate')); // 4