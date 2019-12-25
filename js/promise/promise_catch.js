{
    Promise.prototype.catch
    // 跟传统的 try/catch 代码块不同的是
    // 如果没有使用 Promise catch 方法指定错误处理的回调函数
    // Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应
    // 也就是说
    // Promise 内部的错误不会影响到 Promise 外部的代码
    // 通俗的说法就是"Promise 会吃掉错误"
}

{
    const p0 = new Promise((resolve, reject) => {
        aaa;
    });

    // Promise 会抛出内部异常
    // 浏览器运行到这一行, 会打印出错误, 但不会退出进程、终止脚本执行
    // 上面代码打印如下
    // Uncaught (in promise) ReferenceError: aaa is not defined
}

{
    try {
        const p0 = new Promise((resolve, reject) => {
            aaa;
        });
    } catch (error) {
        console.log('error', error);
    }

    // Promise 会抛出内部异常
    // 浏览器运行到这一行, 会打印出错误, 但不会退出进程、终止脚本执行
    // 上面代码打印如下, 不会执行 try/catch 里 catch 块内的内容
    // Uncaught (in promise) ReferenceError: aaa is not defined
}

{
    const p0 = new Promise((resolve, reject) => {
        aaa;
    });
    p0.catch(error => {
        console.log('promise catch block:', error);
    });

    // Promise 的 catch 方法捕捉了抛出的内部异常，因此程序正常输出
    // 上面代码打印如下
    // promise catch block: ReferenceError: aaa is not defined
}

{
    const p0 = new Promise((resolve, reject) => {
        aaa;
    });
    p0.catch(error => {
        bbb;
    });

    // Promise 会抛出内部异常
    // 浏览器运行到这一行, 会打印出错误, 但不会退出进程、终止脚本执行
    // 上面代码打印如下
    // Uncaught (in promise) ReferenceError: bbb is not defined
}

{
    const p0 = new Promise((resolve, reject) => {
        setTimeout(() => {
            throw 'error';
        });
        resolve('resolveValue');
    });
    p0.then(value => {
        console.log(value);
    });

    // 上面代码中, Promise 指定在下一轮"事件循环"再抛出错误
    // 到了那个时候, Promise 的运行已经结束
    // 所以，这个错误是在 Promise 函数体外抛出的，会冒泡到最外层，成了未捕获的错误
}

{
    /* 
    [使用 Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)
    */

    /* 
    嵌套的 catch 仅捕捉在其之前同时还必须是其作用域的错误，而捕捉不到在其链式以外或者其嵌套域以外的错误。合理的使用 catch，可以实现高精度的错误处理。
    */

    doSomethingCritical().then(result => {
        return doSomethingOptional(result).then(optionalResult => {
            return doSomethingExtraNice(optionalResult);
        }).catch(e => { /* 内部 catch */
            console.log(e.message);
        });
    }).then(() => {
        return moreCriticalStuff();
    }).catch(e => { /* 外部 catch */
        console.log(e.message);
    });

    /* 
    内部的 catch 语句仅能捕获到 doSomethingOptional() 和 doSomethingExtraNice() 的失败，之后就恢复到 moreCriticalStuff() 的运行。如果 doSomethingCritical() 失败，这个错误仅会被 外部的 catch 语句捕获到。
    */
}