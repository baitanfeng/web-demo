/**
 *
 * @param {Number} k
 * @return {Number}
 */
function findMinFibonacciNumbers(k) {
  const fibonacci = [];

  fibonacci[0] = 0;
  fibonacci[1] = 1;
  fibonacci[2] = 1;

  let i = 3;
  while (true) {
    fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
    if (fibonacci[i] >= k) break;
    i++;
  }

  if (fibonacci[fibonacci.length - 1] === k) return 1;

  let ans = 0;
  for (let i = fibonacci.length - 1; i >= 1; i--) {
    const fi = fibonacci[i];

    if (k < fi) continue;

    while (k >= fi) {
      k -= fi;
      ans++;
    }

    if (k === 0) break;
  }

  return ans;
}

console.log(findMinFibonacciNumbers(7));
console.log(findMinFibonacciNumbers(10));
console.log(findMinFibonacciNumbers(19));
