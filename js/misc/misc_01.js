{
    function fibonacci_DP (n) {
        if (n < 1) throw new RangeError('参数必须大于等于1');
        if (n === 1 || n === 2) return 1;

        n = n - 2;
        let res = 1,
            pre = 1,
            cur = 1;

        while (n) {
            res = pre + cur;
            pre = cur;
            cur = res;
            n--;
        }

        return res;
    }

    const memory = fn => {
        let obj = {};
        return n => {
            if (obj[n] === undefined) {
                obj[n] = fn(n);
            }
            return obj[n];
        }
    }

    fibonacci_DP = memory(fibonacci_DP);

    fibonacci_DP(100);
}