{
    const p0 = Promise.reject('rejectReason');
    const p1 = p0.then(null, reason => {
        console.log('p1', reason);
        return reason;
    });
    const p2 = p1.then(value => {
        console.log('p2', value);
    });

    console.log(p0);
    console.log(p1);
    console.log(p2);

    // 上面代码打印如下
    // Promise {<rejected>: 'rejectReason'}
    // Promise {<pending>}
    // Promise {<pending>}
    // p1 rejectReason
    // p2 rejectReason
}

