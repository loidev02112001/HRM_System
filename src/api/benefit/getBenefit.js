import { useQuery } from 'vue-query';

import API from '@/services/request';

export const useGetBenefit = () => {
  return useQuery({
    queryKey: ['benefits'],
    queryFn: () => API.get(`/benefits`)
  });
};
