import {
  FileLock,
  LayoutPanelLeft,
  Lock,
  ShieldAlert,
  UserCheck,
  UserCircle2,
} from 'lucide-vue-next';
import { SidebarData } from './types';

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutPanelLeft,
        },
        {
          title: 'Dashboard 2',
          url: '/test',
          icon: LayoutPanelLeft,
        },
        {
          title: 'Dashboard 3',
          url: '/test2',
          icon: LayoutPanelLeft,
        },
        {
          title: 'Dashboard 4',
          url: '/test3',
          icon: LayoutPanelLeft,
        },
      ],
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Auth',
          icon: Lock,
          items: [
            {
              title: 'Sign In',
              url: '/',
            },
            {
              title: 'Sign In (2 Col)',
              url: '/',
            },
            {
              title: 'Sign Up',
              url: '/',
            },
          ],
        },
        {
          title: 'Errors',
          icon: ShieldAlert,
          items: [
            {
              title: 'Unauthorized',
              url: '/401',
              icon: FileLock,
            },
            {
              title: 'Forbidden',
              url: '/403',
              icon: UserCheck,
            },
            {
              title: 'Not Found',
              url: '/404',
              icon: UserCircle2,
            },
          ],
        },
      ],
    },
  ],
};
