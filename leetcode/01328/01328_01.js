/**
 * 
 * @param {String} palindrome 
 * @return {String} 
 */
function breakPalindrome(palindrome) {
  if (palindrome.length <= 1) return '';

  const len = palindrome.length;
  const middle = Math.floor(len / 2);
  let ans = '';
  let flag = false;

  for (let i = 0; i < middle; i++) {
    if (palindrome[i] !== 'a') {
      ans = `${palindrome.substring(0, i)}a${palindrome.substring(i + 1)}`;
      flag = true;
      break;
    }
  }

  if (!flag) {
    ans = `${palindrome.substring(0, len - 1)}b`;
  }

  return ans;
}

console.log(breakPalindrome('abccba'));
console.log(breakPalindrome('a'));
console.log(breakPalindrome('aa'));