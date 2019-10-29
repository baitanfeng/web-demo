{
    let text = 'testing: 1, 2, 3';
    let pattern = /\d+/g;
    pattern.test(text);
    text.search(pattern);
    text.match(pattern);
    text.replace(pattern, "#");
    text.split(/\D+/);
}

{
    let s = 'test', n = 1, b = true;
    let S = new String(s);
    let N = new Number(n);
    let B = new Boolean(b);
    console.log(S, typeof S, Object.getPrototypeOf(S));
    console.log(N, typeof N, Object.getPrototypeOf(N));
    console.log(B, typeof B, Object.getPrototypeOf(B));
}

{
    function equalArrays(a, b) {
        if (a.length !== b.length) return false;
        for (let i = 0, len = a.length; i < len; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }
}

{
    console.log(Number('3'));
    console.log(String(false));
    console.log(Boolean([]));
    console.log(Object(3));
}

{
    var scope = "global";
    function checkscope() {
        var scope = 'local';
        return scope;
    }
    console.log(checkscope(), scope);
}

{
    let scope = 'global';
    function checkscope() {
        let scope = 'local';
        return scope;
    }
    console.log(checkscope(), scope);
}

{
    var scope = 'global';
    function f() {
        console.log(scope);
        var scope = 'local';
        console.log(scope);
    }
    f();
}

{
    var scope = 'global';
    function f() {
        console.log(scope);
        let scope = 'local';
        console.log(scope);
    }
    f();
}