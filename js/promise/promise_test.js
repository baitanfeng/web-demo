{
    const ES6Promise = require('es6-promise').Promise;
    debugger

    const p1 = ES6Promise.reject(1);
    const p2 = ES6Promise.resolve(2);
    const p3 = ES6Promise.resolve(3);
    const p = ES6Promise.all([p1, p2, p3]);

    // const p1 = new ES6Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve(1);
    //     });
    // });
    // const p2 = new ES6Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve(2);
    //     });
    // });
    // const p3 = new ES6Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve(3);
    //     });
    // });
    // const p = ES6Promise.all([p1, p2, p3]);

    // const p0 = ES6Promise.resolve(1);
    // const p1 = ES6Promise.reject(p0);
    // const p2 = p1.then(function onFulfilled (value) {
    //     return p1;
    // }, function onRejected (reason) {
    //     return p1;
    // });
}