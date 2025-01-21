import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export type Theme = 'dark' | 'light' | 'system';

export const useThemeStore = defineStore('theme', () => {
  const storageKey = 'vite-ui-theme';
  const theme = ref<Theme>((localStorage.getItem(storageKey) as Theme) || 'system');

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;
    localStorage.setItem(storageKey, newTheme);
    applyTheme(newTheme);
  };

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    const effectiveTheme = theme === 'system' ? systemTheme : theme;

    root.classList.remove('light', 'dark');
    root.classList.add(effectiveTheme);
  };

  watch(theme, (newTheme) => {
    applyTheme(newTheme);
  });

  applyTheme(theme.value);

  return { theme, setTheme };
});
