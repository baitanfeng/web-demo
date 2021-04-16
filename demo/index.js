/**
 * @param {string} s
 * @return {string[][]}
 */
const partition = function (s) {
  const dfs = (i) => {
    if (i === len) {
      ret.push(ans.slice());
      return;
    }
    for (let j = i; j < len; ++j) {
      if (dp[i][j]) {
        ans.push(s.slice(i, j + 1));
        dfs(j + 1);
        ans.pop();
      }
    }
  };

  const len = s.length;
  const dp = new Array(len).fill(0).map(() => new Array(len).fill(true));
  let ret = [],
    ans = [];

  for (let i = len - 1; i >= 0; i--) {
    for (let j = i + 1; j < len; j++) {
      dp[i][j] = s[i] === s[j] && dp[i + 1][j - 1];
    }
  }
  dfs(0);
  return ret;
};
