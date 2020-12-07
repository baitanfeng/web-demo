import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about/About.vue'),
    },
  ],
});

export default router;
