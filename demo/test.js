// 0.009 ->     0.1, [0.025, 0.05, 0.075, 0.1]
// 0.1 ->       0.1, [0.025, 0.05, 0.075, 0.1]
// 1 ->         1, [0.25, 0.5, 0.75, 1]
// 10 ->        10, [2.5, 5, 7.5, 10]
// 170 ->       200, [50, 100, 150, 200]
// 200 ->       200, [50, 100, 150, 200]
// 200.05 ->    240, [60, 120, 180, 240]
// 1000 ->      1000, [250, 500, 750, 1000]
// 1000.01 ->   1200, [300, 600, 900, 1200]

function generateSplits(num, splitNumber = 4) {
  let enlarge = 1, step = 1;

  while(num / splitNumber < splitNumber) {
    num *= 10；
    enlarge *= 10;
  }

  step = 10 ** (String(Math.floor(num / 4)).length - 1);
  while(num % splitNumber !== 0) {
    num += step;
  }

  return num / enlarge;
}

console.log(generateSplits(30));