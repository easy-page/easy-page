import { nodeUtil } from '@easy-page/antd-ui';
import { PageState } from '../interface';

export const hobby = nodeUtil
  .createField<string[], PageState>('hobby', '兴趣', {
    value: [],
    mode: 'multiple',
    actions: [
      {
        effectedKeys: ['name', 'age'],
        action: ({ effectedData }) => {
          if (effectedData.name === 'a') {
            return {
              fieldValue: ['read', 'listen'],
            };
          }
          return {};
        },
      },
      {
        effectedKeys: ['age'],
        action: ({ effectedData }) => {
          if (effectedData.age && +effectedData.age === 10) {
            return {
              fieldValue: ['listen'],
            };
          }
          return {};
        },
      },
    ],
  })
  .appendChildren([
    nodeUtil.createNode('read', { name: '读书' }),
    nodeUtil.createNode('listen', { name: '听歌' }),
  ]);
