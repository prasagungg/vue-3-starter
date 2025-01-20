import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

interface User {
  name: string;
  email: string;
}

export const useAuthStore = defineStore('auth', () => {
  const initialToken = localStorage.getItem('token') || null;

  const token = useLocalStorage<string | null>('token', initialToken);
  const user = useLocalStorage<User | null>('user', null, {
    serializer: {
      read: (value) => (value ? JSON.parse(value) : null),
      write: (value) => JSON.stringify(value),
    },
  });

  function setCredentials(tok: string) {
    token.value = tok;
  }

  function resetCredentials() {
    token.value = null;
  }

  function setUser(newUser: User) {
    user.value = newUser;
  }

  return { token, user, setCredentials, resetCredentials, setUser };
});
