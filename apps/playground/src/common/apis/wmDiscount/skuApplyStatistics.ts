import { RequestHandler, postReq } from '@/common/libs'

export type SkuApplyStatistics = {
  actId: number
  // statisticsType: number
}

export type SkuStatisticInfo = {
  label: string
  value: number
}
export type SkuApplyStatisticsRes = SkuStatisticInfo[]

export const getSkuApplyStatistics: RequestHandler<
  SkuApplyStatistics,
  SkuApplyStatisticsRes
> = (params) => {
  return postReq('/api/zspt/apply/skuApplyStatistics', params)
}
