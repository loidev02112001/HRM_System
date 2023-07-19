import { useMutation } from 'vue-query';
import { notification } from 'ant-design-vue';

import API from '@/services/request';

export const useGetEmployeeMutation = () => {
  return useMutation({
    mutationFn: body => API.post(`/import_excel`, body),
    onSuccess: () => {
      notification.success({
        message: 'Thêm nhân viên từ file thành công'
      });
    },
    onError: () => {
      notification.error({
        message: 'Thêm nhân viên từ file thất bại'
      });
    }
  });
};
