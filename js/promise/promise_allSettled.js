{
    const resolvedPromise = Promise.resolve('resolveValue');
    const rejectedPromise = Promise.reject('rejectReason');

    const allSettledPromise = Promise.allSettled([resolvedPromise, rejectedPromise]);
    allSettledPromise.then(results => {
        console.log(results);
    });

    // 上面代码打印如下
    // [
    //     {status: 'fulfilled', value: 'resolveValue'},
    //     {status: 'rejected', reason: 'rejectReason'}
    // ]
}