export function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

export function isElementNode(node) {
    return node.nodeType === Node.ELEMENT_NODE;
}

/**
 * 判断属性名是不是 v- 开头
 * @param {String} name 属性名
 */
export function isDirective(name = '') {
    return name.startsWith('v-');
}

export function node2fragment(el) {
    const fragment = document.createDocumentFragment();

    // let firstChild;
    // while (firstChild = el.firstChild) {
    //     fragment.appendChild(firstChild);
    // }
    fragment.append(...el.childNodes);

    return fragment;
}

export function getVal(vm, expr) {
    expr = expr.split('.');
    return expr.reduce((prev, next) => {
        return prev[next];
    }, vm.$data);
}

export function setVal(vm, expr, value) {
    expr = expr.split('.');
    expr.reduce((prev, next, currentIndex) => {
        if (currentIndex === expr.length - 1) {
            return prev[next] = value;
        }
        return prev[next];
    }, vm.$data);
}

export function getTextVal(vm, expr) {
    return expr.replace(/\{\{([^}]+)\}\}/g, (...args) => {
        return getVal(vm, args[1]);
    });
}