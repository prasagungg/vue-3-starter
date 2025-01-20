import { axios } from '@/libs';
import { ResponseAPI } from '@/types';

export type RecalculateServiceFeeParams = {
  id: number;
};

export type RecalculateServiceFeeResponse = ResponseAPI<null>;

export const recalculateServiceFee = (
  params: RecalculateServiceFeeParams
): Promise<RecalculateServiceFeeResponse> => {
  return axios.get('/laporan/biaya/layanan/recalculate', { params });
};
