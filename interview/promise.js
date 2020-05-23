function isObject(v) {
  return v !== null && typeof v === 'object';
}

function isFunction(v) {
  return typeof v === 'function';
}

function isIterable(v) {
  return v != null && typeof v[Symbol.iterator] === 'function';
}

function noop() {}

function _resolve(promise, value) {
  _fulfill(promise, value);
}

function _fulfill(promise, value) {
  if (promise._state !== 'pending') return;

  promise._state = 'fulfilled';
  promise._result = value;
  publish(promise);
}

function _reject(promise, value) {
  if (promise._state !== 'pending') return;

  promise._state = 'rejected';
  promise._result = value;
  publish(promise);
}

function Promise(executor) {
  this._state = 'pending';
  this._result = undefined;
  this._subscribers = [];

  const resolve = v => _resolve(this, v);
  const reject = v => _reject(this, v);
  executor(resolve, reject);
}

Promise.prototype.then = function (onfulfilled, onrejected) {
  const parent = this;
  const child = new this.constructor(noop);
  const { _state, _result } = parent;

  if (_state === 'fulfilled' || _state === 'rejected') {
    const callback = _state === 'fulfilled' ? onfulfilled : onrejected;
    invokeCallback(_state, child, callback, _result)
  } else {
    subscribe(parent, child, onfulfilled, onrejected);
  }

  return child;
}

Promise.prototype.catch = function (onrejected) {
  return this.then(null, onrejected);
}

Promise.prototype.finally = function (callback) {
  return this.then(callback, callback);
}

Promise.resolve = function (value) {
  if (isObject(value) && value.constructor === this) return value;

  const promise = new this(noop);
  _fulfill(promise, value);
  return promise;
}

Promise.reject = function (value) {
  const promise = new this(noop);
  _reject(promise, value);
  return promise;
}

Promise.race = function (values) {
  if (!isIterable(values)) {
    throw new TypeError(`${values} is not iterable`);
  }

  const Ctor = this;

  return new Ctor((resolve, reject) => {
    for (const value of values) {
      Ctor.resolve(value).then(resolve, reject);
    }
  });
}

Promise.all = function (values) {
  if (!isIterable(values)) {
    throw new TypeError(`${values} is not iterable`);
  }

  const Ctor = this,
    result = [];
  let remaining = [...values].length;

  return new Ctor((resolve, reject) => {
    for (const value of values) {
      Ctor.resolve(value).then(v => {
        remaining--;
        result.push(v);

        if (remaining === 0) {
          resolve(result);
        }
      }, reject)
    }
  })
}

function subscribe(parent, child, onfulfilled, onrejected) {
  const { _subscribers } = parent;
  const { length } = _subscribers;

  _subscribers[length] = child;
  _subscribers[length + 1] = onfulfilled;
  _subscribers[length + 2] = onrejected;
}

function publish(promise) {
  const { _subscribers, _state, _result } = promise;
  const { length } = _subscribers;

  let child, callback;
  for (let i = 0; i < length; i += 3) {
    child = _subscribers[i];
    callback = _state === 'fulfilled' ? _subscribers[i + 1] : _subscribers[i + 2];

    invokeCallback(_state, child, callback, _result);
  }

  _subscribers.length = 0;
}

function invokeCallback(settled, promise, callback, result) {
  const value = isFunction(callback) ? callback(result) : result;
  if (settled === 'fulfilled') {
    _fulfill(promise, value);
  } else if (settled === 'rejected') {
    _reject(promise, value);
  }
}