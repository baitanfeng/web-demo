import {
    isElementNode,
    node2fragment,
    isDirective,
    getTextVal,
    getVal,
    setVal
} from './utils.js';
import Watcher from './watcher.js';

export default class Compile {
    constructor(el, vm) {
        this.el = isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;

        if (this.el) {
            const fragment = node2fragment(this.el);
            this.compile(fragment);
            this.el.append(fragment);
        }
    }

    compile(fragment) {
        const childNodes = fragment.childNodes;
        Array.from(childNodes).forEach(node => {
            if (isElementNode(node)) { // 元素节点
                this.compileElement(node);
                this.compile(node);
            } else { // 文本节点
                this.compileText(node);
            }
        });
    }

    compileElement(node) {
        const attrs = node.attributes;
        Array.from(attrs).forEach(attr => {
            const attrName = attr.name;
            if (isDirective(attrName)) {
                const type = attrName.slice(2);
                const expr = attr.value;
                CompileUtil[type](node, this.vm, expr);
            }
        });
    }

    compileText(node) {
        const expr = node.textContent;
        const reg = /\{\{([^}]+)\}\}/g; // {{a}} {{b}} {{c}}
        if (reg.test(expr)) {
            CompileUtil['text'](node, this.vm, expr);
        }
    }
}

const CompileUtil = {
    text(node, vm, expr) {
        const updateFn = this.updater['textUpdater'];
        updateFn && updateFn(node, getTextVal(vm, expr));
        // {{a}} {{b}} {{c}}
        expr.replace(/\{\{([^}]+)\}\}/g, (...args) => {
            new Watcher(vm, args[1], () => {
                updateFn && updateFn(node, getTextVal(vm, expr));
            });
        });
    },
    model(node, vm, expr) {
        const updateFn = this.updater['modelUpdater'];
        updateFn && updateFn(node, getVal(vm, expr));
        node.addEventListener('input', (e) => {
            setVal(vm, expr, e.target.value);
        });
        new Watcher(vm, expr, () => {
            updateFn && updateFn(node, getVal(vm, expr));
        });
    },
    updater: {
        textUpdater(node, value) {
            node.textContent = value;
        },
        modelUpdater(node, value) {
            node.value = value;
        }
    }
}