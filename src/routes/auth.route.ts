import { EmptyLayout } from '@/layouts';
import { RouteRecordRaw } from 'vue-router';

const IndexLogin = () => import('@/pages/auth/login/IndexLogin.vue');

export const authRoutes: Array<RouteRecordRaw> = [
  {
    name: 'login',
    path: '/login',
    component: IndexLogin,
    meta: {
      layout: EmptyLayout,
    },
  },
];
