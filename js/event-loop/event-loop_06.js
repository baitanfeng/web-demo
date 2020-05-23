{
  const fs = require('fs');

  fs.readFile(__filename, () => {
    setTimeout(function f1() {
      console.log(1);
      process.nextTick(function f2() {
        console.log(2);
      });
    }, 0);
    setTimeout(function f3() {
      console.log(3)
    }, 0);

    setImmediate(function f4() {
      console.log(4);
      process.nextTick(function f5() {
        console.log(5);
      });
    });
    setImmediate(function f6() {
      console.log(6)
    })
  })
}