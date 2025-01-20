import { useMutation } from '@tanstack/vue-query';
import { ref } from 'vue';
import { resendOtp, ResendOtpResponse } from '../api';

export type ResendOtpOptions = {
  onSuccess?: (data: ResendOtpResponse) => void;
  onError?: (error: Error) => void;
};

export const useResendOtp = () => {
  const isLoading = ref<boolean>(false);

  const { mutate } = useMutation<ResendOtpResponse, Error>({
    mutationFn: resendOtp,
    onSettled: () => {
      isLoading.value = false;
    },
  });

  async function handleResendOtp(options?: ResendOtpOptions) {
    isLoading.value = true;
    mutate(undefined, options);
  }

  return { handleResendOtp, isLoading };
};
