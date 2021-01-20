/**
 *
 * @param {Number[][]} intervals
 * @return {Number}
 */
function removeCoveredIntervals(intervals) {
  intervals.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]));

  let count = 0;
  let prev = -1;
  let curr = 0;
  for (let i = 0, len = intervals.length; i < len; i++) {
    curr = intervals[i][1];

    if (curr > prev) {
      count++;
      prev = curr;
    }
  }

  return count;
}

console.log(
  removeCoveredIntervals([
    [1, 5],
    [1, 4],
    [2, 8],
    [3, 6],
  ])
);
