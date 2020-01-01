## 前言

> 我们先从基础的说起，最后，来实现一个 promise


## 语法

    new Promise(fn);
    function fn (resolve, reject) {
        // ...
    }

`new` 一个 `Promise`，其内部做了哪些事呢？按如下来分析其执行结果：

1.  创建一个新的 `Promise` 实例 `promise`
2.  设置 `promise` 的状态为 `pending` <br/>
    设置 `promise` 的值为 `undefined`
3.  调用 `fn`
4.  返回 `promise`

从以上的执行步骤，得知：

-   每 `new Promise(fn)`，都会返回一个新的 `promise`
-   若 `fn` 不修改 `promise`，`promise` 将保持其状态为 `pending`、其值为 `undefined`

### 重点

1.  `promise` 运行过程中内部若出错（代码运行异常出错/throw 抛出错误），`promise` 的状态会立即变为 `rejected`

2.  调用 `fn` 时，`fn` 做了哪些事呢？`fn(resolve, reject)` 的参数 `resolve`, `reject` 是谁传过来的呢？

    -   `Promise` 内部方法 `_resolve` 传递给 `fn` 参数 `resolve` <br>
        `Promise` 内部方法 `_reject` 传递给 `fn` 参数 `reject` <br>
        调用 `fn(resolve, reject)`，就等于是调用 `fn(_resolve, _reject)`<br>

    -   运行 `resolve(value)`，就等于是运行 `_resolve(promise, value)`<br>
        若运行完成，则 `promise` 的状态从 `pending` 变为 `resolved` (`fulfilled` / `rejected`，若运行成功，则状态为 `fulfilled`，若运行失败，则状态为 `rejected` )

        > `Promise` 的 3 种状态：`pending`, `fulfilled`, `rejected`<br>
        > 也常见到术语 `settled`, `resolved`，他们都表示 `Promise` 的完成状态，因此它们包括 `fulfilled` 和 `rejected` 两种状态<br>
        > 通常，我们也把 `fulfilled` 状态称为 `resolved` 状态，因此，无特殊说明，`resolved` 就指代 `fulfilled`

            new Promise(function fn (resolve, reject) {
                // ...
                resolve(value);
            })

    -   运行 `reject(reason)`，就等于是运行 `_reject(promise, reason)`<br>
        若运行完成，则 `promise` 的状态从 `pending` 变为 `rejected`

            new Promise(function fn (resolve, reject) {
                // ...
                reject(reason);
            })

## 方法

### Promise.resolve(value)

按如下来分析其执行结果：

1.  判断 `value` 是否是 `Promise` 实例，若是，直接返回 `value`，若否，继续

        const p1 = new Promise(() => {});
        const p2 = Promise.resolve(p1);
        console.log(p1 === p2);

        // true

2.  `new` 一个 `Promise` 实例 `promise`
3.  判断 `value` 是否是有 `then` 方法的函数或对象，若是，执行 `then` 方法，若否，继续

        const p0 = {
            then: function(fulfillmentHandler, rejectionHandler) {
                fulfillmentHandler('value');
            }
        };
        const p1 = Promise.resolve(p0);
        setTimeout(() => {
            console.log(p1);
        });

        // Promise { [[PromiseStatus]]: 'resolved', [[PromiseValue]]: 'value' }
    ---
        const p0 = {
            then: function(fulfillmentHandler, rejectionHandler) {
                rejectionHandler('reason');
            }
        };
        const p1 = Promise.resolve(p0);
        setTimeout(() => {
            console.log(p1);
        });

        // Promise { [[PromiseStatus]]: 'rejected', [[PromiseValue]]: 'reason' }

4.  若 `value` 不属于以上情况，则设置 `promise` 的状态为 `resolved`，设置 `promise` 的值为 `value`

        const p1 = Promise.resolve('value');
        console.log(p1);

        // Promise { [[PromiseStatus]]: 'resolved', [[PromiseValue]]: 'value' }

5.  返回 `promise`

### Promise.prototype.then(onFulfilled, onRejected)

    parent.then(onFulfilled, onRejected)

