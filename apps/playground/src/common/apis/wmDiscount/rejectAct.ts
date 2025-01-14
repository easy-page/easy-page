import { postReq, RequestHandler } from '@/common/libs'

export type RejectActParams = {
  /** 活动 ID */
  actId: number
  /** 门店 ID */
  poiId: number
  /** 商品 ID */
  skuId: number
  /** 拒绝理由 */
  reason: string
  esId: number
}

export type RejectActRes = {}

export const rejectAct: RequestHandler<RejectActParams, RejectActRes> = (
  params
) => {
  return postReq('/api/zspt/apply/rejectSkuApply', params)
}
