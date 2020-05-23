{
  setTimeout(function f1() {
    console.log(1);
    setTimeout(function f2() {
      console.log(2);
    }, 0);
  }, 0);

  setTimeout(function f3() {
    console.log(3);
    setImmediate(function f4() {
      console.log(4);
    });
  }, 0);

  // 1 3 4 2 或 1 3 2 4
}