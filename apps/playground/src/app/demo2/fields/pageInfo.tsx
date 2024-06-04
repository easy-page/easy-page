import { Empty, PageUtil, nodeUtil } from '@easy-page/antd-ui';
const pageUtil = new PageUtil({
  pageId: 'demo1',
  rootUIConfig: {
    form: {
      className: 'p-4 border border-solid mb-4',
    },
  },
});

pageUtil.addFields([
  nodeUtil.createField<string, Empty, { name: string }>('test', '测试', {
    value: '',
    validate: ({ value }) => {
      if (!value) {
        return { success: false, errorMsg: 'xcxvxcx' };
      }
      return { success: true };
    },
    actions: [
      {
        effectedKeys: ['name'],

        action: ({ effectedData }) => {
          console.log(
            '=======> result effectedData:',
            effectedData,
            effectedData.name === 'pk'
          );
          if (effectedData.name === 'pk') {
            return {
              fieldValue: 'test',
            };
          }
          return {};
        },
      },
    ],
  }),
]);

export const childFormInfo = pageUtil.getPageInfo();
console.log('childFormInfo:', childFormInfo);
