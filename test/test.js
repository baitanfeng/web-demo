const p1 = Promise.resolve(42);
const fn = () => {throw new TypeError('sss')};
// const p2 = Promise.resolve(fn());
const p2 = p1.finally(fn);

const p3 = p2.catch(e => console.log(e));
console.log('xxx')