import Vue from 'vue';
import loadingVue from './loading.vue';
import afterLeave from '../../utils/after-leave';
import { addClass, removeClass } from '../../utils/dom';

const LoadingCtor = Vue.extend(loadingVue);

const defaults = {
  text: null,
  fullscreen: true,
  lock: false,
};

let fullscreenLoading;

LoadingCtor.prototype.close = function () {
  if (this.fullscreen) {
    fullscreenLoading = null;
  }

  afterLeave(this, () => {
    const target = this.fullscreen || this.body
      ? document.body
      : this.target;
    removeClass(target, 'mf-loading-parent--relative');
    removeClass(target, 'mf-loading-parent--overflow-hidden');
    this.$el &&
    this.$el.parentNode &&
    this.$el.parendNode.removeChild(this.$el);
    this.$destroy();
  });
  this.visible = false;
}

function Loading (options = {}) {
  options = Object.assign({}, defaults, options);
  if (typeof options.target === 'string') {
    options.target = document.querySelector(options.target);
  }
  options.target = options.target || document.body;
  if (options.target !== document.body) {
    options.fullscreen = false
  }
  if (options.fullscreen && fullscreenLoading) {
    return fullscreenLoading;
  }

  let parent = options.fullscreen ? document.body : options.target;
  let instance = new LoadingCtor({
    el: document.createElement('div'),
    data: options
  });

  addClass(parent, 'mf-loading-parent--relative');
  if (options.fullscreen && options.lock) {
    addClass(parent, 'mf-loading-parent--overflow-hidden');
  }
  parent.append(instance.$el);
  instance.visible = true;
  if (options.fullscreen) {
    fullscreenLoading = instance;
  }
  return instance;
}

export default Loading;