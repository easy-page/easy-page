import { UI_COMPONENTS, nodeUtil } from '@easy-page/antd-ui';
import { Input } from 'antd';

export const desc = nodeUtil.createField(
  'desc',
  '介绍',
  {
    value: '',
    required: true,
    validate: ({ value }) => {
      if (!value) {
        return { success: false, errorMsg: '请输入' };
      }
      return { success: true };
    },
  },
  {
    ui: UI_COMPONENTS.TEXTAREA,
    formItem: {
      extra: '常驻提示语',
      tooltip: '问号提示语',
    },
  }
);

export const desc1 = () =>
  nodeUtil.createCustomField(
    'desc111',
    '介绍2222',
    ({ value, onChange }) => {
      /** 自定义输入框组件 */
      return (
        <Input
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      );
    },
    {
      value: '',
      when: {
        effectedKeys: ['desc'],
        show({ effectedData }) {
          return effectedData['desc'] === 'pk';
        },
      },
      // actions: [
      //   {
      //     initRun: true,
      //     action: () => {
      //       return {
      //         effectResult: {
      //           formItem: { label: 'xxxxxxx' },
      //         },
      //       };
      //     },
      //   },
      // ],
    }
  );
