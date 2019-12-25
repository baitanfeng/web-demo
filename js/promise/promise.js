const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

function isObjectOrFunction(x) {
    return x !== null && (typeof x === 'object' || typeof x === 'function');
}

function isFunction(x) {
    return typeof x === 'function';
}

function isArray(x) {
    if (Array.isArray) {
        return Array.isArray(x);
    } else {
        return Object.prototype.toString.call(x) === '[object Array]';
    }
}

function noop() {}

function ESPromise(fn) {
    this._state = PENDING;
    this._result = undefined;
    this._subscribers = [];

    fn(value => {
        resolve(this, value)
    }, reason => {
        reject(this, reason)
    });
}

ESPromise.prototype.then = function(onFulfilled, onRejected) {
    const parent = this;
    const child = new this.constructor(noop);

    const { _state, _result } = parent;
    if (_state === FULFILLED || _state === REJECTED) {
        const callback = _state === FULFILLED ? onFulfilled : onRejected;
        invokeCallback(_state, child, callback, _result);
    } else {
        subscribe(parent, child, onFulfilled, onRejected);
    }

    return child;
}

ESPromise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
}

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

ESPromise.resolve = function (value) {
    if (value && typeof value === 'object' && value.constructor === this) {
        return value;
    }

    let promise = new this(noop);
    resolve(promise, value);
    return promise;
}

ESPromise.reject = function (reason) {
    let promise = new this(noop);
    reject(promise, reason);
    return promise;
}

ESPromise.race = function (entries) {
    let constructor = this;

    if (!isArray(entries)) {
        return constructor.reject('error');
    }

    return new constructor((resolve, reject) => {
        for (let i = 0; i < entries.length; i++) {
            constructor.resolve(entries[i]).then(resolve, reject);
        }
    });
}

ESPromise.all = function (entries) {
    let constructor = this;

    if (!isArray(entries)) {
        return constructor.reject('error');
    }

    return new constructor((resolve, reject) => {
        let { length } = entries;
        let remaining = length;
        let result = new Array(length);

        for (let i = 0; i < entries.length; i++) {
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

function invokeCallback(settled, promise, callback, result) {
    if (isFunction(callback)) {
        let value = callback(result);
        resolve(promise, value);
    } else {
        settled === FULFILLED ? fulfill(promise, result) : reject(promise, result);
    }
}

function subscribe(parent, child, onFulfilled, onRejected) {
    let { _subscribers, _state } = parent;
    let { length } = _subscribers;

    _subscribers[length] = child;
    _subscribers[length + 1] = onFulfilled;
    _subscribers[length + 2] = onRejected;

    if (length === 0 && (_state === FULFILLED || _state === REJECTED)) {
        publish(parent);
    }
}

function resolve(promise, value) {
    if (isObjectOrFunction(value)) {
        if (isFunction(value.then)) {
            handleThenable(promise, value);
        } else {
            fulfill(promise, value);
        }
    } else {
        fulfill(promise, value);
    }
}

function handleThenable(promise, thenable) {
    let sealed = false;

    thenable.then(value => {
        if (sealed) { return; }
        sealed = true;

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
}

function fulfill(promise, value) {
    if (promise._state !== PENDING) { return; }

    promise._state = FULFILLED;
    promise._result = value;

    publish(promise);
}

function reject(promise, reason) {
    if (promise._state !== PENDING) { return; }

    promise._state = REJECTED;
    promise._result = reason;

    publish(promise);
}

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