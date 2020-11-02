import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('../App.vue');
const About = () => import('../components/About.vue');
const Vant = () => import('../components/vant.vue');
const Element = () => import('../components/element.vue');
const Test = () => import('../components/test.vue');

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '/vant', name: 'vant', component: Vant },
    { path: '/element', name: 'element', component: Element },
    { path: '/test', name: 'test', component: Test },
  ]
})

export default router;