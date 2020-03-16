import Dep from './dep.js';
import { getVal } from './utils.js';

export default class Watcher {
    constructor(vm, expr, callback) {
        this.vm = vm;
        this.expr = expr;
        this.callback = callback;

        this.get();
    }

    get() {
        Dep.target = this;
        getVal(this.vm, this.expr);
        Dep.target = null;
    }

    update() {
        this.callback();
    }
}