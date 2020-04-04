
/**
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
 */

{
    let obj = {};
    obj.value = 2;
    
    let p = Object.getOwnPropertyDescriptor(obj, 'value');
    console.log(p); // {value: 2, writable: true, enumerable: true, configurable: true}
}

{
    let obj = {};
    Object.defineProperty(obj, 'value', {
        value: 2
    });

    let p = Object.getOwnPropertyDescriptor(obj, 'value');
    console.log(p); // {value: 2, writable: false, enumerable: false, configurable: false}
}

{
    let obj = {};
    let dataDef = {};
    dataDef.get = function () {
        return 'get';
    };
    Object.defineProperty(obj, 'value', dataDef);

    let p = Object.getOwnPropertyDescriptor(obj, 'value');
    console.log(p); // {set: undefined, enumerable: false, configurable: false, get: ƒ}
}

{
    function MyClass () {}
    MyClass.prototype.x = 1;

    let a = new MyClass();
    console.log(a.x, MyClass.prototype.x); // 1 1

    a.x = 2;
    console.log(a.x, MyClass.prototype.x); // 2 1

    console.log(a, MyClass.prototype); // {x: 2} {x: 1, constructor: ƒ}
}

{
    function MyClass () {}
    Object.defineProperty(MyClass.prototype, 'x', {
        value: 1
    });

    let a = new MyClass();
    console.log(a.x, MyClass.prototype.x); // 1 1

    a.x = 2; // Ignored, throws in strict mode
    console.log(a.x, MyClass.prototype.x); // 1 1

    console.log(a, MyClass.prototype); // {} {x: 1, constructor: ƒ}
}

{
    function MyClass () {}
    Object.defineProperty(MyClass.prototype, 'x', {
        get () {
            return this._x;
        },
        set (value) {
            this._x = value;
        }
    });
    MyClass.prototype.x = 1;

    let a = new MyClass();
    console.log(a.x, MyClass.prototype.x); // 1 1

    a.x = 2;
    console.log(a.x, MyClass.prototype.x); // 2 1

    console.log(a, MyClass.prototype); // {_x: 2} {_x: 1, constructor: ƒ}
}

{
    function MyClass () {}
    let _x = 1;
    Object.defineProperty(MyClass.prototype, 'x', {
        get () {
            return _x;
        },
        set (value) {
            _x = value;
        }
    });

    let a = new MyClass();
    console.log(a.x, MyClass.prototype.x); // 1 1

    a.x = 2;
    console.log(a.x, MyClass.prototype.x); // 2 2

    console.log(a, MyClass.prototype); // {} {constructor: ƒ}
}