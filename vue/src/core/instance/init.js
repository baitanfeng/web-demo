import { initLifecycle } from './lifecycle'
import { initEvents } from './events';
import { initRender } from './render';

let uid = 0;

export function initMixin (Vue) {
    Vue.prototype._init = function (options) {
        const vm = this;
        vm._uid = uid++;

        vm._self = vm;
        initLifecycle(vm);
        initEvents(vm);
        initRender(vm);
    }
}