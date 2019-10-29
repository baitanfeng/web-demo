{
    var o = {x:1, y:2, z:3};
    var a = [], i = 0;
    for(a[i++] in o) {
        // empty
    }
    console.log(a);
}

{
    var o = {x: 1, y: 2, z: 3};
    for(var p in o) {
        console.log(p, o[p]);
    }
}