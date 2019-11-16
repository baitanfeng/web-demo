{
    function deepFreeze(obj) {
        var propNames = Object.getOwnPropertyNames(obj);
        propNames.forEach(name => {
            var prop = obj[name];
            if (prop !== null && typeof prop === 'object') {
                deepFreeze(prop);
            }
        });
        return Object.freeze(obj);
    }
}

{
    var i = 5;
    while(i--) {
        console.log(i);
    }
}