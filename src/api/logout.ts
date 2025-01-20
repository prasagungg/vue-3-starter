import { axios } from '@/libs';
import { ResponseAPI } from '@/types';

export type LogoutResponse = ResponseAPI<null>;

export const logout = (): Promise<LogoutResponse> => {
  return axios.post('/auth/logout');
};
