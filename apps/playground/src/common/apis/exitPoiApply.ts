import { RequestHandler, postReq } from '@/common/libs'

// 清退信息
export type ListInfo = {
  id: number
  poiId: number
  poiName: string
}
export type ExitPoiApplyParams = {
  actId: number // 提报活动 ID
  reason: string // 清退理由
  list?: ListInfo[]
  poiIds?: number[]
  isAllSelect?: boolean
}

export type FailRecord = {
  id: number
  poiId: number
  reason: string
  skuId?: number
  poiName?: string
}

export type ExitPoiApplyRes = {
  title: string
  failRecords: FailRecord[]
}

export const exitPoiApply: RequestHandler<
  ExitPoiApplyParams,
  ExitPoiApplyRes
> = (params) => {
  return postReq('/api/zspt/apply/exitPoiApply', params)
}
