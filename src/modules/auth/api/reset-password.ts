import { axios } from '@/libs';
import { ResponseAPI } from '@/types';

export type ResetPasswordResponse = ResponseAPI<null>;

export type ResetPasswordDTO = {
  newPassword: string;
};

export const resetPassword = (
  body: ResetPasswordDTO,
  token: string
): Promise<ResetPasswordResponse> => {
  return axios.post(`/auth/change-password?x-token=${token}`, body);
};
