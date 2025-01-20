import { EmptyLayout } from '@/layouts';
import { RouteRecordRaw } from 'vue-router';

const NotFound = () => import('@/modules/error/NotFound.vue');

export const errorRoutes: Array<RouteRecordRaw> = [
  {
    name: '404',
    path: '/:catchAll(.*)',
    component: NotFound,
    meta: {
      layout: EmptyLayout,
    },
  },
];
