{
    setTimeout(() => {
        console.log(3);
    });
    Promise.resolve().then(() => {
        console.log(2);
    });
    console.log(1);

    // setTimeout(fn) 在下一轮"事件循环"开始时执行
    // Promise.resolve() 在本轮"事件循环"结束时执行
    // 上面的代码打印如下
    // 1
    // 2
    // 3
}

{
    new Promise((resolve, reject) => {
        console.log('a');
        resolve('b');
        console.log('c');
    }).then(value => {
        console.log(value);
    });

    // a
    // c
    // b

    /* 
    从创建 Promise 对象到执行完回调的过程是怎样的? 下面是一个完整的解释:
    构造函数中的输出执行是同步的，输出 a, 执行 resolve 函数，将 Promise 对象状态置为 resolved，输出 c。同时注册这个 Promise 对象的回调 then 函数。整个脚本执行完，stack 清空。event loop 检查到 stack 为空，再检查 microtask 队列中是否有任务，发现了 Promise 对象的 then 回调函数产生的 microtask，推入 stack，执行。输出 b，event loop的列队为空，stack 为空，脚本执行完毕。 
    */
}

{
    new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(4);
            resolve();
        });
    }).then(() => {
        console.log(5);
    });

    Promise.resolve().then(() => {
        console.log(2);
    }).then(() => {
        console.log(3);
    });
    
    console.log(1);

    // 1, 2, 3, 4, 5
}

{
    const p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('value');
        });
    });
    console.log(p1);
    setTimeout(() => {
        console.log(p1);
    });

    // Promise {<pending>}
    // Promise {<resolved>: 'value'}
}