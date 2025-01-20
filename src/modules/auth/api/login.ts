import { axios } from '@/libs';
import { ResponseAPI } from '@/types';

export type LoginResponse = ResponseAPI<{
  namaUser: string;
  email: string;
  acquirerCode: string;
  jwtToken: string;
  info: string;
  idleTime: string;
  require2FAVerify: boolean;
  prefixOTPCode: string;
  otpExpiredAt: number;
  additional: any | null;
  expiredAt: string;
}>;

export type LoginDTO = {
  email: string;
  password: string;
};

export const login = (body: LoginDTO): Promise<LoginResponse> => {
  return axios.post('/auth/login', body);
};
