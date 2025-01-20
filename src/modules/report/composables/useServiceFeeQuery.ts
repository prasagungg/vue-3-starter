import { useQuery } from '@tanstack/vue-query';
import { getServiceFee, GetServiceParams } from '../api';

export const useServiceFeeQuery = (params: GetServiceParams) => {
  return useQuery({
    queryKey: ['service-fee', params],
    queryFn: () => getServiceFee(params),
    select(data) {
      return data.data;
    },
  });
};
