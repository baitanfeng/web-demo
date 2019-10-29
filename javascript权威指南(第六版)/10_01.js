{
    var quote = /"([^"]*)"/g;
    var text = '"test"';
    text.replace(quote, ' “$1” ');
}

{
    "1 plus 2 equals 3".match(/\d+/g)
}

{
    var url = /(\w+):\/\/([\w.]+)\/(\S*)/;
    var text = "Visit my blog at http://www.example.com/~david";
    text.match(url);
}

{
    "1, 2,3, 4,  5".split(/\s*,\s*/);
}

{
    var zipcode = new RegExp('\\d{5}', 'g');
}

{
    var pattern = /Java/g;
    var text = 'JavaScript is more fun than Java!';
    var result;
    while((result = pattern.exec(text)) != null) {
        console.log(`Matched ${result[0]} at position ${result.index}; next search begins at ${pattern.lastIndex};`)
    }
}

{
    var pattern = /Java/g;
    var text = 'JavaScript is more fun than Java!';
    console.log(pattern.exec(text));
    console.log(pattern.exec(text));
    console.log(pattern.exec(text));
    console.log(pattern.exec(text));
}