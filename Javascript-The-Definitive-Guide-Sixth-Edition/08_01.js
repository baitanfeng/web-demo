{
    function factorial(n) {
        if (Number.isFinite(n) && n > 0 && n === Math.round(n)) {
            if (!(n in factorial)) {
                factorial[n] = n * factorial(n - 1);
            }
            return factorial[n];
        }
        else {
            return Number.NaN;
        }
    }
    factorial[1] = 1;
}

{
    var scope = 'global scope';
    function checkscope() {
        var scope = 'local scope';
        function f() {
            return scope;
        }
        return f;
    }
    checkscope()();
}

{
    var scope = 'global scope';
    function checkscope() {
        var scope = 'local scope';
        function f() {
            return scope;
        }
        return f();
    }
    checkscope();
}

{
    function counter() {
        var n = 0;
        return {
            count: function() {
                return n++;
            },
            reset: function() {
                n = 0;
            }
        };
    }

    var c = counter(), d = counter();
    c.count();
    d.count();
    c.reset();
    c.count();
    d.count();
}

{
    function counter(n) {
        return {
            get count() {
                return n++;
            },
            set count(m) {
                n = m;
            }
        };
    }

    var c = counter(1000);
    c.count // 1000
    c.count // 1001
    c.count = 2000
    c.count // 2000
    c.count // 2001
}

{
    var sum = function(x, y) {
        return x + y;
    };
    var succ = sum.bind(null, 1);
    succ(2);
}