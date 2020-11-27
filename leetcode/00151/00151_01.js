/**
 * 
 * @param {String} s 
 * @return {String} 
 */
function reverseWords(s) {
  s = s.trim();
  s = s.replace(/[ ]+/g, ' ');

  const len = s.length;
  const ans = [];

  for (let i = 0, j = 0; i < len; i++) {
    if (s[i] === ' ') continue;

    j = i;
    while(j < len) {
      if (s[j] === ' ') break;
      j++;
    }

    if (j > i) {
      ans.push(s.substring(i, j));
    }

    i = j;
  }

  return ans.reverse().join(' ');
}

console.log(reverseWords('the sky is blue'));
console.log(reverseWords('  hello world!  '));
console.log(reverseWords('a good   example'));
console.log(reverseWords('  Bob    Loves  Alice   '));
console.log(reverseWords('Alice does not even like bob'));