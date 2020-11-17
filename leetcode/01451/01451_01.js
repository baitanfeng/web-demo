/**
 * 
 * @param {String} text 
 * @return {String}
 */
function arrangeWords(text) {
  text = text[0].toLowerCase() + text.substring(1);
  
  const words = text.split(' ');
  const ans = [];
  const map = new Map();

  for (let i = 0, len = words.length; i < len; i++) {
    const word = words[i];
    const wordLen = word.length;

    if (map.has(wordLen)) {
      map.get(wordLen).push(word);
    } else {
      map.set(wordLen, [word]);
    }
  }

  [...map.entries()]
    .sort((a, b) => a[0] - b[0])
    .forEach(([key, value]) => {
      ans.push(...value);
    });

  const str = ans.join(' ');
  return str[0].toUpperCase() + str.substring(1);
}

console.log(arrangeWords('Leetcode is cool'));
console.log(arrangeWords('Keep calm and code on'));
console.log(arrangeWords('To be or not to be'));