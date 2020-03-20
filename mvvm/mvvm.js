import Observer from './observer.js';
import Compile from './compile.js';
import {
    proxy
} from './utils.js';

export default class MVVM {
    constructor(options) {
        this.$options = options;
        this.$el = options.el;
        this.$data = options.data;

        if (this.$el) {
            this.proxyData();
            new Observer(this.$data);
            new Compile(this.$el, this);
        }
    }

    proxyData() {
        Object.keys(this.$data).forEach(key => {
            proxy(this, '$data', key);
        });
    }
}