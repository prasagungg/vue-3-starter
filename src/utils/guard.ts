import { useAuthStore } from '@/stores';
import { RouteLocationNormalized, RouteLocationRaw } from 'vue-router';

type NextCallback = (to?: RouteLocationRaw | false | void | undefined) => void;

export function beforeEachAuthGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NextCallback
): void {
  if (to.meta && to.meta.requiresAuth) {
    const authStore = useAuthStore();

    if (authStore.token) {
      next();
    } else {
      next({
        path: 'login',
        query: { redirect: to.fullPath },
      });
    }
  } else {
    next();
  }
}

export function beforeLoginAuthGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NextCallback
): void {
  const authStore = useAuthStore();

  if (to.path === '/login' || to.path === '/login/otp') {
    if (authStore.token) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
}
