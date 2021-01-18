/**
 *
 * @param {Number[][]} intervals
 * @return {Number}
 */
function removeCoveredIntervals(intervals) {
  const len = intervals.length;

  intervals.sort((a, b) => b[0] - a[0]);

  const max = new Array(len + 1).fill(0);
  for (let i = len - 1; i >= 0; i--) {
    max[i] = [intervals[i][0], Math.max(max[i + 1], intervals[i][1])];
  }

  let ans = 0;
  for (let i = 0; i < len; i++) {
    if (intervals[i][1] <= max[i][1] && intervals[i][0] !== max[i][0]) {
      ans++;
    }
  }

  return len - ans;
}

console.log(
  removeCoveredIntervals([
    [3, 10],
    [4, 10],
    [5, 11],
  ])
);
