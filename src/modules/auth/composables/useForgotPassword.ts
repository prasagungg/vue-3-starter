import { useMutation } from '@tanstack/vue-query';
import { ref } from 'vue';
import { forgotPassword, ForgotPasswordDTO, ForgotPasswordResponse } from '../api';

export type ForgotPasswordOptions = {
  onSuccess?: (data: ForgotPasswordResponse) => void;
  onError?: (error: Error) => void;
};

export const useForgotPassword = () => {
  const isLoading = ref<boolean>(false);

  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onSettled: () => {
      isLoading.value = false;
    },
  });

  async function handleForgotPassword(data: ForgotPasswordDTO, options?: ForgotPasswordOptions) {
    isLoading.value = true;
    mutate(data, options);
  }

  return { handleForgotPassword, isLoading };
};
