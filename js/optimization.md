### 给多个变量赋值

```
// longhand
let test1, test2, test3;
test1 = 1;
test2 = 2;
test3 = 3;

// shorthand
let [test1, test2, test3] = [1, 2, 3];
```

### switch 简化

```
// longhand
switch (data) {
  case 1:
    func1();
    break;
  case 2:
    func2();
    break;
  case 3:
    func3();
    break;
  default:
  // do nothing;
}

// shorthand
const data = {
  1: func1,
  2: func2,
  3: func3,
};
data[something] && data[something]();
```

### 条件查找简化

```
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
```
