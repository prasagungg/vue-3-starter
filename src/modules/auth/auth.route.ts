import { AuthLayout } from '@/layouts';
import { RouteRecordRaw } from 'vue-router';

const Login = () => import('@/modules/auth/pages/Login.vue');
const Otp = () => import('@/modules/auth/pages/Otp.vue');
const ForgotPassword = () => import('@/modules/auth/pages/ForgotPassword.vue');
const ResetPassword = () => import('@/modules/auth/pages/ResetPassword.vue');

export const authRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    meta: {
      layout: AuthLayout,
    },
    children: [
      {
        name: 'login',
        path: '',
        component: Login,
      },
      {
        name: 'otp',
        path: '/otp',
        component: Otp,
      },
      {
        name: 'forgot-password',
        path: '/forgot-password',
        component: ForgotPassword,
      },
      {
        name: 'reset-password',
        path: '/reset-password/:token',
        component: ResetPassword,
      },
    ],
  },
];
