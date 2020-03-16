import {
    isElementNode,
    node2fragment,
    isDirective,
    isEventDirective,
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
                if (isEventDirective(attrName)) {
                    CompileUtil['event'](node, this.vm, expr, type);
                } else {
                    CompileUtil[type](node, this.vm, expr);
                }
            }
        });
        this.compile(node);
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
    event(node, vm, expr, type) {
        const eventType = type.split(':')[1];
        const fn = vm.$options.methods && vm.$options.methods[expr];
        if (eventType && typeof fn === 'function') {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },
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