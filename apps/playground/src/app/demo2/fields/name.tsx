import { nodeUtil } from '@easy-page/antd-ui';

export const name = nodeUtil.createField(
  'name',
  '姓名',
  {
    value: '',
    required: true,
    validate: async ({ value }) => {
      if (!value) {
        return { success: false, errorMsg: '请输入姓名' };
      }
      return { success: true };
    },
  },
  {
    formItem: {
      tooltip: 'ahhh',
    },
  }
);
