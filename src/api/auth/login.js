import { useMutation } from 'vue-query';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';

import API from '@/services/request';

export const useLoginMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: body => API.post(`/auth/login`, body),
    onSuccess: data => {
        console.log(data)
      // Cookies.set('accessToken', data.data.accessToken, { path: '/' }, { expires: 1 });
      router.push('/');
    },
    onError: error => {
      showNotification(error.data.message, 'error');
    }
  });
};
