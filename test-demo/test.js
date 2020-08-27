function maximalRectangle(matrix) {
  if (matrix.length === 0) return 0;

  const h = matrix.length;
  const w = matrix[0].length;

  const height = new Array(w).fill(0);
  const left = new Array(w).fill(0);
  const right = new Array(w).fill(0);

  
}

console.log(maximalRectangle([
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]))