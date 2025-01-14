/**
 * - key 为：因子的：factorCode
 * - value：为因子的值
 */
export type DataCollector = Record<string, any>

export interface Qualify {
  // 报名资质ID, 编辑时必填
  collectorId?: number
  // 准入因子集合, k-准入因子唯一标识, v-准入因子信息
  dataCollector?: DataCollector
}