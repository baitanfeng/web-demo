/**
 *
 * @param {Number[][]} costs
 * @return {Number}
 */
function twoCitySchedCost(costs) {
  costs.sort((a, b) => a[0] - a[1] - (b[0] - b[1]));

  const n = costs.length / 2;
  let ans = 0;

  for (let i = 0; i < n; i++) {
    ans += costs[i][0] + costs[i + n][1];
  }

  return ans;
}

console.log(
  twoCitySchedCost([
    [10, 20],
    [30, 200],
    [400, 50],
    [30, 20],
  ])
);
