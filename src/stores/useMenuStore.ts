import { MenuParent } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMenuStore = defineStore('menus', () => {
  const menus = ref<MenuParent[] | null>(null);

  function setMenus(newMenus: MenuParent[]) {
    menus.value = newMenus;
  }

  return { menus, setMenus };
});
