import { MainLayout } from '@/layouts';
import { RouteRecordRaw } from 'vue-router';

const Dashboard = () => import('@/modules/dashboard/pages/Dashboard.vue');

export const dashboardRoutes: Array<RouteRecordRaw> = [
  {
    name: 'dashboard',
    path: '/',
    component: Dashboard,
    meta: {
      layout: MainLayout,
      requiresAuth: false,
    },
  },
];
