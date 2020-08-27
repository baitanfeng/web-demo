function generateParenthesis(n) {
  const current = new Array(2 * n);
  const ans = [];

  generateAll(current, 0, ans);

  return ans;
}

function generateAll(current, pos, ans) {
  if (pos === current.length) {
    if (validate(current)) ans.push(current.join(''));
  } else {
    current[pos] = '(';
    generateAll(current, pos + 1, ans);
    current[pos] = ')';
    generateAll(current, pos + 1, ans);
  }
}

function validate(current) {
  let balance = 0;

  for (let i = 0; i < current.length; i++) {
    current[i] === '(' ? balance++ : balance--;
    if (balance < 0) return false;
  }

  return balance === 0;
}

console.log(generateParenthesis(3));