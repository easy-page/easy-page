import {
  Empty,
  SelectEffectType,
  SelectState,
  UI_COMPONENTS,
  nodeUtil,
} from '@easy-page/antd-ui';
import { PageState } from '../interface';

const sleep = (timeout: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, timeout);
  });
};

export const friend = nodeUtil
  .createField<SelectState<string>, PageState, Empty, SelectEffectType>(
    'friend',
    '朋友',
    {
      value: {
        choosed: '',
        options: [],
      },
      actions: [
        {
          effectedKeys: ['friend'],
          initRun: true,
          action: async ({ value, initRun }) => {
            if (initRun) {
              console.log('=======> initRun');
              await sleep(10000);

              // 加载当前选中的选项，并回填
              const option = await Promise.resolve({
                value: value.choosed,
                label: '选项',
              });
              const options = await Promise.resolve([
                { value: 'zhangshan', label: '章三' },
              ]);
              console.log('=======> zhangshanhou');
              const curOptions = value.choosed
                ? [...new Set([option, ...options])]
                : options;
              return {
                fieldValue: {
                  ...value,
                  options: curOptions,
                },
              };
            }
            /** 非首次加载，判读是否有搜索关键词，如果有，则搜索 */
            if (!value.keyword) {
              return {};
            }
            console.log('=======> reaction');
            await sleep(1000);
            console.log('=======> 李四线');
            const options = await Promise.resolve([
              { value: 'lisi', label: '李四' },
            ]);
            return { fieldValue: { ...value, options, keyword: '' } };
          },
        },
      ],
      mode: 'single',
    },
    {
      ui: UI_COMPONENTS.SELECT,
      select: {
        // options: [{ label: '小三', value: 'xiaosan' }],
        showSearch: true,
        notFoundContent: null,
        filterOption: false,
      },
    }
  )
  .appendChildren([
    nodeUtil
      .createNode('xiaosan', { name: '小三' })
      .appendChildren([nodeUtil.createField('xiaosa1n', '小三1', {})]),
    nodeUtil.createField('xiaosa1n', '小三1', {}),
  ]);
