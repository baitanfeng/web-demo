const restoreIpAddresses = s => {
  const sLen = s.length;

  if (sLen < 4 || sLen > 12) return [];

  const SEG_COUNT = 4;
  const segments = new Array(SEG_COUNT);
  const ans = [];

  const dfs = (s, segId, segStart) => {
    // 如果找到了 4 段 IP 地址并且遍历完了字符串，那么就是一种答案
    if (segId === SEG_COUNT) {
      if (segStart === sLen) {
        ans.push(segments.join('.'));
      }

      return;
    }

    // 如果还没有找到 4 段 IP 地址就已经遍历完了字符串，那么提前回溯
    if (segStart === sLen) return;

    // 由于不能有前导零，如果当前数字为 0，那么这一段 IP 地址只能为 0
    if (s[segStart] === '0') {
      segments[segId] = 0;
      dfs(s, segId + 1, segStart + 1);
    }

    // 一般情况，枚举每一种可能性并递归
    let addr = 0;
    for (let segEnd = segStart; segEnd < sLen; segEnd++) {
      addr = (addr * 10) + (s[segEnd] - '0');
      if (addr > 0 && addr <= 0xFF) {
        segments[segId] = addr;
        dfs(s, segId + 1, segEnd + 1);
      } else {
        break;
      }
    }
  }

  dfs(s, 0, 0);

  return ans;
}

console.log(restoreIpAddresses('25525511135'));