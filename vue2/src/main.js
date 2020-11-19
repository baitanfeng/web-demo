import Vue from 'vue'
import App from './App.vue'
import router from './router';
// import Toast from './base/toast';
import './base/toast';

import Vant from 'vant';
import 'vant/lib/index.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Vant);
Vue.use(ElementUI);

// import './base/style/index.css';
// import Loading from './base/loading';
// Vue.use(Loading);

window.vm = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

