import { useMutation } from 'vue-query';
import { notification } from 'ant-design-vue';

import API from '@/services/request';
import { userInforStore } from '@/stores/userInfor';

export const useChangePassMutation = () => {
  const { accountId } = userInforStore();
  return useMutation({
    mutationFn: body => API.put(`/users/change-password/${accountId}`, body),
    onSuccess: () => {
      notification.success({
        message: 'Đổi mật khẩu thành công'
      });
    },
    onError: () => {
      notification.error({
        message: 'Đổi mật khẩu thất bại'
      });
    }
  });
};
