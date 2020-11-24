/**
 * 
 * @param {String} s 
 * @return {Number} 
 */
function numSteps(s) {
  if (s.length === 1) return 0;

  const arr = s.split('');
  let ans = 0;

  while(arr.length > 1) {
    ans++;

    if (arr[arr.length - 1] === '1') {
      let i = arr.length - 1;
      arr[i] = '0';
      i--;
      while(i >= 0) {
        if (arr[i] === '0') {
          arr[i] = '1';
          break;
        } else {
          arr[i] = '0';
          i--;
        }
      }
  
      if (i < 0) {
        arr.unshift('1');
      }
    } else {
      arr.pop();
    }
  }

  return ans;
}

console.log(numSteps('1101'));
console.log(numSteps('10'));
console.log(numSteps('1'));