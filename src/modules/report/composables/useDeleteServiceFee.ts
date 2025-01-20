import { useMutation } from '@tanstack/vue-query';
import { ref } from 'vue';
import { deleteServiceFee, DeleteServiceFeeParams, DeleteServiceFeeResponse } from '../api';

export type DeleteServiceOptions = {
  onSuccess?: (data: DeleteServiceFeeResponse) => void;
  onError?: (error: Error) => void;
};

export const useDeleteServiceFee = () => {
  const isLoading = ref<boolean>(false);

  const { mutate } = useMutation({
    mutationFn: deleteServiceFee,
    onSettled: () => {
      isLoading.value = false;
    },
  });

  async function handleDeleteFee(params: DeleteServiceFeeParams, options?: DeleteServiceOptions) {
    isLoading.value = true;
    mutate(params, options);
  }

  return { handleDeleteFee, isLoading };
};
