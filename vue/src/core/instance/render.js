import { defineReactive } from "../observer";
import { emptyObject } from './../../shared/util';

export function initRender (vm) {
    vm._vnode = null;
    vm._staticTrees = null;
    const options = vm.$options;
    const parentVnode = vm.$vnode = options._parentVnode;
    const parentData = parentVnode && parentVnode.data;

    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
}