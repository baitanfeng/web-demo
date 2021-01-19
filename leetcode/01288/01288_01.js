/**
 *
 * @param {Number[][]} intervals
 * @return {Number}
 */
function removeCoveredIntervals(intervals) {
  const len = intervals.length;

  intervals.sort((a, b) => b[0] - a[0]);

  const max = new Array(len + 1);
  for (let i = 0; i <= len; i++) {
    max[i] = [-1, -1];
  }

  for (let i = len - 1; i >= 0; i--) {
    const current = intervals[i];
    const next = max[i + 1];

    if (current[1] > next[1]) {
      max[i] = [current[0], current[1]];
    } else {
      max[i] = [next[0], next[1]];
    }
  }

  let count = 0;
  for (let i = 0; i < len; i++) {
    const current = intervals[i];

    if (
      current[1] <= max[i][1] &&
      (current[0] !== max[i][0] || current[1] !== max[i][1])
    ) {
      count++;
    }
  }

  return len - count;
}

console.log(
  removeCoveredIntervals([
    [1, 4],
    [3, 6],
    [2, 8],
  ])
);
