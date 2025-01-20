import { axios } from '@/libs';
import { ResponseAPI } from '@/types';

export type ValidateOtpResponse = ResponseAPI<{
  token: string;
  idleTime: string;
}>;

export type validateOtpDTO = {
  otp: string;
};

export const validateOtp = (body: validateOtpDTO): Promise<ValidateOtpResponse> => {
  return axios.post('/verification/validate-otp', body);
};
