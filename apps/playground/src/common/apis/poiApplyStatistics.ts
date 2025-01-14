import { RequestHandler, postReq } from '@/common/libs'

export type PoiApplyStatistics = {
  activityId: number
  statisticsType: number
}

export type StatisticInfo = {
  label: string
  value: number
}
export type PoiApplyStatisticsRes = StatisticInfo[]

export const getPoiApplyStatistics: RequestHandler<
  PoiApplyStatistics,
  PoiApplyStatisticsRes
> = (params) => {
  return postReq('/api/zspt/apply/poiApplyStatistics', params)
}
