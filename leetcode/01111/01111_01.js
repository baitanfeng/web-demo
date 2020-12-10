/**
 * 
 * @param {String} seq 
 * @return {Number[]} 
 */
function maxDepthAfterSplit(seq) {
  const len = seq.length;
  const ans = [];
  let lenA = 0;
  let lenB = 0;

  for (let i = 0; i < len; i++) {
    switch(seq[i]) {
      case '(':
        if (lenA <= lenB) {
          lenA++;
          ans.push(0);
        } else {
          lenB++;
          ans.push(1);
        }
        break;
      case ')':
        if (lenA <= lenB) {
          lenB--;
          ans.push(1);
        } else {
          lenA--;
          ans.push(0);
        }
        break;
      default:
        // do nothing
    }
  }

  return ans;
}

console.log(maxDepthAfterSplit("(()())"));
console.log(maxDepthAfterSplit("()(())()"));