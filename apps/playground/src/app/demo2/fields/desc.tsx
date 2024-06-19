import { UI_COMPONENTS, nodeUtil } from '@easy-page/antd-ui';
import { Input } from 'antd';

export const desc = nodeUtil.createField(
  'desc',
  '介绍',
  {
    value: '',
  },
  {
    ui: UI_COMPONENTS.TEXTAREA,
  }
);

export const desc1 = () =>
  nodeUtil.createCustomField(
    'desc',
    '介绍',
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

export const desc2 = nodeUtil.extends(desc1(), {
  postprocess(oldPostprocess) {
    return ({ value }) => {
      console.log('1112323321:');
      return { desc: value };
    };
  },
});
