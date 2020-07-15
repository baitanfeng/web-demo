function minAddToMakeValid (S) {
  const stack = new Stack();
  for (const char of S) {
    switch(char) {
      case '(': stack.push(char); break;
      case ')':
        stack.peek() === '('
          ? stack.pop()
          : stack.push(char);
        break;
    }
  }
  return stack.size();
}

class Stack {
  constructor() {
    this.stack = [];
  }
  push(x) {
    this.stack.push(x);
  }
  pop() {
    if (!this.isEmpty()) {
      this.stack.pop();
    }
  }
  peek() {
    if (!this.isEmpty()) {
      return this.stack[this.size() - 1];
    }
  }
  size() {
    return this.stack.length;
  }
  isEmpty() {
    return this.size() === 0;
  }
}