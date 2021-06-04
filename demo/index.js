/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function (prices) {
  if (prices.length === 0) return 0;

  const len = prices.length;
  const f = new Array(len).fill(0).map((item) => (item = new Array(3).fill(0)));
  f[0][0] = -prices[0];

  for (let i = 1; i < len; i++) {
    f[i][0] = Math.max(f[i - 1][0], f[i - 1][2] - prices[i]);
    f[i][1] = f[i - 1][0] + prices[i];
    f[i][2] = Math.max(f[i - 1][1], f[i - 1][2]);
  }

  return Math.max(f[len - 1][1], f[len - 1][2]);
};

// longhand
if (type === 1) {
  func1();
} else if (type === 2) {
  func2();
} else if (type === 3) {
  func3();
} else {
  throw new Error(`Invalid value: ${type}`);
}

// shorthand
const types = {
  1: func1,
  2: func2,
  3: func3,
};
const func = types[type];
!func && throw new Error(`Invalid value: ${type}`);
func();
