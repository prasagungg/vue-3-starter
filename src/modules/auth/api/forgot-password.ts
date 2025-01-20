import { axios } from '@/libs';
import { ResponseAPI } from '@/types';

export type ForgotPasswordResponse = ResponseAPI<null>;

export type ForgotPasswordDTO = {
  email: string;
};

export const forgotPassword = (body: ForgotPasswordDTO): Promise<ForgotPasswordResponse> => {
  return axios.post('/auth/send-reset-password', body);
};
