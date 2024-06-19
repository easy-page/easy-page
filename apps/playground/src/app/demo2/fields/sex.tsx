import { Empty, RadioEffectedType, nodeUtil } from '@easy-page/antd-ui';

export const sex = nodeUtil
  .createField<string, any>(
    'inputIdsWay',
    '录入方式',
    {
      value: `1`,
      mode: 'single',
      required: true,
      validate: ({ value }) => {
        if (!value) {
          return { success: false, errorMsg: '必选' };
        }
        return { success: true };
      },
      when: {
        // effectedKeys: ['chooseOperation'],
        show({ effectedData }) {
          return false;
          // if ([`${ActionTypeEnum.NoChange}`].includes(effectedData?.['chooseOperation'])) {
          //   console.log('不展示ssss')
          //   return false;
          // }
          // return true;
        },
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
    nodeUtil
      .createNode('1', { name: '录入 ID' })
      .appendChildren([nodeUtil.createField('122', '1', {})]),
  ]);
