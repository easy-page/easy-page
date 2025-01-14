import { SearchFactorInfo } from './searchFactorGoodsApi'

// 获取选中的节点的文本路径
export const getNodeString = (
  id: number[],
  factorGoods: SearchFactorInfo[]
) => {
  const text: string[] = []
  const doFindNode = (id: number, goods: SearchFactorInfo[]) => {
    return goods.find((x) => x.id === id)
  }
  let curGoods = [...factorGoods]
  id.forEach((x) => {
    const node = doFindNode(x, curGoods)
    if (node) {
      text.push(node.name)
      curGoods = node.children || []
    }
  })
  return text
}
