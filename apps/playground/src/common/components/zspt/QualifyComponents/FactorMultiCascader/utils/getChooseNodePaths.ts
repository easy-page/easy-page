import { SearchFactorInfo } from './searchFactorGoodsApi'

export function findLeafPaths(
  ids: string,
  data: SearchFactorInfo[]
): {
  paths: number[][]
  names: string[][]
} {
  const idArray = ids.split(',').map(Number) // 将字符串转换为数字数组
  const paths: number[][] = []
  const names: string[][] = []

  function dfs(
    node: SearchFactorInfo,
    currentPath: number[],
    currentName: string[]
  ) {
    currentPath.push(node.id)
    currentName.push(node.name)

    if (node.leaf && idArray.includes(node.id)) {
      paths.push([...currentPath])
      names.push([...currentName])
    }

    if (node.children) {
      for (const child of node.children) {
        dfs(child, currentPath, currentName)
      }
    }

    currentPath.pop() // 回溯
    currentName.pop()
  }

  for (const item of data) {
    dfs(item, [], [])
  }

  return { paths, names }
}
