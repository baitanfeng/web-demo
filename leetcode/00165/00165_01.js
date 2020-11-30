/**
 * 
 * @param {String} version1 
 * @param {String} version2 
 * @return {Number} 
 */
function compareVersion(version1, version2) {
  const version1Arr = version1.split('.');
  const version2Arr = version2.split('.');
  const len = Math.max(version1Arr.length, version2Arr.length);

  for (let i = 0; i < len; i++) {
    const v1 = Number(version1Arr[i]) || 0;
    const v2 = Number(version2Arr[i]) || 0;

    if (v1 > v2) {
      return 1;
    } else if (v1 < v2) {
      return -1;
    }
  }

  return 0;
}

console.log(compareVersion('1.01', '1.001'));
console.log(compareVersion('1.0', '1.0.0'));
console.log(compareVersion('0.1', '1.1'));
console.log(compareVersion('1.0.1', '1'));
console.log(compareVersion('7.5.2.4', '7.5.3'));