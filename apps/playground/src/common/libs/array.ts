export type JudgeType = 'AND' | 'OR'

export function checkArrayInclusion(arrayA: any[], arrayB: any[], type: JudgeType): boolean {
  switch (type) {
    case 'AND':
      // 检查数组B是否包含数组A的所有元素
      return arrayA.every(element => arrayB.includes(element))
    case 'OR':
      // 检查数组B是否包含数组A的至少一个元素
      return arrayA.some(element => arrayB.includes(element))
    default:
      throw new Error('Invalid type. Expected "AND" or "OR".')
  }
}


export function areAllElementsInArray(A: string[], B: string[]): boolean {
  // 使用 Set 来提高查找效率
  const setB = new Set(B);

  // 遍历数组 A，如果有元素不在 setB 中，返回 false
  for (const element of A) {
    if (!setB.has(element)) {
      return false;
    }
  }

  // 如果所有元素都在 setB 中，返回 true
  return true;
}