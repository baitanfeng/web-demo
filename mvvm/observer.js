import Dep from './dep.js';
import {
  isObject
} from './utils.js';

export default class Observer {
  constructor(data) {
    observe(data);
  }
}

function observe(data) {
  if (!isObject(data)) {
    return;
  }

  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key]);
  });
}

function defineReactive(obj, key, value) {
  observe(value);

  let dep = new Dep();

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      Dep.target && dep.addSub(Dep.target);
      return value;
    },
    set(newVal) {
      if (value === newVal) {
        return;
      }
      value = newVal;
      observe(newVal);
      dep.notify();
    }
  });
}