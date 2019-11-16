{
    let firstName = Symbol('first name');
    let secondName = Symbol();
    let person = {};

    person.firstName = 'tianya';

    console.log(firstName in person);
    console.log(person.firstName);
    console.log(firstName, secondName);
}

{
    let arr = [];
    arr instanceof Array;
    Array[Symbol.hasInstance](arr);
}

{
    function MyObject () {
        // ...
    }

    Object.defineProperty(MyObject, Symbol.hasInstance, {
        value: function (v) {
            return false;
        }
    });

    let obj = new MyObject();
    obj instanceof MyObject;
}

{
    function SpecialNumber () {
        // ...
    }

    Object.defineProperty(SpecialNumber, Symbol.hasInstance, {
        value: function (v) {
            return (v instanceof Number) && (v >= 1 && v <= 100);
        }
    });

    let two = new Number(2),
        zero = new Number(0);

    console.log(two instanceof SpecialNumber);
    console.log(zero instanceof SpecialNumber);
}

{
    let collection = {
        0: 'hello',
        1: 'world',
        length: 2,
        [Symbol.isConcatSpreadable]: true
    };

    let messages = ['hi'].concat(collection);
    messages;
}

{
    function Person (name) {
        this.name = name;
    }

    Person.prototype[Symbol.toStringTag] = 'Person';
    Person.prototype.toString = function () {
        return this.name;
    };

    let me = new Person('tianya');

    console.log(me.toString());
    console.log(Object.prototype.toString.call(me));
}