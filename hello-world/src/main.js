import Vue from 'vue'
import App from './App.vue'
import router from './router';
// eslint-disable-next-line no-unused-vars
// import Toast from './base/toast';
import './base/toast';

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
// Vue.component()

// import './base/style/index.css';
// import Loading from './base/loading';
// Vue.use(Loading);

window.vm = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
