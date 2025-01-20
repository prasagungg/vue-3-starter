import { axios } from '@/libs';
import { ResponseAPI } from '@/types';

export type ResendOtpResponse = ResponseAPI<{
  prefixCode: string;
  expiredAt: number;
}>;

export const resendOtp = (): Promise<ResendOtpResponse> => {
  return axios.post('/verification/send-otp');
};
