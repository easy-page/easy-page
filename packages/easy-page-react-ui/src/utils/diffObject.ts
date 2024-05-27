import { isEqual } from 'lodash';

export function diffObjects<T extends Record<string, unknown>>(
  obj1: T,
  obj2: T
): string[] {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  const allKeys = Array.from(new Set([...obj1Keys, ...obj2Keys]));

  const changedKeys: string[] = [];

  allKeys.forEach((key) => {
    if (!isEqual(obj1[key], obj2[key])) {
      changedKeys.push(key);
    }
  });

  return changedKeys;
}
