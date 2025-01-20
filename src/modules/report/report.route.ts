import { MainLayout } from '@/layouts';
import { RouteRecordRaw } from 'vue-router';

const ServiceFee = () => import('@/modules/report/pages/ServiceFee.vue');

export const reportRoutes: Array<RouteRecordRaw> = [
  {
    name: 'laporan',
    path: '/laporan',
    meta: { layout: MainLayout, requiresAuth: true },
    children: [
      {
        name: 'laporan-biaya-layanan',
        path: '/laporan-biaya-layanan',
        component: ServiceFee,
        meta: { requiresAuth: true },
      },
    ],
  },
];
