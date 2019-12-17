{
    Object.getOwnPropertyDescriptor({x: 1}, "x");
}

{
    var o = {};
    Object.defineProperty(o, "x", {
        value: 1,
        writable: true,
        enumerable: false,
        configurable: true
    });
    console.log(o.x);
    console.log(Object.keys(o));
    console.log(Object.getOwnPropertyDescriptor(o, "x"));

    Object.defineProperty(o, "x", {
        writable: false
    });
    console.log(Object.getOwnPropertyDescriptor(o, "x"));

    Object.defineProperty(o, "x", {
        value: 2
    });
    console.log(Object.getOwnPropertyDescriptor(o, "x"));

    Object.defineProperty(o, "x", {
        get: function() {
            return 0;
        }
    });
    console.log(Object.getOwnPropertyDescriptor(o, "x"));
}

{
    Object.defineProperty(Object.prototype, "extend", {
        writable: true,
        enumerable: false,
        configurable: true,
        value: function(o) {
            var names = Object.getOwnPropertyNames(o);
            for (var i = 0; i < names.length; i++) {
                if (names[i] in this) continue;
                var desc = Object.getOwnPropertyDescriptor(o, names[i]);
                Object.defineProperty(this, names[i], desc);
            }
        }
    });
}

{
    var o = {};
    o.toString();
}