按如下来分析其执行结果：

1.  `new` 一个 `Promise` 实例 `child`
2.  判断 `then` 是否有相应的回调函数（即，`parent` 的最终状态若为 `fulfilled`，`then` 是否有回调函数 `onFulfilled`, `parent` 的最终状态若为 `rejected`，`then` 是否有回调函数 `onRejected`）<br>
    -   若有回调函数，以 `回调函数` 的 `返回值` 来 `resolve`

            const p0 = Promise.resolve('value');
            const p1 = p0.then(value => {
                return value;
            }, null);
            setTimeout(() => {
                console.log(p0 === p1);
                console.log(p0);
                console.log(p1);
            });

            // false
            // Promise { [[PromiseStatus]]: 'resolved', [[PromiseValue]]: 'value' }
            // Promise { [[PromiseStatus]]: 'resolved', [[PromiseValue]]: 'value' }

         ---

            const p0 = Promise.reject('reason');
            const p1 = p0.then(null, reason => {
                return reason;
            });
            setTimeout(() => {
                console.log(p0 === p1);
                console.log(p0);
                console.log(p1);
            });

            // false
            // Promise { [[PromiseStatus]]: 'rejected', [[PromiseValue]]: 'reason' }
            // Promise { [[PromiseStatus]]: 'resolved', [[PromiseValue]]: 'reason' }

    -   若没有回调函数
        -   若 `parent` 状态为 `fulfilled`，则设置 `child` 状态为 `fulfilled`，设置 `child` 值为 `parent` 的值

                const p0 = Promise.resolve('value');
                const p1 = p0.then();
                setTimeout(() => {
                    console.log(p0 === p1);
                    console.log(p0);
                    console.log(p1);
                });

                // false
                // Promise { [[PromiseStatus]]: 'resolved', [[PromiseValue]]: 'value' }
                // Promise { [[PromiseStatus]]: 'resolved', [[PromiseValue]]: 'value' }

        -   若 `parent` 状态为 `rejected`，则设置 `child` 状态为 `rejected`，设置 `child` 值为 `parent` 的值

                const p0 = Promise.reject('reason');
                const p1 = p0.then();
                setTimeout(() => {
                    console.log(p0 === p1);
                    console.log(p0);
                    console.log(p1);
                });

                // false
                // Promise { [[PromiseStatus]]: 'rejected', [[PromiseValue]]: 'reason' }
                // Promise { [[PromiseStatus]]: 'rejected', [[PromiseValue]]: 'reason' }

3.  返回 `child`

## 实现一个 Promise

### 构造函数

    function ESPromise(fn) {
        this._state = PENDING;
        this._result = undefined;

        // 保存 then 回调数组
        this._subscribers = [];

        try {
            fn(value => {
                resolve(this, value)
            }, reason => {
                reject(this, reason)
            });
        } catch (e) {
            reject(this, e);
        }
    }

---

    function resolve(promise, value) {
        if (isObjectOrFunction(value) && isFunction(value.then)) {
            handleThenable(promise, value);
        } else {
            fulfill(promise, value);
        }
    }

    function reject(promise, reason) {
        if (promise._state !== PENDING) { return; }

        promise._state = REJECTED;
        promise._result = reason;

        asyncCallback(publish, promise);
    }

---

    function handleThenable(promise, thenable) {
        asyncCallback(promise => {
            let sealed = false;
        
            thenable.then(value => {
                if (sealed) { return; }
                sealed = true;

                /* 
                避免无限循环
                */
                if (thenable !== value ) {
                    resolve(promise, value);
                } else {
                    fulfill(promise, value);
                }
            }, reason => {
                if (sealed) { return; }
                sealed = true;
        
                reject(promise, reason);
            });
        }, promise);
    }

    function fulfill(promise, value) {
        if (promise._state !== PENDING) { return; }

        promise._state = FULFILLED;
        promise._result = value;

        asyncCallback(publish, promise);
    }

