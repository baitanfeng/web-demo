import { setAttr } from './util';

class Element {
    constructor(type, props, children) {
        this.type = type;
        this.props = props;
        this.children = children;
    }
}

function createElement(type, props, children) {
    return new Element(type, props, children);
}

function render(obj) {
    const {type, props, children} = obj;

    let el = document.createElement(type);
    for (let key in props) {
        setAttr(el, key, props[key]);
    }
    children.forEach(child => {
        child = (child instanceof Element) 
            ? render(child) 
            : document.createTextNode(child);
        el.appendChild(child);
    });

    return el;
}

function renderDom(el, target) {
    target.appendChild(el);
}

export {
    createElement,
    render,
    renderDom
}