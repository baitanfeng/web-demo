{
    var table = new Array(10);
    for(var i = 0, len = table.length; i < len; i++) {
        table[i] = new Array(10);
    }
    for (var row = 0, rowLen = table.length; row < rowLen; row++) {
        for (var col = 0, colLen = table[row].length; col < colLen; col++) {
            table[row][col] = row * col;
        }
    }
    var product = table[5][7];
}

{
    var a = ['ant', 'Bug', 'cat', 'Dog'];
    a.sort();
    a.sort((s, t) => {
        var prev = s.toLowerCase();
        var next = t.toLowerCase();
        if (prev < next) return -1;
        if (prev > next) return 1;
        return 0;
    });
}

{
    var data = [1, 2, 3, 4, 5];
    data.forEach((v, i) => {
        data[i] = v + 1;
    });
    data;
}

{
    function foreach(a, f, t) {
        try {
            a.forEach(f, t);
        } catch (e) {
            if (e === foreach.break) return;
            else throw e;
        }
    }
    foreach.break = new Error("StopIteration");
}

{
    function findall(a, x) {
        var results = [],
            len = a.length,
            pos = 0;
        while(pos < len) {
            pos = a.indexOf(x, pos);
            if (pos === -1) break;
            results.push(pos);
            pos = pos + 1;
        }
        return results;
    }
}

{
    var isArray = Function.isArray || function(o) {
        return typeof o === 'object' &&
            Object.prototype.toString.call(o) === '[object Array]';
    };
}

{
    Array.join = Array.join || function(a, sep) {
        return Array.prototype.join.call(a, sep);
    };
    Array.slice = Array.slice || function(a, from, to) {
        return Array.prototype.slice.call(a, from, to);
    };
    Array.map = Array.map || function(a, f, thisArg) {
        return Array.prototype.map(a, f, thisArg);
    };
}

{
    var s = "JavaScript";
    Array.prototype.join.call(s, ' ');
    Array.prototype.map.call(s, x => x.match(/[^aeiou]/)).join("");
}