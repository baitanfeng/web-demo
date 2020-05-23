{
  setTimeout(function f1() {
    console.log(1);
  }, 0);
  setTimeout(function f2() {
    console.log(2);
    Promise.resolve().then(function f3() {
      console.log(3);
      setTimeout(function f4() {
        console.log(4);
      }, 0);
    });
    setTimeout(function f5() {
      console.log(5);
      Promise.resolve().then(function f6() {
        console.log(6);
      });
    }, 0);
  }, 0);
  setTimeout(function f7() {
    console.log(7);
  }, 0);
}