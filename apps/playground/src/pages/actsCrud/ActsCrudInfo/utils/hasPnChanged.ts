export const hasPnChanged = (
  curPnIds: string[],
  nextPnIds: string[]
): boolean => {
  // 将两个数组转换为 Set
  const curPnSet = new Set(curPnIds)
  const nextPnSet = new Set(nextPnIds)

  // 检查 Set 的大小是否不同
  if (curPnSet.size !== nextPnSet.size) {
    return true
  }

  // 检查是否存在不同的元素
  for (const pnId of curPnSet) {
    if (!nextPnSet.has(pnId)) {
      return true
    }
  }

  // 没有发现变化
  return false
}
