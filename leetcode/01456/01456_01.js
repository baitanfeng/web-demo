/**
 * 
 * @param {String} s 
 * @param {Number} k 
 * @return {Number} 
 */
function maxVowels(s, k) {
  const vowels = 'aeiou';
  const len = s.length;
  let ans = 0;

  const counts = new Array(len + 1).fill(0);
  for (let i = len - 1; i >= 0; i--) {
    counts[i] = vowels.includes(s[i]) ? (counts[i + 1] + 1) : counts[i + 1];
  }
  
  for (let i = 0; i <= len - k; i++) {
    ans = Math.max(ans, counts[i] - counts[i + k]);
  }

  return ans;
}

console.log(maxVowels('abciiidef', 3));
console.log(maxVowels('aeiou', 2));
console.log(maxVowels('leetcode', 3));
console.log(maxVowels('rhythms', 4));
console.log(maxVowels('tryhard', 4));
console.log(maxVowels("weallloveyou", 7));