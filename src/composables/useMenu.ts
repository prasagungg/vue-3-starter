import { getMenus } from '@/api';
import { useMenuStore } from '@/stores';
import { useQuery } from '@tanstack/vue-query';
import { unref, watchEffect } from 'vue';

export const useMenu = () => {
  const menuStore = useMenuStore();

  const { data, isLoading } = useQuery({
    queryKey: ['menus'],
    queryFn: () => getMenus(),
    select(data) {
      return data.data;
    },
  });

  watchEffect(() => {
    if (unref(isLoading)) return;
    if (!data.value) return;

    menuStore.setMenus(data.value);
  });
};
