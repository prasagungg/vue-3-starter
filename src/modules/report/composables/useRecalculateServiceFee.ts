import { useMutation } from '@tanstack/vue-query';
import { ref } from 'vue';
import {
  recalculateServiceFee,
  RecalculateServiceFeeParams,
  RecalculateServiceFeeResponse,
} from '../api';

export type RecalculateServiceOptions = {
  onSuccess?: (data: RecalculateServiceFeeResponse) => void;
  onError?: (error: Error) => void;
};

export const useRecalculateServiceFee = () => {
  const isLoading = ref<boolean>(false);

  const { mutate } = useMutation({
    mutationFn: recalculateServiceFee,
    onSettled: () => {
      isLoading.value = false;
    },
  });

  async function handleRecalculate(
    params: RecalculateServiceFeeParams,
    options?: RecalculateServiceOptions
  ) {
    isLoading.value = true;
    mutate(params, options);
  }

  return { handleRecalculate, isLoading };
};
