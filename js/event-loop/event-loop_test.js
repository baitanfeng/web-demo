setTimeout(() => {
  let time = Date.now();
  while (Date.now() - time < 3000) {};
  console.log(1);
}, 0);
setTimeout(() => {
  console.log(2);
}, 0);