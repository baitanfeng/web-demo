/**
 * 
 * @param {String} version1 
 * @param {String} version2 
 * @return {Number} 
 */
function compareVersion(version1, version2) {
  let len1 = version1.length;
  let len2 = version2.length;

  let prevIndex1 = 0;
  let prevIndex2 = 0;

  let currIndex1 = 0;
  let currIndex2 = 0;

  while(currIndex1 !== -1 || currIndex2 !== -1) {
    currIndex1 = version1.indexOf('.', prevIndex1);
    currIndex2 = version2.indexOf('.', prevIndex2);

    const v1 = currIndex1 === -1
      ? Number(version1.substring(prevIndex1)) || 0
      : Number(version1.substring(prevIndex1, currIndex1)) || 0;
    const v2 = currIndex2 === -1
      ? Number(version2.substring(prevIndex2)) || 0
      : Number(version2.substring(prevIndex2, currIndex2)) || 0;

    if (v1 > v2) {
      return 1;
    } else if (v1 < v2) {
      return -1;
    } else {
      prevIndex1 = currIndex1 === -1 ? len1 : currIndex1 + 1;
      prevIndex2 = currIndex2 === -1 ? len2 : currIndex2 + 1;
    }
  }

  return 0;
}

console.log(compareVersion('1.01', '1.001'));
console.log(compareVersion('1.0', '1.0.0'));
console.log(compareVersion('0.1', '1.1'));
console.log(compareVersion('1.0.1', '1'));
console.log(compareVersion('7.5.2.4', '7.5.3'));