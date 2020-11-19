import Vue from 'vue';
import Loading from './loading.vue';
import afterLeave from '../../utils/after-leave';
import { addClass, removeClass } from '../../utils/dom';

const Mask = Vue.extend(Loading);

const loadingDirective = {};
loadingDirective.install = Vue => {
  Vue.directive('loading', {
    bind(el, binding, vnode) {
      const textExr = el.getAttribute('mf-loading-text');
      const backgroundExr = el.getAttribute('mf-loading-background');
      const vm = vnode.context;

      const mask = new Mask({
        el: document.createElement('div'),
        data: {
          text: vm && vm[textExr] || textExr,
          background: vm && vm[backgroundExr] || backgroundExr,
          fullscreen: !!binding.modifiers.fullscreen
        }
      });

      el.instance = mask;
      el.mask = mask.$el;

      binding.value && toggleLoading(el, binding);
    },

    update(el, binding) {
      el.instance.setText(el.getAttribute('mf-loading-text'));
      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding);
      }
    },

    unbind(el) {
      if (el.domInserted) {
        el.mask &&
        el.mask.parentNode &&
        el.mask.parentNode.removeChild(el.mask);
      }
      el.instance && el.instance.$destroy();
    }
  })

  function toggleLoading(el, binding) {
    if (binding.value) {
      Vue.nextTick(() => {
        if (binding.modifiers.fullscreen) {
          addClass(el.mask, 'is-fullscreen');
          insertDom(document.body, el, binding);
        } else {
          removeClass(el.mask, 'is-fullscreen');
          insertDom(el, el, binding);
        }
      })
    } else {
      afterLeave(el.instance, () => {
        if (!el.instance.hiding) { return; }
        removeClass(el, 'mf-loading-parent--relative');
        el.instance.hiding = false;
      }, true);
      el.instance.visible = false;
      el.instance.hiding = true;
    }
  }

  function insertDom (parent, el, binding) {
    addClass(parent, 'mf-loading-parent--relative');
    if (binding.modifiers.fullscreen && binding.modifiers.lock) {
      addClass(parent, 'mf-loading-parent--overflow-hidden');
    }
    parent.append(el.mask);
    el.domVisible = true;
    el.instance.visible = true;
  }
}

export default loadingDirective;