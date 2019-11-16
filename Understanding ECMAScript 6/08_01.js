{
    function * createIterator () {
        yield 1;
        yield 2;
        yield 3;
    }

    let iterator = createIterator();
    
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
}

{
    function * createIterator (items) {
        for (let i = 0, len = items.length; i < len; i ++) {
            yield items[i];
        }
    }

    let iterator = createIterator([1, 2, 3]);
    
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
}

{
    let createIterator = function * createIterator (items) {
        for (let i = 0, len = items.length; i < len; i ++) {
            yield items[i];
        }
    }

    let iterator = createIterator([1, 2, 3]);
    
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
}

{
    let o = {
        * createIterator (items) {
            for (let i = 0, len = items.length; i < len; i ++) {
                yield items[i];
            }
        }
    };

    let iterator = o.createIterator([1, 2, 3]);
    
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
}

{
    let collection = {
        items: [],
        * [Symbol.iterator] () {
            for (let item of this.items) {
                yield item;
            }
        }
    };

    collection.items.push(1, 2, 3);

    for (let x of collection) {
        console.log(x);
    }
}

{
    let data = new Map();

    data.set('title', 'understanding es6');
    data.set('format', 'ebook');

    for (let [key, value] of data) {
        console.log(key + " " + value);
    }
}

{
    var message = 'A B';

    for (let i = 0, len = message.length; i < len; i++) {
        console.log(message[i]);
    }

    for (let c of message) {
        console.log(c);
    }
}