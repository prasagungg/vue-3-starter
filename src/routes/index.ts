import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  RouteLocationRaw,
} from 'vue-router';

import { beforeEachAuthGuard, beforeLoginAuthGuard } from '@/utils';

import { errorRoutes } from './error.route';
import { dashboardRoutes } from '@/modules/dashboard/dashboard.route';
import { authRoutes } from '@/modules/auth/auth.route';
import { reportRoutes } from '@/modules/report/report.route';

type NextCallback = (to?: RouteLocationRaw | false | void | undefined) => void;

const routes = createRouter({
  history: createWebHistory(),
  routes: [
    ...dashboardRoutes,
    ...errorRoutes,
    ...authRoutes,
    ...reportRoutes,
  ],
});

routes.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NextCallback) => {
    beforeEachAuthGuard(to, from, next);
  }
);

routes.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NextCallback) => {
    beforeLoginAuthGuard(to, from, next);
  }
);

export default routes;
