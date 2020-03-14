import Dep from './dep';
import { isObject, def } from '../util/index';
import { noop, hasOwn } from '../../shared/util';
import { isPlainObject } from './../../shared/util';

export let shouldObserve = true;

export class Observer {
    constructor (value) {
        this.value = value;
        this.dep = new Dep();
        this.vmCount = 0;
        def(value, '__ob__', this);
        if (Array.isArray(value)) {
            this.observeArray(value);
        } else {
            this.walk(value);
        }
    }

    walk (obj) {
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i]);
        }
    }

    observeArray (items) {
        for (let i = 0; i < items.length; i++) {
            observe(items[i]);
        }
    }
}

export function observe (value, asRootData = false) {
    if (!isObject(value)) {
        return;
    }

    let ob;
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__;
    } else if (
        shouldObserve &&
        (Array.isArray(value) || isPlainObject(value)) &&
        Object.isExtensible(value) &&
        !value._isVue
    ) {
        ob = new Observer(value);
    }

    if (asRootData && ob) {
        ob.vmCount++;
    }

    return ob;
}

export function defineReactive (obj, key, val, customSetter = noop,  shallow = false) {
    const dep = new Dep();

    const property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
        return;
    }

    const getter = property && property.get;
    const setter = property && property.set;
    if (arguments.length === 2) {
        val = obj[key];
    }

    let childOb = !shallow && observe(val);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            const value = getter ? getter.call(obj) : val;
            if (Dep.target) {
                dep.depend();
                if (childOb) {
                    childOb.dep.depend();
                    if (Array.isArray(value)) {
                        dependArray(value);
                    }
                }
            }
            return value;
        },
        set: function reactiveSetter (newVal) {
            const value = getter ? getter.call(obj) : val;
            if (newVal === value) {
                return;
            }

            if (setter) {
                setter.call(obj, newVal);
            } else {

            }
            childOb = !shallow && observe(newVal);
            dep.notify();
        }
    })
}

function dependArray (value) {
    for (let e, i = 0, len = value.length; i < len; i++) {
        e = value[i];
        e && e.__ob__ && e.__ob__.dep.depend();
        if (Array.isArray(e)) {
            dependArray(e);
        }
    }
}