/**
 *
 * 合作业务组相关类型
 *
 */

// Mcc单个合作业务组配置
export type BusinessPartitionConfig = {
  oriId: number
  oriName: string
}
// Mcc返回配置
export type BusinessPartitionConfigArray = Array<BusinessPartitionConfig>

// 单个合作业务组组件返回类型
export type BusinessPartitionItem = {
  oriId: number
  oriMisId: Array<string>
}

// 合作业务组组件返回值
export type BusinessPartitionItemArray = Array<BusinessPartitionItem>
