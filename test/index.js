console.log('script start');

setTimeout(() => {
  console.log('setTimeout 1');
  Promise.resolve()
    .then(() => console.log('promise 3'))
    .then(() => console.log('promise 4'))
    .then(() => {
      setTimeout(() => {
        console.log('setTimeout 2');
        Promise.resolve()
          .then(() => console.log('promise 5'))
          .then(() => console.log('promise 6'))
      }, 0);
    });
}, 0);

Promise.resolve()
  .then(() => console.log('promise 1'))
  .then(() => console.log('promise 2'));