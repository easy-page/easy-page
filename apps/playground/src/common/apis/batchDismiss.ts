import { RequestHandler, postReq } from '@/common/libs'
import { QueryPoiApplyListParams } from './queryPoiApplyList'
import { ExitPoiApplyRes } from './exitPoiApply'

export type DismissActParams = {
  /** 活动 ID */
  actId: number
  list: {
    esId: number
    poiId: number
    skuId: number
  }[]
  reason: string
}

export type FailSkuRecord = {
  id: number;
  poiId: number;
  reason: string;
  skuId?: number;
  poiName?: string;
}

export type DismissActSkuRes = {
  title: string;
  failRecords: FailSkuRecord[]
} // 提示信息

export const batchDismiss: RequestHandler<DismissActParams, DismissActSkuRes> = (
  params
) => {
  return postReq('/api/zspt/apply/batchExitSkuApply', params)
}
