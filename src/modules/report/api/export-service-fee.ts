import { axios } from '@/libs';

export type ExportServiceFeeResponse = Blob;

export type ExportServiceFeeParams = {
  acquirerCode: string;
  jenisTransaksi: string;
  id: number;
};

export const exportServiceFee = (
  params: ExportServiceFeeParams
): Promise<ExportServiceFeeResponse> => {
  return axios.get('/laporan/biaya/layanan/export-detail', {
    params,
    responseType: 'blob',
  });
};
