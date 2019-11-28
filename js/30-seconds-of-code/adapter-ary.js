{
    const ary = (fn, n) => (...args) => fn(...args.slice(0, n));
    debugger
    const firstTwoMax = ary(Math.max, 2);
    [
        [2, 6, 'a'],
        [6, 4, 8],
        [10]
    ].map(x => firstTwoMax(...x)); // [6, 6, 10]
}