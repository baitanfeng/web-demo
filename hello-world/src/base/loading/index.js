import directive from './src/directive';
import service from './src/service';

export default {
  install(Vue) {
    Vue.use(directive);
    Vue.prototype.$loading = service;
  }
}