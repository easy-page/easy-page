import {
  Empty,
  RadioEffectedType,
  RadioGroupEffectType,
  nodeUtil,
} from '@easy-page/antd-ui';

export const sex = nodeUtil
  .createField<string, any, any, RadioGroupEffectType>(
    'sex',
    '性别',
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
      actions: [
        {
          initRun: true,
          effectedKeys: ['name'],
          action: ({ effectedData, initRun }) => {
            console.log('initRuninitRun:', initRun);
            const name = effectedData['name'];
            if (name === '1') {
              return { effectResult: { disabled: true } };
            }
            return { effectResult: {} };
          },
        },
      ],
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
    }),
    nodeUtil.createNode('test_12', {
      name: '录入 ID2',
    }),
  ]);
