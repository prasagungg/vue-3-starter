import { useMutation } from '@tanstack/vue-query';
import { ref } from 'vue';
import { validateOtp, validateOtpDTO, ValidateOtpResponse } from '../api';
import { useAuthStore } from '@/stores';

export type ValidateOtpOptions = {
  onSuccess?: (data: ValidateOtpResponse) => void;
  onError?: (error: Error) => void;
};

export const useValidateOtp = () => {
  const authStore = useAuthStore();
  const isLoading = ref<boolean>(false);

  const { mutate } = useMutation<ValidateOtpResponse, Error, validateOtpDTO>({
    mutationFn: (body) => validateOtp(body),
    onSuccess: (data) => {
      authStore.setCredentials(data.data.token);
    },
    onSettled: () => {
      isLoading.value = false;
    },
  });

  async function handleValidateOtp(data: validateOtpDTO, options?: ValidateOtpOptions) {
    isLoading.value = true;
    mutate(data, options);
  }

  return { handleValidateOtp, isLoading };
};
