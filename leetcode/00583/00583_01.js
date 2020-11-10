function minDistance(word1, word2) {
  const len1 = word1.length;
  const len2 = word2.length;

  return len1 + len2 - 2 * lcs(word1, word2, len1, len2);
}

/**
 * 最长公共子序列
 * 
 * @param {String} s1 待比较的字符串s1
 * @param {String} s2 待比较的字符串s2
 * @param {Number} m 字符串s1的前m个字符
 * @param {Number} n 字符串s2的前n个字符
 * 
 * @returns {Number} s1与s2的最长公共子序列
 */
function lcs(s1, s2, m, n) {
  if (m === 0 || n === 0) return 0;

  if (s1[m - 1] === s2[n - 1]) {
    return 1 + lcs(s1, s2, m - 1, n - 1);
  } else {
    return Math.max(lcs(s1, s2, m, n - 1), lcs(s1, s2, m - 1, n));
  }
}

console.log(minDistance('sea', 'ate')); // 4