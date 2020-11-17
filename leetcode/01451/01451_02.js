/**
 * 
 * @param {String} text 
 * @return {String}
 */
function arrangeWords(text) {
  text = text[0].toLowerCase() + text.substring(1);
  
  const words = text.split(' ');
  words.sort((a, b) => a.length - b.length);

  let ans = words.join(' ');
  return ans[0].toUpperCase() + ans.substring(1);
}

console.log(arrangeWords('Leetcode is cool'));
console.log(arrangeWords('Keep calm and code on'));
console.log(arrangeWords('To be or not to be'));