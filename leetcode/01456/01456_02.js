/**
 * 
 * @param {String} s 
 * @param {Number} k 
 * @return {Number} 
 */
function maxVowels(s, k) {
  const vowels = 'aeiou';
  let ans = 0;

  for (let i = 0; i < k; i++) {
    if (vowels.includes(s[i])) {
      ans++;
    }
  }

  let prev = ans;
  for (let i = k, len = s.length; i < len; i++) {
    if (vowels.includes(s[i])) {
      prev++;
    }
    if (vowels.includes(s[i - k])) {
      prev--;
    }

    ans = Math.max(ans, prev);
  }

  return ans;
}

console.log(maxVowels('abciiidef', 3));
console.log(maxVowels('aeiou', 2));
console.log(maxVowels('leetcode', 3));
console.log(maxVowels('rhythms', 4));
console.log(maxVowels('tryhard', 4));
console.log(maxVowels("weallloveyou", 7));