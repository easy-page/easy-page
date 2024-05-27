import { UI_COMPONENTS, nodeUtil } from '@easy-page/antd-ui';

export const myswitch = nodeUtil
  .createField<boolean, { swtccc: boolean; name: string }>(
    'swtccc',
    '测试',
    {
      value: false,
      childrenActions: [
        {
          effectedKeys: ['name'],
          action: ({ effectedData }) => {
            if (effectedData.name === '11') {
              return { fieldValue: 2 };
            }
            return {};
          },
        },
      ],
      childrenWhen: {
        effectedKeys: ['swtccc'],
        show({ effectedData }) {
          console.log('effectedData:', effectedData.swtccc);
          return effectedData.swtccc === true;
        },
      },
    },
    {
      ui: UI_COMPONENTS.SWITCH,
    }
  )
  .appendChildren([
    nodeUtil.createField<string, { name: string }>('pk1', '测试1', {
      value: '1',
      when: {
        effectedKeys: ['name'],
        show({ effectedData }) {
          return effectedData.name === '22';
        },
      },
    }),
    nodeUtil.createField('pk2', '测试2', {
      value: '2',
      actions: [
        {
          effectedKeys: ['name'],
          action: ({ effectedData }) => {
            if (effectedData.name === '22') {
              return { fieldValue: '23' };
            }
            return {};
          },
        },
      ],
    }),
  ]);
