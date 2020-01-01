{
    const ESPromise = require('es6-promise').Promise;
    debugger;
    const p1 = ESPromise.resolve(1);
    const p2 = ESPromise.resolve(2);
    const p3 = ESPromise.resolve(3);
    const p = ESPromise.race([p1, p2, p3]);
    setTimeout(() => {
        console.log(p);
    });
}
