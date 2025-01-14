import { adminPostReq, BizLineEnum, RequestHandler } from '@/common'

export type GetActsApplyStatisticsParams = {
  actIdList: number[]
  bizLine: BizLineEnum
}

export type StatisticInfo = {
  label: string
  value: number
}
export type PoiApplyStatisticsRes = StatisticInfo[]

export const getActApplyStatistics: RequestHandler<
  GetActsApplyStatisticsParams,
  PoiApplyStatisticsRes
> = async (params) => {
  const res = await adminPostReq(
    '/api/zspt/operation/group/actsApplyStaticstics',
    {
      ...params,
    }
  )
  return {
    ...res,
    data: res.data?.data || [],
  }
}
