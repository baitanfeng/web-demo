{
    Promise.resolve(value)
    
    /* 
    返回一个状态由给定 value 决定的 Promise 对象。如果该值是 thenable (即，带有 then 方法的对象)，返回的 Promise 对象的 最终状态 由 then 方法执行决定；否则的话(该 value 为空，基本类型或者不带 then 方法的对象)，返回的 Promise 对象的状态为 fulfilled，并且将该 value 传递给 then 方法的 onFulfilled 参数。通常而言，如果你不知道一个值是否是 Promise 对象，使用 Promise.resolve(value) 来返回一个 Promise 对象,这样就能将该 value 以 Promise 对象形式使用。

    如果 value 为 Promise，则返回 value
    
    */
}

{
    const p0 = Promise.resolve('value');
    const p1 = Promise.resolve(p0);
    console.log(p1 === p0);
    console.log(p1);

    // true
    // Promise {<resolved>: 'value'}
}

{
    const p0 = Promise.reject('reason');
    const p1 = Promise.resolve(p0);
    console.log(p1 === p0);
    console.log(p1);

    // true
    // Promise {<rejected>: 'reason'}
}

{
    const p0 = {
        then: function(onFulfilled, onRejected) {
            onFulfilled('value');
        }
    };
    const p1 = Promise.resolve(p0);
    p1.then(value => {
        console.log(value);
    })
    console.log(p1);

    // Promise {<pending>}
    // value
}

{
    const p1 = Promise.resolve('value');
    console.log(p1);

    // Promise {<resolved>: 'value'}
}

{
    const p1 = Promise.resolve({});
    console.log(p1);

    // Promise {<resolved>: {}}
}

{
    const p1 = Promise.resolve(() => {});
    console.log(p1);

    // Promise {<resolved>: () => {}}
}

{
    const p1 = Promise.all([1, Promise.resolve(2), Promise.resolve(3)]);
    console.log(p1);
    setTimeout(() => {
        console.log(p1);
    });
}

{
    const p1 = Promise.resolve(1);
    const p2 = Promise.resolve(2);

    const p = Promise.all([p1, p2, {then: function() {}}]);
    console.log(p1);
    console.log(p2);
    console.log(p);
    setTimeout(() => {
        console.log(p);
    });
}

{
    const p0 = Promise.reject();
    p0.finally(console.log(2));
    console.log(3)
}