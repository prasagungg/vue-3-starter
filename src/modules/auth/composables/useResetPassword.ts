import { useMutation } from '@tanstack/vue-query';
import { ref } from 'vue';
import { resetPassword, ResetPasswordDTO, ResetPasswordResponse } from '../api';

export type ResetPasswordOptions = {
  onSuccess?: (data: ResetPasswordResponse) => void;
  onError?: (error: Error) => void;
};

export const useResetPassword = (token: string) => {
  const isLoading = ref<boolean>(false);

  const { mutate } = useMutation<ResetPasswordResponse, Error, ResetPasswordDTO>({
    mutationFn: (body: ResetPasswordDTO) => resetPassword(body, token),
    onSettled: () => {
      isLoading.value = false;
    },
  });

  async function handleResetPassword(data: ResetPasswordDTO, options?: ResetPasswordOptions) {
    isLoading.value = true;
    mutate(data, options);
  }

  return { handleResetPassword, isLoading };
};
