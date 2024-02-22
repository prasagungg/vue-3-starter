import EmptyLayoutVue from '@/layouts/EmptyLayout.vue';
import { RouteRecordRaw } from 'vue-router';

const Login = () => import('@/pages/Login/IndexLogin.vue');

export const authRoutes: Array<RouteRecordRaw> = [
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: {
      layout: EmptyLayoutVue,
    },
  },
];