---

    function publish(promise) {
        let { _subscribers, _state, _result } = promise;
        let { length } = _subscribers;

        if (length === 0) { return; }

        let child, callback;
        for (let i = 0; i < length; i += 3) {
            child = _subscribers[i];
            callback = _state === FULFILLED ? _subscribers[i + 1] : _subscribers[i + 2];

            invokeCallback(_state, child, callback, _result);
        }

        promise._subscribers.length = 0;
    }

### then 方法

    ESPromise.prototype.then = function(onFulfilled, onRejected) {
        const parent = this;
        const child = new this.constructor(noop);

        const { _state, _result } = parent;
        if (_state === FULFILLED || _state === REJECTED) {
            const callback = _state === FULFILLED ? onFulfilled : onRejected;
            asyncCallback(() => invokeCallback(_state, child, callback, _result));
        } else {
            subscribe(parent, child, onFulfilled, onRejected);
        }

        return child;
    }

---

    function invokeCallback(settled, promise, callback, result) {
        let hasCallback = isFunction(callback);
        let value = hasCallback ? callback(result) : result;

        if (promise._state !== PENDING) {
            // noop
        } else if (hasCallback) {
            resolve(promise, value);
        } else if (settled === FULFILLED) {
            fulfill(promise, value);
        } else if (settled === REJECTED) {
            reject(promise, value);
        }
    }

    function subscribe(parent, child, onFulfilled, onRejected) {
        let { _subscribers, _state } = parent;
        let { length } = _subscribers;

        _subscribers[length] = child;
        _subscribers[length + 1] = onFulfilled;
        _subscribers[length + 2] = onRejected;

        if (length === 0 && (_state === FULFILLED || _state === REJECTED)) {
            asyncCallback(publish, parent);
        }
    }

---

    function asyncCallback (callback, args) {
        /* 
        实际情况比这要复杂得多，这里使用 setTimeout 代表 这是一个异步回调
        */
        setTimeout(() => {
            callback(args);
        });
    }

### catch 方法

    ESPromise.prototype.catch = function(onRejected) {
        return this.then(null, onRejected);
    }

### finally 方法

    ESPromise.prototype.finally = function(callback) {
        let promise = this;
        let constructor = this.constructor;

        if (isFunction(callback)) {
            return promise.then(value => {
                return constructor.resolve(callback()).then(() => value);
            }, reason => {
                return constructor.resolve(callback()).then(() => { throw reason; });
            });
        }

        return promise.then(callback, callback);
    }

### resolve 方法

    ESPromise.resolve = function (value) {
        if (value && typeof value === 'object' && value.constructor === this) {
            return value;
        }

        let promise = new this(noop);
        resolve(promise, value);
        return promise;
    }

### reject 方法

    ESPromise.reject = function (reason) {
        let promise = new this(noop);
        reject(promise, reason);
        return promise;
    }

### race 方法

    ESPromise.race = function (entries) {
        let constructor = this;

        if (!isArray(entries)) {
            return constructor.reject('error');
        }

        return new constructor((resolve, reject) => {
            let { length } = entries;

            for (let i = 0; i < length; i++) {
                constructor.resolve(entries[i]).then(resolve, reject);
            }
        });
    }

### all 方法

    ESPromise.all = function (entries) {
        let constructor = this;

        if (!isArray(entries)) {
            return constructor.reject('error');
        }

        return new constructor((resolve, reject) => {
            let { length } = entries;
            let remaining = length;
            let result = new Array(length);

            for (let i = 0; i < length; i++) {
                constructor.resolve(entries[i]).then(value => {
                    remaining--;
                    result[i] = value;

                    if (remaining === 0) {
                        resolve(result);
                    }
                }, reason => {
                    reject(reason);
                });
            }
        });
    }

### 完整代码

完整代码可以查看[这里](https://juejin.im/post/5e0b0885e51d4541093e84e2)

## 参考

-   [ES6 Promise](https://github.com/stefanpenner/es6-promise)
-   [MDN - Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
-   [ECMAScript 6 入门 - Promise 对象](http://es6.ruanyifeng.com/#docs/promise)
-   [Promises/A+规范](https://www.ituring.com.cn/article/66566)