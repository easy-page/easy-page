import { nodeUtil } from '@easy-page/antd-ui';

export const demandName = nodeUtil.createField(
  'name',
  '',

  {
    value: '',
  },
  {
    input: {
      className:
        'text-xl mx-16 border-none bg-transparent focus:border-none focus:shadow-none',
      placeholder: '添加标题...',
    },
    formItem: {
      className: 'mb-0',
    },
  }
);
