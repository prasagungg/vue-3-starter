import { NavItem } from './types';

export const checkIsActive = (href: string, item: NavItem, mainNav = false) => {
  console.log(href);
  return (
    href === item.url ||
    href.split('?')[0] === item.url ||
    !!item?.items?.filter((i: any) => i.url === href).length ||
    (mainNav && href.split('/')[1] !== '' && href.split('/')[1] === item?.url?.split('/')[1])
  );
};
