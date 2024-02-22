import { createRouter, createWebHistory } from 'vue-router';
import { authRoutes } from './auth.route';

const Home = () => import('@/pages/Home.vue');

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
    },
    ...authRoutes,
  ],
});
