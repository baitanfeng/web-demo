import Vue from 'vue';
import ToastComponent from './src/toast.vue';

const Ctor = Vue.extend(ToastComponent);
const instance = new Ctor({
  el: document.createElement('div')
});

Ctor.prototype.close = function() {
  const el = instance.$el;
  el.parentNode && el.parentNode.removeChild(el);
  typeof this.callback === 'function' && this.callback();
}

const Toast = (options = {}) => {
  instance.mes = options.mes;
  instance.timeout = options.timeout || 2000;
  instance.callback = options.callback;

  document.body.append(instance.$el);

  const timer = setTimeout(() => {
    clearTimeout(timer);
    instance.close();
  }, instance.timeout + 100);
}

Vue.prototype.$toast = Toast;

export default Toast;