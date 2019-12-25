{
    // using a resolved promise, the 'then' block will be triggered instantly,
    // but its handlers will be triggered asynchronously as demonstrated by the console.logs

    const resolvedPromise = Promise.resolve('resolveValue');
    const thenPromise = resolvedPromise.then(value => {
        // this will be called after the end of main stack
        console.log(2);
        return value;
    });
    
    // instantly logging the value of thenPromise
    console.log(1, thenPromise);

    // using setTimeout we can postpone the execution of a function to the moment the stack is empty
    setTimeout(() => {
        console.log(3, thenPromise);
    });

    // 上面的代码打印如下
    // 1 Promise {<pending>}
    // 2
    // 3 Promise {<resolved>: 'resolveValue'}
}

{
    const resolvedPromise = Promise.resolve('resolveValue');
    const thenPromise = resolvedPromise.then(value => {
        console.log(2);
    });
    
    console.log(1, thenPromise);

    setTimeout(() => {
        console.log(3, thenPromise);
    });

    // 上面的代码打印如下
    // 1 Promise {<pending>}
    // 2
    // 3 Promise {<resolved>: undefined}
}

{
    const resolvedPromise = Promise.resolve('resolveValue');
    const thenPromise = resolvedPromise.then(value => {
        console.log(2);
        return Promise.resolve(value);
    });
    
    console.log(1, thenPromise);

    setTimeout(() => {
        console.log(3, thenPromise);
    });

    // 上面的代码打印如下
    // 1 Promise {<pending>}
    // 2
    // 3 Promise {<resolved>: 'resolveValue'}
}

{
    const resolvedPromise = Promise.resolve('resolveValue');
    const thenPromise = resolvedPromise.then();
    
    console.log(1, thenPromise);

    setTimeout(() => {
        console.log(3, thenPromise);
    });

    // 上面的代码打印如下
    // 1 Promise {<pending>}
    // 3 Promise {<resolved>: 'resolveValue'}
}

{
    const resolvedPromise = Promise.resolve('resolveValue');
    const thenPromise = resolvedPromise.then(null);
    
    console.log(1, thenPromise);

    setTimeout(() => {
        console.log(3, thenPromise);
    });

    // 上面的代码打印如下
    // 1 Promise {<pending>}
    // 3 Promise {<resolved>: 'resolveValue'}
}

{
    const resolvedPromise = Promise.resolve('resolveValue');
    const thenPromise = resolvedPromise.then(value => {
        console.log(2);
        setTimeout(() => {
            return Promise.resolve(value);
        });
    });
    
    console.log(1, thenPromise);

    setTimeout(() => {
        console.log(3, thenPromise);
    });

    // 上面的代码打印如下
    // 1 Promise {<pending>}
    // 2
    // 3 Promise {<resolved>: undefined}
}

{
    const resolvedPromise = Promise.resolve('resolveValue');
    const thenPromise = resolvedPromise.then(console.log(2));
    
    console.log(1, thenPromise);

    setTimeout(() => {
        console.log(3, thenPromise);
    });

    // 上面的代码打印如下
    // 2
    // 1 Promise {<pending>}
    // 3 Promise {<resolved>: undefined}
}