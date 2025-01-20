import { logout } from '@/api';
import { useAuthStore } from '@/stores';
import { useMutation } from '@tanstack/vue-query';
import { ref } from 'vue';

export type OnLogoutOptions = {
  onSuccess?: () => void;
};

export const useLogout = () => {
  const isLoading = ref(false);
  const authStore = useAuthStore();

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      authStore.resetCredentials();
    },
    onSettled: () => {
      isLoading.value = false;
    },
  });

  async function handleLogout(options?: OnLogoutOptions) {
    isLoading.value = true;
    mutate(undefined, options);
  }

  return { handleLogout, isLoading };
};
