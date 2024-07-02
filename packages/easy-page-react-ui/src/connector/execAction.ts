import { EffectActionResult } from '@easy-page/core';
import { EffectOptions } from './interface';

/**
 * - 一次副作用，只执行一个 action
 * - 同一个 key，被写在多个 action 中，只执行优先级最高的那个，并给出 warning 提示。
 * - 多个 key 同时影响时，只匹配最高优先级的 key 执行，并返回结果
 * - 优先级按照数据顺序，第 0 个优先级高
 */
export const execAction = async ({
  effectedData,
  changedKeys = [],
  frameworkProps: { nodeInfo, store, componentName },
  initRun,
}: Pick<
  EffectOptions,
  'effectedData' | 'changedKeys' | 'frameworkProps' | 'initRun'
>): Promise<EffectActionResult<unknown, unknown>> => {
  const { actions = [], id } = nodeInfo;
  /**
   * - 如果 keys 配置了：[a,b]，且配置了: initRun
   * - 则如果 c 变化，也会执行 initRun
   */
  const action = actions.find((e) => {
    // 如果是 initRun，则首先匹配 initRun
    const isInitRunAction = e.initRun || !e.effectedKeys || e.effectedKeys.length === 0
    if (initRun && isInitRunAction) {
      // 首次执行 initRun 的
      return true;
    }
    /** 如果不是 initRun，再找匹配的 key 执行 */
    return changedKeys.some((k) => e.effectedKeys?.includes(k))
  }
  );
  try {
    if (action) {
      return action.action({
        initRun,
        effectedData,
        pageProps: store?.getPageProps(),
        pageState: store?.getAllState(),
        value: store?.getState(id),
        defaultValues: store?.getDefaultValues(),
      });
    }
  } catch (error) {
    console.error('exec effects action error:', error);
    return {};
  }
  return {};
};
