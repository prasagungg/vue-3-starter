import { cva } from 'class-variance-authority';

export { default as NavigationMenu } from './NavigationMenu.vue';
export { default as NavigationMenuContent } from './NavigationMenuContent.vue';
export { default as NavigationMenuItem } from './NavigationMenuItem.vue';
export { default as NavigationMenuLink } from './NavigationMenuLink.vue';
export { default as NavigationMenuList } from './NavigationMenuList.vue';
export { default as NavigationMenuTrigger } from './NavigationMenuTrigger.vue';
export { default as NavigationMenuViewport } from './NavigationMenuViewport.vue';

export const navigationMenuTriggerStyle = cva(
  'inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:bg-transparent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:text-primary data-[state=open]:text-primary '
);
