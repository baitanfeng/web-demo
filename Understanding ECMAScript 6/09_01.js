{
    class PersonClass {
        constructor (name) {
            this.name = name;
        }

        sayName () {
            console.log(this.name);
        }
    }

    let person = new PersonClass('tianya');
    person.sayName();
    PersonClass.prototype;
}

{
    let PersonClass = class PersonClass {
        constructor (name) {
            this.name = name;
        }

        sayName () {
            console.log(this.name);
        }
    };

    let person = new PersonClass('tianya');
    person.sayName();
    PersonClass.prototype;
}

{
    class CustomHTMLElement {
        constructor (element) {
            this.element = element;
        }

        get html () {
            return this.element.innerHTML;
        }

        set html (value) {
            this.element.innerHTML = value;
        }
    }
}

{
    let methodName = 'sayName';

    class PersonClass {
        constructor (name) {
            this.name = name;
        }

        [methodName] () {
            console.log(this.name);
        }
    }
}

{
    class Collection {
        constructor () {
            this.items = [];
        }

        * [Symbol.iterator] () {
            yield * this.items.values();
        }
    }

    let collection = new Collection();
    collection.items.push(1, 2, 3);
    for (let x of collection) {
        console.log(x);
    }
}

{
    class Rectangle {
        constructor (length, width) {
            this.length = length;
            this.width = width;
        }

        getArea () {
            return this.length * this.width;
        }
    }

    class Square extends Rectangle {
        constructor (length) {
            super(length, length);
        }
    }

    let square = new Square(3);

    console.log(square.getArea());
    console.log(square instanceof Square);
    console.log(square instanceof Rectangle);
}

{
    class Rectangle {
        constructor (length, width) {
            this.length = length;
            this.width = width;
        }

        getArea () {
            return this.length * this.width;
        }

        static create (length, width) {
            return new Rectangle(length, width);
        }
    }

    class Square extends Rectangle {
        constructor (length) {
            super(length, length);
        }
    }

    let rect = Square.create(3, 4);

    console.log(rect.getArea());
    console.log(rect instanceof Square);
    console.log(rect instanceof Rectangle);
}