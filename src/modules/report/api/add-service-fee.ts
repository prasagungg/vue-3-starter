import { axios } from '@/libs';
import { ResponseAPI } from '@/types';

export type AddServiceFeeResponse = ResponseAPI<null>;

export type AddServiceDTO = {
  periodeAwal: string;
  periodeAkhir: string;
};

export const addServiceFee = (body: AddServiceDTO): Promise<AddServiceFeeResponse> => {
  return axios.post('/laporan/biaya/layanan/save', {
    acquirerCode: [],
    ...body,
  });
};
