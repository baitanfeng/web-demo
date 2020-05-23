{
  setTimeout(function f1() {
    console.log(1);
    Promise.resolve().then(function f2() {
      console.log(2);
    });
  }, 0);
  setTimeout(function f3() {
    console.log(3);
    Promise.resolve().then(function f4() {
      console.log(4);
    });
  }, 0);

  // 1 2 3 4
}