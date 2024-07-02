import { Empty, RadioEffectedType, nodeUtil } from '@easy-page/antd-ui';

export const sex = nodeUtil
  .createField<string, any>(
    'inputIdsWay',
    '录入方式',
    {
      value: `test_1`,
      mode: 'single',
      required: true,
      validate: ({ value }) => {
        if (!value) {
          return { success: false, errorMsg: '必选' };
        }
        return { success: true };
      },
    }
    // {
    //   layout: {
    //     disableLayout: true,
    //     indentation: false,
    //     childrenContainerClassName: '',
    //   },
    // }
  )
  .appendChildren([
    nodeUtil.createNode('test_1', {
      name: '录入 ID',
      when: {
        show(context) {
          return false;
        },
      },
    }),
  ]);
