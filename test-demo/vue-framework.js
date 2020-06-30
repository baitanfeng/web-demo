function initMixin (Vue) {
  Vue.prototype._init = function (options) {};
}

function stateMixin (Vue) {
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);
  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;
  Vue.prototype.$watch = function (expOrFn, cb, options) {};
}

function eventsMixin (Vue) {
  Vue.prototype.$on = function (event, fn) {};
  Vue.prototype.$once = function (event, fn) {};
  Vue.prototype.$off = function (event, fn) {};
  Vue.prototype.$emit = function (event) {};
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {};
  Vue.prototype.$forceUpdate = function () {};
  Vue.prototype.$destroy = function () {};
}

function renderMixin (Vue) {
  installRenderHelpers(Vue.prototype);
  Vue.prototype.$nextTick = function (fn) {};
  Vue.prototype._render = function () {};
}

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

function initGlobalAPI (Vue) {
  Object.defineProperty(Vue, 'config', configDef);

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  Vue.options.components = Object.create(null);
  Vue.options.directives = Object.create(null);
  Vue.options.filters = Object.create(null);

  extend(Vue.options.components, {
    KeepAlive: KeepAlive
  });

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

function initUse (Vue) {
  Vue.use = function (plugin) {};
}

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {};
}

function initExtend (Vue) {
  Vue.cid = 0;
  Vue.extend = function (extendOptions) {};
}

function initAssetRegisters (Vue) {
  ['component', 'directive', 'filter'].forEach(function (type) {
    Vue[type] = function (id, definition) {};
  });
}