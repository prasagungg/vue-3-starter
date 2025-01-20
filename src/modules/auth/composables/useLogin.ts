import { useAuthStore } from '@/stores';
import { useMutation } from '@tanstack/vue-query';
import { ref } from 'vue';
import { login, LoginDTO, LoginResponse } from '../api';

export type LoginOptions = {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: Error) => void;
};

export const useLogin = () => {
  const authStore = useAuthStore();
  const isLoading = ref<boolean>(false);

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      authStore.setCredentials(data.data.jwtToken);

      authStore.setUser({
        email: data.data.email,
        name: data.data.namaUser,
      });
    },
    onSettled: () => {
      isLoading.value = false;
    },
  });

  async function handleLogin(data: LoginDTO, options?: LoginOptions) {
    isLoading.value = true;
    mutate(data, options);
  }

  return { handleLogin, isLoading };
};
