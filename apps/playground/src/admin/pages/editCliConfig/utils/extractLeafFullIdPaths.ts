import { FieldsConfig } from '@/common/constants/fieldMaps/interface'

/**
 * 提取 FieldConfig 结构中的所有叶子结点的 fullId 并转换成嵌套数组形式
 * @param configs FieldConfig 数组
 * @returns 所有叶子结点的 fullId 的嵌套数组
 */
export function extractLeafFullIdPaths(configs: FieldsConfig): string[][] {
  const result: string[][] = []

  const extractLeaves = (configs: FieldsConfig) => {
    configs.forEach((config) => {
      // 如果没有 children 或 children 为空数组，表示这是一个叶子结点
      if (!config.children || config.children.length === 0) {
        const pathArray = config.fullId.split('.')
        result.push(pathArray)
      } else {
        // 如果有子节点，递归处理子节点
        extractLeaves(config.children)
      }
    })
  }

  extractLeaves(configs)
  return result
}
