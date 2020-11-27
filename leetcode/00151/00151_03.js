/**
 * 
 * @param {String} s 
 * @return {String} 
 */
function reverseWords(s) {
  return s.trim().split(/\s+/).reverse().join(' ');
}

console.log(reverseWords('the sky is blue'));
console.log(reverseWords('  hello world!  '));
console.log(reverseWords('a good   example'));
console.log(reverseWords('  Bob    Loves  Alice   '));
console.log(reverseWords('Alice does not even like bob'));