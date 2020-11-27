/**
 * 
 * @param {String} s 
 * @return {String} 
 */
function reverseWords(s) {
  s = s.trim();
  s = s.replace(/[ ]+/g, ' ');

  return s.split(' ')
    .reduceRight((acc, curr) => `${acc} ${curr}`);
}

console.log(reverseWords('the sky is blue'));
console.log(reverseWords('  hello world!  '));
console.log(reverseWords('a good   example'));
console.log(reverseWords('  Bob    Loves  Alice   '));
console.log(reverseWords('Alice does not even like bob'));