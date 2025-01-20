import { ref } from 'vue';
import { exportServiceFee, ExportServiceFeeParams, ExportServiceFeeResponse } from '../api';

export type ExportServiceFeeOptions = {
  onSuccess?: (data: ExportServiceFeeResponse) => void;
  onError?: (error: Error) => void;
};

export const useExportServiceFee = () => {
  const isLoading = ref<boolean>(false);

  async function handleExportServiceFee(
    body: ExportServiceFeeParams[],
    options?: ExportServiceFeeOptions
  ) {
    isLoading.value = true;

    try {
      const responses = await Promise.all(
        body.map(async (item) => {
          const response = await exportServiceFee(item);

          const url = window.URL.createObjectURL(response);
          const link = document.createElement('a');

          link.href = url;
          link.download = `Rekap biaya layanan ${item.jenisTransaksi}_${item.acquirerCode}.csv`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          return response;
        })
      );

      options?.onSuccess?.(responses as any);
    } catch (error) {
      console.error('Error during export detail transaction:', error);

      options?.onError?.(error as Error);
    } finally {
      isLoading.value = false;
    }
  }

  return { handleExportServiceFee, isLoading };
};
