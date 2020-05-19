const p1 = Promise.resolve(42);
const p2 = Promise.reject(43);

const p3 = Promise.resolve(p1);
const p4 = Promise.resolve(p2);

const p5 = Promise.reject(p1);
const p6 = Promise.reject(p2);

p3.then(function(value) {
  console.log(`p3 fulfilled ${value}`);
}, function(value) {
  console.log(`p3 rejected ${value}`);
})
p4.then(function(value) {
  console.log(`p4 fulfilled ${value}`);
}, function(value) {
  console.log(`p4 rejected ${value}`);
})
p5.then(function(value) {
  console.log(`p5 fulfilled ${value}`);
}, function(value) {
  console.log(`p5 rejected ${value}`);
})
p6.then(function(value) {
  console.log(`p6 fulfilled ${value}`);
}, function(value) {
  console.log(`p6 rejected ${value}`);
})