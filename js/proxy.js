{
    let target = {};
    let proxyObj = new Proxy(target, {
        get(target, propKey, receiver) {
            console.log('get');
            return Reflect.get(target, propKey, receiver);
        },
        set(target, propKey, value, receiver) {
            console.log('set');
            return Reflect.set(target, propKey, value, receiver);
        }
    });
}

{
    let arr = [1, 2, 3];
    let proxyArr = new Proxy(arr, {
        get(target, key, receiver) {
            console.log('get');
            return Reflect.get(target, key, receiver);
        },
        set(target, key, value, receiver) {
            console.log('set');
            return Reflect.set(target, key, value, receiver);
        }
    });
    
}