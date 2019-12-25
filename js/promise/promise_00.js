{
    /* 
    [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
    */

    new Promise((resolve, reject) => {} /* executor */);
    
    /* 
    executor 是带有 resolve 和 reject 两个参数的函数。Promise 构造函数执行时立即调用executor 函数， resolve 和 reject 两个函数作为参数传递给 executor（executor 函数在Promise 构造函数返回实例对象前被调用）。resolve 和 reject 函数被调用时，分别将 promise 的状态改为 fulfilled 或 rejected。executor 内部通常会执行一些异步操作，一旦异步操作执行完毕(可能成功/失败)，要么调用 resolve 函数来将 promise 状态改成 fulfilled，要么调用 reject 函数将 promise 的状态改为 rejected。如果在 executor 函数中抛出一个错误，那么该 promise 状态为 rejected。executor 函数的返回值被忽略。
    */

    /* 
     如果一个 promise 对象处在 fulfilled 或 rejected 状态而不是 pending 状态，那么它也可以被称为 settled 状态。你可能也会听到一个术语 resolved，它表示 promise 对象处于 settled 状态。
    */
}

{
    const p1 = new Promise((resolve, reject) => {
        resolve('value');
    });
    console.log(p1);

    // Promise {<resolved>: 'value'}
}

{
    const p1 = new Promise((resolve, reject) => {
        reject('reason');
    });
    console.log(p1);
    
    // Promise {<rejected>: 'reason'}
}

{
    const p1 = new Promise((resolve, reject) => {
        console.log('before');
        resolve('value');
        console.log('after');
    });
    console.log(p1);

    // before
    // after
    // Promise {<resolved>: 'value'}
}

{
    const p1 = new Promise((resolve, reject) => {
        console.log('before');
        reject('reason');
        console.log('after');
    });
    console.log(p1);

    // before
    // after
    // Promise {<rejected>: 'reason'}
}

{
    const p1 = new Promise((resolve, reject) => {});
    console.log(p1);
    
    // Promise {<pending>}
}

{
    const p1 = new Promise((resolve, reject) => {
        throw 'error';
    });
    console.log(p1);
    
    // Promise {<rejected>: 'error'}
}