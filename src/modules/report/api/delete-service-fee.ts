import { axios } from '@/libs';
import { ResponseAPI } from '@/types';

export type DeleteServiceFeeParams = {
  id: number;
};

export type DeleteServiceFeeResponse = ResponseAPI<null>;

export const deleteServiceFee = (
  params: DeleteServiceFeeParams
): Promise<DeleteServiceFeeResponse> => {
  return axios.post('/laporan/biaya/layanan/delete', {}, { params });
};
