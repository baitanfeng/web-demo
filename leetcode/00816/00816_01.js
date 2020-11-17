/**
 * 
 * @param {String} S 
 * @return {String[]} 
 */
function ambiguousCoordinates(S) {
  const ans = [];
  const len = S.length;

  for (let i = 2; i < len - 1; i++) {
    const lefts = make(S, 1, i);
    const rights = make(S, i, len - 1);

    lefts.forEach(left => {
      rights.forEach(right => {
        ans.push(`(${left}, ${right})`);
      });
    });
  }

  return ans;
}

function make(S, i, j) {
  const ans = [];

  for (let d = 1; d <= j - i; d++) {
    const left = S.substring(i, i + d);
    const right = S.substring(i + d, j);

    if ((!left.startsWith('0') || left === '0') && !right.endsWith('0')) {
      ans.push(`${left}${d < j - i ? '.' : ''}${right}`);
    }
  }

  return ans;
}

console.log(ambiguousCoordinates('(123)'))