{
    function func (arg1, arg2) {
        console.log(arguments);

        for (let arg of arguments) {
            console.log(arg);
        }

        console.log([...arguments]);
        console.log(Array.from(arguments));
        console.log(Array.from(arguments, value => value + 1));
    }

    func(1, 2);
}

{
    let helper = {
        diff: 1,

        add (value) {
            return value + this.diff;
        }
    };

    function func () {
        console.log(Array.from(arguments, helper.add, helper));
        console.log(Array.from(arguments, helper.add.bind(helper)));
        console.log(Array.from(arguments, helper.add));
    }

    func(1, 2, 3);
}

{
    let buffer = new ArrayBuffer(12),
        view1 = new Int8Array(buffer),
        view2 = new Int16Array(buffer),
        view3 = new Int32Array(buffer);
    
    console.log(view1.buffer, view2.buffer, view3.buffer);
    console.log(view1.buffer === buffer);
    console.log(view1.byteLength, view2.byteLength, view3.byteLength);
}

{
    let ints = new Int16Array(2),
        floats = new Float32Array(5);

    console.log(ints.buffer, floats.buffer);
    console.log(ints.length, floats.length);
    console.log(ints.byteLength, floats.byteLength);
    console.log(ints.BYTES_PER_ELEMENT, floats.BYTES_PER_ELEMENT);
}

{
    let ints = new Int16Array([25, 50]),
        mapped = ints.map(v => v * 2);

    console.log(mapped.length, mapped.byteLength, mapped.BYTES_PER_ELEMENT);
    console.log(mapped[0], mapped[1], mapped[2]);
    console.log(mapped instanceof Int16Array);
    console.log(mapped instanceof Array);
}

{
    let ints = new Int16Array([25, 50]),
        intsArray = [...ints];

    console.log(intsArray[0], intsArray[1], intsArray[2]);
    console.log(intsArray instanceof Array);
    console.log(intsArray instanceof Int16Array);
}

{
    let ints = new Int16Array(4);

    ints.set([25, 50]);
    ints.set([75, 100], 2);

    console.log(ints.toString());
}