if (!Function.prototype.apply1) (function () {
  function isObject (obj) {
    return obj !== null && typeof obj === 'object';
  }

  Object.defineProperty(Function.prototype, 'apply1', {
    enumerable: false,
    writable: true,
    configurable: true,
    value: function () {
      const thatFn = this;
      const [that, args = []] = [...arguments];

      if (typeof thatFn !== 'function') {
        throw new TypeError(`${thatFn} is not a function`);
      }

      if (!isObject(that)) {
        return thatFn(...args);
      }

      const key = Symbol('thatFn');
      that[key] = thatFn;
      const result = that[key](...args);
      delete that[key];
      return result;
    }
  });
})();

function fn () {
  console.log(this.name);
}

const obj = {
  name: 'local'
};

fn.apply1(obj, [1, 2, 3]);