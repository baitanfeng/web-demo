// 动态规划

/**
 *
 * @param {Number[]} prices
 * @param {Number} fee
 * @return {Number}
 */
function maxProfit(prices, fee) {
  let cash = 0;
  let hold = -prices[0];

  for (let i = 1, len = prices.length; i < len; i++) {
    cash = Math.max(cash, hold + prices[i] - fee);
    hold = Math.max(hold, cash - prices[i]);
  }

  return cash;
}

console.log(maxProfit([1, 3, 2, 8, 4, 9], 2));
console.log(maxProfit([4, 5, 2, 4, 3, 3, 1, 2, 5, 4], 1));
