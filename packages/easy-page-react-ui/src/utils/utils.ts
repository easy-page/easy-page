/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * - 合并状态
 * - 策略：对象深层合并、其余覆盖
 * @param source
 * @param current
 */
export const mergeState = (source: object, current: object) => {
  if (Array.isArray(source) || Array.isArray(current)) {
    return current;
  }
  if (typeof source !== 'object' || typeof current !== 'object') {
    return current;
  }
  // 持续合并对象所有key
  const result: any = { ...source };
  const keys = Object.keys(current);
  keys.forEach((each) => {
    if (result[each]) {
      result[each] = mergeState(result[each], current[each as keyof object]);
    } else {
      result[each] = current[each as keyof object];
    }
  });
  return result;
};

export const getChangedKeys = (
  pre: Record<string, any>,
  next: Record<string, any>
) => {
  const changedKeys: string[] = [];
  const keys = Object.keys(next);
  keys.forEach((each) => {
    if (next[each] !== pre[each]) {
      changedKeys.push(each);
    }
  });
  return changedKeys;
};
