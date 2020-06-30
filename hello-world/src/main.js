import Vue from 'vue'
import App from './App.vue'

// import { Loading } from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(Loading);

import './base/style/index.css';
import Loading from './base/loading';
Vue.use(Loading);

window.vm = new Vue({
  render: h => h(App),
}).$mount('#app')
