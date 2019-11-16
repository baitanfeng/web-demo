{
    let node = {
        type: 'identifier',
        name: 'tian'
    };

    let { type: localType, name: localName, value: localValue = true } = node;
    console.log(localType, localName, localValue);
}

{
    let node = {

    };

    let { loc: { start, end: localEnd = true } = {} } = node;
    console.log(start, localEnd);
}

{
    let colors = ['red', 'green'];

    let [firstColor, secondColor, thirdColor = 'blue'] = colors;

    console.log(firstColor, secondColor, thirdColor);
}

{
    let colors = ['red', ['green'], 'blue'];

    let [firstColor, [secondColor], thirdColor] = colors;

    console.log(firstColor, secondColor, thirdColor);
}

{
    let colors = ['red', 'green', 'blue'];

    let [firstColor, ...restColors] = colors;

    restColors;
}
