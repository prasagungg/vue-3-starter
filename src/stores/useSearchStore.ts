import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSeachStore = defineStore('search', () => {
  const open = ref<boolean>(false);

  function toggleSearch(value: boolean) {
    open.value = value;
  }

  return { open, toggleSearch };
});
