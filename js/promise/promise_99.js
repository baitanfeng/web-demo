{
    function Promise (fn) {
        // promise 状态变量
        // 0 - pending
        // 1 - resolved
        // 2 - rejected
        this._state = 0;

        // promise 执行结果
        this._value = null;

        // then(...) 注册回调处理数组
        this._deferreds = [];

        try {
            fn(value => {
                resolve(this, value);
            }, reason => {
                reject(this, reason);
            })
        } catch (error) {
            reject(this, error);
        }
    }

    Promise.prototype.then = function (onFulfilled, onRejected) {
        let child = new Promise(function () {});
        let deferred = new Handler(child, onFulfilled, onRejected);

        // 当前状态为 pending, 存储延迟处理对象
        if (this._state === 0) {
            this._deferreds.push(deferred);
            return child;
        }

        handleResolved(this, deferred);

        return child;
    }

    function Handler (promise, onFulfilled, onRejected) {
        this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
        this.onRejected = typeof onRejected === 'function' ? onRejected : null;
        this.promise = promise;
    }

    function resolve (promise, value) {
    }
}