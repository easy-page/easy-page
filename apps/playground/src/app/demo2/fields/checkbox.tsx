import { nodeUtil } from '@easy-page/antd-ui';

export const baseCheck = () =>
  nodeUtil.createField('base', 'aa', {
    value: '1',
    mode: 'single',
    required: true,
    // effectedKeys: ['editable'],
    actions: [
      {
        effectedKeys: ['desc'],
        action: () => {
          console.log('1112321321: 执行 action');
          return {
            fieldValue: '1',
          };
        },
      },
    ],
    postprocess: ({ value }) => {
      if (!value) {
        return {};
      }
      return {
        'invitation.actionType': value,
      };
    },
  });

export const commonCheck = baseCheck().appendChildren([
  nodeUtil.createNode('1', { name: 'aa' }),
  nodeUtil.createNode('2', { name: 'bb' }),
]);

export const check = nodeUtil.extends(commonCheck, {
  value: '2',
  postprocess: () => {
    return ({ value }) => {
      return {
        // 神价默认写死为1
        'invitation.actionType': 1,
        'invitation.scene': 'xxx',
      };
    };
  },
});
