import { axios } from '@/libs';
import { MenuParent, ResponseAPI } from '@/types';

export type GetMenusResponse = ResponseAPI<MenuParent[]>;

export const getMenus = (): Promise<GetMenusResponse> => {
  return axios.get('/dashboard/menu');
};
