import { axios } from '@/libs';
import { PaginatedParams, PaginatedResponse } from '@/types';
import { ServiceFee } from '../types';

export type GetServiceFeeResponse = PaginatedResponse<ServiceFee>;

export type GetServiceParams = PaginatedParams<{
  acquirerCode: string;
  periodeAwal: string;
  periodeAkhir: string;
}>;

export const getServiceFee = (params: GetServiceParams): Promise<GetServiceFeeResponse> => {
  return axios.get('/laporan/biaya/layanan/get-list', {
    params: {
      ...params,
      size: Number(params.size),
    },
  });
};
