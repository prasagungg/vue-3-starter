import { useMutation } from '@tanstack/vue-query';
import { ref } from 'vue';
import { AddServiceDTO, addServiceFee, AddServiceFeeResponse } from '../api';

export type AddServiceFeeOptions = {
  onSuccess?: (data: AddServiceFeeResponse) => void;
  onError?: (error: Error) => void;
};

export const useAddServiceFee = () => {
  const isLoading = ref<boolean>(false);

  const { mutate } = useMutation({
    mutationFn: addServiceFee,
    onSettled: () => {
      isLoading.value = false;
    },
  });

  async function handleAddFee(body: AddServiceDTO, options?: AddServiceFeeOptions) {
    isLoading.value = true;
    mutate(body, options);
  }

  return { handleAddFee, isLoading };
};
