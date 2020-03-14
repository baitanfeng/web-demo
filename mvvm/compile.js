class Compile {
    constructor(el, vm) {
        this.el = isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;

        if (this.el) {
            let fragment = node2fragment(this.el);
        }
    }
}

function isElementNode (node) {
    return node.nodeType === 1;
}

function node2fragment (el) {
    let fragment = document.createDocumentFragment();
    let firstChild;
    while(firstChild = el.firstChild) {
        fragment.appendChild(firstChild);
    }
    return fragment;
}