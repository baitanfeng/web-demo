{
    var funcs = [],
        object = {
            a: true,
            b: true,
            c: true
        };
    
    for (const key in object) {
        funcs.push(function () {
            console.log(key);
        });
    }

    funcs.forEach(func => func());
}