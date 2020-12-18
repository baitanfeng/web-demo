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
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about/About.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('../views/detail/Detail.vue'),
      meta: {
        keepAlive: false
      }
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

export default router;
