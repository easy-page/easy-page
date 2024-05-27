import {
  Empty,
  SelectEffectType,
  SelectState,
  UI_COMPONENTS,
  nodeUtil,
  searchAction,
} from '@easy-page/antd-ui';
import type { DefaultOptionType } from 'antd/es/select';

const sleep = (timeout: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, timeout);
  });
};

const searchById = async (
  id: number
): Promise<DefaultOptionType & { mark: string }> => {
  await sleep(1000);
  return { label: `选项${id}`, value: id, mark: `这是选项${id}的描述` };
};

const OPTIONS = new Array(100).fill({}).map((e, idx) => ({
  label: `选项${idx}`,
  value: idx,
  mark: `这是选项${idx}的描述`,
}));

const searchByKeywords = async (keyword?: string) => {
  console.log('searchByKeywords:', keyword);
  await sleep(1000);
  if (!keyword) {
    return OPTIONS;
  }
  return OPTIONS.filter((e) => e.label.includes(keyword));
};

// searchAction({
//   async searchByChoosed(choosed) {
//     console.log('eeeee chooosed');
//     const result = await searchById(1);
//     return result ? [result] : [];
//   },
//   async searchByKeyword(keyword) {
//     console.log('eeeee searchByKeyword');
//     const result = await searchByKeywords(keyword);
//     return result || [];
//   },
//   initRun: true,
//   value: { choosed: 1 },
// }).then((res) => console.log('eeeeee:', res));

type GoodState = SelectState<number, { mark: string }>;

export const goods = nodeUtil.createField<
  GoodState,
  { goods: GoodState },
  Empty,
  SelectEffectType<{ mark: string }>
>(
  'goods',
  '商品',
  {
    value: { choosed: 1 },
    required: true,
    mode: 'single',
    actions: [
      {
        effectedKeys: ['goods'],
        /** 初始化执行 */
        initRun: true,
        /** 初始化查询选中数据 */
        action: async ({ value, initRun }) => {
          console.log('search results run search action');
          const result = await searchAction({
            async searchByChoosed(choosed) {
              const result = await searchById(choosed);
              return result ? [result] : [];
            },
            async searchByKeyword(keyword) {
              const result = await searchByKeywords(keyword);
              return result || [];
            },
            initRun,
            value,
          });
          console.log('11111:', result);
          return result;
        },
      },
    ],
  },
  {
    ui: UI_COMPONENTS.SELECT,
    select: {
      showSearch: true,
      notFoundContent: null,
      filterOption: false,
    },
  }
);
