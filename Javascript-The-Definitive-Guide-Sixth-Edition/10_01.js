{
    const quote = /"([^"]*)"/g;
    const text = '"test"';
    text.replace(quote, ' “$1” ');
}

{
    "1 plus 2 equals 3".match(/\d+/g)
}

{
    const url = /(\w+):\/\/([\w.]+)\/(\S*)/;
    const text = "Visit my blog at http://www.example.com/~david";
    text.match(url);
}

{
    "1, 2,3, 4,  5".split(/\s*,\s*/);
}

{
    const zipcode = new RegExp('\\d{5}', 'g');
}

{
    const pattern = /Java/g;
    const text = 'JavaScript is more fun than Java!';
    let result;
    while((result = pattern.exec(text)) != null) {
        console.log(`Matched ${result[0]} at position ${result.index}; next search begins at ${pattern.lastIndex};`)
    }
}

{
    const pattern = /Java/g;
    const text = 'JavaScript is more fun than Java!';
    console.log(pattern.exec(text));
    console.log(pattern.exec(text));
    console.log(pattern.exec(text));
    console.log(pattern.exec(text));
}