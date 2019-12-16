{
    let parent = document.createElement("div");
    let p = document.createElement("p");
    let span = document.createElement("span");

    parent.append(p);
    parent.prepend(span);
    console.log(parent);
}