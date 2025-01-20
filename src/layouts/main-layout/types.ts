import { DefineComponent } from 'vue';

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface BaseNavItem {
  title: string;
  badge?: string;
  icon?: DefineComponent; // Vue component for icon
}

type NavLink = BaseNavItem & {
  url: string; // Direct string URL for Vue
  items?: never;
};

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: string })[];
  url?: never;
};

type NavItem = NavCollapsible | NavLink;

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface SidebarData {
  user: User;
  navGroups: NavGroup[];
}

// Export the types for use in your Vue components
export type { SidebarData, NavGroup, NavItem, NavCollapsible, NavLink };
