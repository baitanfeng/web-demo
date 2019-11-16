{
    let set = new Set([1, 2]);

    set.forEach((value, key, ownerSet) => {
        console.log(value + " " + key);
        console.log(ownerSet === set);
    });
}

{
    let map = new Map([
        ['name', 'tianya'],
        ['age', 33]
    ]);

    console.log(map.get('name'));
    console.log(map.get('age'));

    map.forEach((value, key, ownerMap) => {
        console.log(key + " " + value);
        console.log(ownerMap === map);
    });
}