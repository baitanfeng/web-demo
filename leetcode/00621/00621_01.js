/**
 *
 * @param {String[]} tasks
 * @param {Number} n
 * @return {Number}
 */
function leastInterval(tasks, n) {
  const freq = {};
  tasks.forEach((item) => (freq[item] = (freq[item] || 0) + 1));

  const m = Object.keys(freq).length;
  const nextValid = new Array(m).fill(1);
  const rest = Object.values(freq);

  let time = 0;
  for (let i = 0, len = tasks.length; i < len; i++) {
    time++;
    const minNextValid = Math.min(...nextValid, Number.MAX_VALUE);
    time = Math.max(minNextValid, time);

    let best = -1;
    for (let j = 0; j < m; j++) {
      if (rest[j] > 0 && nextValid[j] <= time) {
        if (best === -1 || rest[j] > rest[best]) {
          best = j;
        }
      }
    }

    nextValid[best] = time + n + 1;
    rest[best]--;
  }

  return time;
}

console.log(leastInterval(['A', 'A', 'A', 'B', 'B', 'B'], 2));
console.log(leastInterval(['A', 'A', 'A', 'B', 'B', 'B'], 0));
console.log(
  leastInterval(['A', 'A', 'A', 'A', 'A', 'A', 'B', 'C', 'D', 'E', 'F', 'G'], 2)
);
