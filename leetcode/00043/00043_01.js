/**
 * 
 * @param {String} num1 
 * @param {String} num2 
 * @return {String} 
 */
function multiply(num1, num2) {
  if (num1 === '0' || num2 === '0') return '0';

  const m = num1.length;
  const n = num2.length;
  let ans = '0';

  for (let i = n - 1; i >= 0; i--) {
    let curr = '0'.repeat(n - 1 - i);
    let add = 0;

    const y = num2[i] - '0';
    for (let j = m - 1; j >= 0; j--) {
      const x = num1[j] - '0';
      const product = x * y + add;
      curr = `${product % 10}${curr}`;
      add = Math.floor(product / 10);
    }

    if (add !== 0) {
      curr = `${add % 10}${curr}`;
    }

    ans = addString(ans, curr);
  }

  return ans;
}

function addString(num1, num2) {
  let i = num1.length - 1;
  let j = num2.length - 1;
  let add = 0;
  let ans = '';

  while(i >= 0 || j >= 0 || add !== 0) {
    let x = i >= 0 ? num1[i] - '0' : 0;
    let y = j >= 0 ? num2[j] - '0' : 0;
    let result = x + y + add;
    ans = `${result % 10}${ans}`;
    add = Math.floor(result / 10);
    i--;
    j--;
  }

  return ans;
}

console.log(multiply('2', '3'));
console.log(multiply('123', '456'));