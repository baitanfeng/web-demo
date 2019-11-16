{
    function makeRequest (url, timeout,  callback) {
        timeout = typeof timeout !== 'undefined' ? timeout : 2000;
        callback = typeof callback !== 'undefined' ? callback : function () {};

        // ...
    }
}

{
    function makeRequest (url, timeout = 2000, callback = function () {}) {
        // ...
    }
}

{
    let value = 5;

    function getValue () {
        return value++;
    }

    function add (first, second = getValue()) {
        return first + second;
    }

    console.log(add(1)) // 6
    console.log(add(1)) // 7
}

{
    function pick (object, ...keys) {
        let result = Object.create(null);

        for (let i = 0, len = keys.length; i < len; i++) {
            result[keys[i]] = object[keys[i]];
        }

        return result;
    }
}

{
    let values = [-25, -50];

    Math.max(0, ...values);
}

{
    var person = {
        get firstName () {
            return 'tianya';
        }
    };

    Object.getOwnPropertyDescriptor(person, "firstName").get.name;
}

{
    var doSomething = function doSomething () {
        // ...
    };

    console.log(doSomething.name);
    console.log(doSomething.bind().name);
    console.log((new Function()).name);
}

{
    function Person (name) {
        this.name = name;
    }

    var person = new Person('tianya');
    var notAPerson = Person('tianya');

    console.log(person);
    console.log(notAPerson);
}

{
    function Person (name) {
        if (this instanceof Person) {
            this.name = name;
        }
        else {
            throw new Error('You must use new with Person.');
        }
    }

    var person = new Person('tian');
    // var notAPerson = Person('tian');
    var notAPerson = Person.call(person, 'tian');
}

{
    function Person (name) {
        if (typeof new.target !== 'undefined') {
            this.name = name;
        }
        else {
            throw new Error('You must use new with Person.');
        }
    }

    var person = new Person('tian');
    var notAPerson = Person.call(person, 'tian');
}
