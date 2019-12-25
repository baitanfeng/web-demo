{
    const arr = [1, 2, 3];
    for (const iterator of arr) {
        console.log(iterator);
    }
    // 1
    // 2
    // 3

    for (const iterator of Object.entries(arr)) {
        console.log(iterator);
    }
    // ["0", 1]
    // ["1", 2]
    // ["2", 3]

    const obj = {
        a: 1,
        b: 2,
        c: 3
    };
    for (const iterator of Object.entries(obj)) {
        console.log(iterator);
    }
    // ["a", 1]
    // ["b", 2]
    // ["c", 3]
}