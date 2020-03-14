{
    setTimeout(function f1() {
        console.log(1);
    }, 0);

    setImmediate(function f2() {
        console.log(2);
    });

    // 1 2 或 2 1
}

{
    setTimeout(() => {
        setTimeout(function f1() {
            console.log(1);
        }, 0);

        setImmediate(function f2() {
            console.log(2);
        });
    });

    // 2 1
}

{
    const fs = require('fs');

    fs.readFile(__filename, () => {
        setTimeout(function f1() {
            console.log(1);
        }, 0);

        setImmediate(function f2() {
            console.log(2);
        });
    });

    // 2 1
}
