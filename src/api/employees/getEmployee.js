import { useQuery } from 'vue-query';

import API from '@/services/request';

export const useGetEmployee = () => {
  return useQuery({
    queryKey: ['employees'],
    queryFn: () => API.get(`/employees`)
  });
};