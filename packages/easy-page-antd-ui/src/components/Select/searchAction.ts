import { EffectActionResult, Empty } from '@easy-page/react-ui';
import { uniqBy } from 'lodash';
import type { DefaultOptionType } from 'antd/es/select';
import { SelectEffectType, SelectState } from './interface';

export type SearchAction<T, V> = {
  searchByKeyword: (
    keyword: string | undefined
  ) => Promise<(DefaultOptionType & V)[]>;
  searchByChoosed: (choosed: T) => Promise<(DefaultOptionType & V)[]>;
  value: SelectState<T, V>;
  initRun: boolean | undefined;
  uniqKey?: string;
};

/**
 * T 为选中选项的值类型
 * V 为选项中的除了：label、value 属性的额外信息类型。
 * @param options
 */
export async function searchAction<T = string, V = Empty>(
  options: SearchAction<T, V>
): Promise<EffectActionResult<SelectState<T, V>, SelectEffectType<V>>> {
  const { value, initRun, searchByChoosed, searchByKeyword } = options;
  if (!initRun && value.keyword === undefined) {
    return {};
  }

  /** 查询选项 */
  const results = (await searchByKeyword(value.keyword)) || [];
  if (value && value.choosed && Array.isArray(value.choosed)) {
    // 如果是数组
    const choosed = await searchByChoosed(value.choosed);
    return {
      fieldValue: {
        ...value,
        options: uniqBy([...choosed, ...results], options?.uniqKey || 'id'),
        keyword: undefined,
      },
    };
  }

  const hasChoosed = results.find((x) => x.value === value.choosed);
  if (value && value.choosed && !hasChoosed) {
    /** 选择的选项不在查询的列表中，单独搜索选中选项 */
    const choosed = await searchByChoosed(value.choosed);
    return {
      fieldValue: {
        ...value,
        options: uniqBy([...choosed, ...results], options?.uniqKey || 'id'),
        keyword: undefined,
      },
    };
  }
  return { fieldValue: { ...value, options: results, keyword: undefined } };
}
