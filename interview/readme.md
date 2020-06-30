## 手写 浅拷贝(shallowClone) 与 深拷贝(deepClone)

参考：

- [[ ConardLi ] 如何写出一个惊艳面试官的深拷贝?](https://juejin.im/post/5d6aa4f96fb9a06b112ad5b1)
- [[ 鬼鬼鬼 ] JavaScript 内存机制（前端同学进阶必备）](https://juejin.im/post/5b10ba336fb9a01e66164346)
- [[ Nicholas C.Zakas ] Sets and Maps](https://leanpub.com/understandinges6/read#leanpub-auto-sets-and-maps)

```
function isObject (value) {
  return value !== null && typeof value === "object";
}

function shallowClone (value) {
  if (!isObject(value)) { return value; }

  const isArrayValue = Array.isArray(value);
  const result = isArrayValue ? [] : {};

  if (isArrayValue) {
    // for 的效率比 for...in 高
    for (let i = 0, len = value.length; i < len; i++) {
      result[i] = value[i];
    }
  } else {
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        result[key] = value[key];
      }
    }
  }

  return result;
}

function deepClone (value, map = new WeakMap()) {
  if (!isObject(value)) { return value; }

  const isArrayValue = Array.isArray(value);
  const result = isArrayValue ? [] : {};

  // 解决递归循环引用问题
  if (map.has(value)) {
    return map.get(value);
  }
  map.set(value, result);
  
  if (isArrayValue) {
    // for 的效率比 for...in 高
    for (let i = 0, len = value.length; i < len; i++) {
      result[i] = deepClone(value[i], map);
    }
  } else {
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        result[key] = deepClone(value[key], map);
      }
    }
  }

  return result;
}
```

## 手写 防抖(debounce) 与 节流(throttle)

```
function debounce(fn, threshold = 250, {scope = undefined} = {}) {
  let deferTimer;
  return function () {
    const context = scope || this;
    const args = arguments;

    clearTimeout(deferTimer);
    deferTimer = setTimeout(() => {
      fn.apply(context, args);
    }, threshold);
  }
}

function throttle(fn, threshold = 250, {scope = undefined} = {}) {
  let deferTimer;
  return function () {
    const context = scope || this;
    const args = arguments;

    if (deferTimer == null) {
      deferTimer = setTimeout(() => {
        deferTimer = null;
        fn.apply(context, args);
      }, threshold);
    }
  }
}
```

## 思考 原型与原型链

参考

- [[ manxisuo ] JavaScript 世界万物诞生记](https://zhuanlan.zhihu.com/p/22989691)


```
function Person () {}

Person.prototype.__proto__ === Object.prototype;
Person.__proto__ === Function.prototype;

Function.__proto__ === Function.prototype;
// (对象Function).__proto__ === (构造函数Function).prototype
```

![原型与原型链](./prototype.jpg "原型与原型链")


## 理解 作用域链与闭包

参考
- [[ mqyqingfeng ] JavaScript深入之作用域链](https://github.com/mqyqingfeng/Blog/issues/6)
- [ Kyle Simpson ] 你不知道的JavaScript（上卷） 第一部分 第1~4章
- [ Nicholas C.Zakas ] JavaScript高级程序设计（第3版） 4.2 执行环境及作用域 7.2 闭包

```
const a = 10;

function getA() {
  const a = 20;
  
  inner();
  outer();

  function inner() {
    console.log('inner: ' + a);
  }
}

function outer() {
  console.log('outer: ' + a);
}

getA();

// inner: 20
// outer: 10
```

## 理解 this 与箭头函数

参考

- [[ Nicholas C.Zakas ] Arrow Functions](https://leanpub.com/understandinges6/read#leanpub-auto-arrow-functions)
- [ Nicholas C.Zakas ] JavaScript高级程序设计（第3版） 7.2.2 关于 this 对象

```
/* 
函数内部有一个特殊对象 this，this 引用的是函数据以执行的环境对象

this 对象是在运行时基于函数的执行环境绑定的：
在全局函数中，this 等于 window，而当函数被作为某个对象的方法调用时，this 等于那个对象
*/

var name = 'global';

var obj1 = {
  name: 'local',
  getName: function () {
    var that = this;
    return () => {
      console.log(this.name, that.name);
    }
  }
};

obj1.getName()(); // local local (非严格模式下)
```

## 手写 apply/call

```
if (!Function.prototype.apply) {
  Object.defineProperty(Function.prototype, 'apply', {
    enumerable: false,
    writable: true,
    configurable: true,
    value: function () {
      if (typeof this !== 'function') {
        throw new TypeError(`${this} is not a function`);
      }

      let T = arguments[0];
      if (T == null) { T = window; }
      T = Object(T);

      const len = arguments.length;
      let args;
      if (len > 1) {
        args = arguments[1];
      }

      const k = Symbol('keyThis');
      T[k] = this;
      const result = len > 1 ? T[k](...args) : T[k]();
      delete T[k];
      return result;
    }
  });
}
```

## 手写 bind

参考

- [[ MDN ] Function.prototype.bind()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

```
if (!Function.prototype.bind) {
  Object.defineProperty(Function.prototype, 'bind', {
    enumerable: false,
    writable: true,
    configurable: true,
    value: function () {
      if (typeof this !== 'function') {
        throw new TypeError(`${this} is not a function`);
      }

      let T = arguments[0];
      if (T == null) { T = window; }
      T = Object(T);

      const len = arguments.length;
      let args = [];
      if (len > 1) {
        args = Array.prototype.slice.call(arguments, 1);
      }

      const _this = this;
      return function () {
        return _this.apply(T, [...args, ...arguments]);
      }
    }
  });
}
```

## 了解 Promise

参考

- [[ Nicholas C.Zakas ] Promises and Asynchronous Programming](https://leanpub.com/understandinges6/read#leanpub-auto-promises-and-asynchronous-programming)

```
function isIterable(v) {
  return v != null && typeof v[Symbol.iterator] === 'function';
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
```

## 理解 JS运行机制

参考

- [[ 快狗打车前端团队 ] 人人都看得懂的JS运行机制](https://juejin.im/post/5d4b8acdf265da03bc126451)
- [[ Alexander Zlatkov ] How JavaScript works: Event loop and the rise of Async programming](https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5)

```
console.log('script start');
setTimeout(() => console.log('setTimeout'), 0);
Promise.resolve().then(() => console.log('promise'));
console.log('script end');

// script start
// script end
// promise
// setTimeout
```

## 了解 性能优化

参考

- [[ Jeremy Wagner ] 延迟加载图像和视频](https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video)

```
if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", handler);
} else {
  handler();
}

function handler() {
  const lazyImages = document.querySelectorAll('img.lazy');

  const lazyImageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.classList.remove('lazy');
        lazyImageObserver.unobserve(lazyImage);
      }
    });
  }, {
    rootMargin: '0px 0px 256px 0px'
  });

  lazyImages.forEach(lazyImage => {
    lazyImageObserver.observe(lazyImage);
  });
}
```

## 了解 new Foo(...) 的过程

JavaScript高级程序设计（第三版）里是这样描述的：

1. 创建一个新对象
2. 将构造函数的作用域赋给新对象（因此this就指向了这个新对象）
3. 执行构造函数中的代码（为这个新对象添加属性）
4. 返回新对象

MDN中是这样描述的：

1. A new object is created, inheriting from Foo.prototype
2. The constructor function Foo is called with the specified arguments, and with this bound to the newly created object. new Foo is equivalent to new Foo(), i.e. if no argument list is specified, Foo is called without arguments
3. The Object (not primitive type) returned by the constructor function become the result of the whole new expression. If the constructor function doesn't explicitly return an object, the object created in step 1 is used instead.

实现过程，new Foo(name, age) 类似于 selfDefineNew(Foo, name, age)，看看如下的自定义new来帮助理解其过程

```
function selfDefineNew () {
  const Ctor = Array.prototype.shift.call(arguments);
  
  if (typeof Ctor !== 'function') {
    throw new TypeError(`${Ctor} is not a constructor`);
  }

  const obj = Object.create(Ctor.prototype);
  const result = Ctor.apply(obj, arguments);
  return result instanceof Object ? result : obj;
}
```