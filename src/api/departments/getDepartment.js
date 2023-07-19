import { useQuery } from 'vue-query';

import API from '@/services/request';

export const useGetDepartment = () => {
  return useQuery({
    queryKey: ['departments'],
    queryFn: () => API.get(`/departments`)
  });
};
