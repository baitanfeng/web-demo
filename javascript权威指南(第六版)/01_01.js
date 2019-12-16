{
    const points = [
        {x: 0, y: 0},
        {x: 1, y: 1}
    ];

    points.dist = function () {
        let p1 = this[0];
        let p2 = this[1];
        let a = p2.x - p1.x;
        let b = p2.y - p1.y;
        return Math.sqrt(a * a + b * b);
    }
}

{
    function factorial(n) {
        let product = 1;
        while(n > 1) {
            product *= n;
            n--;
        }
        return product;
    }
}

{
    let answer = confirm('are you ready?');
}