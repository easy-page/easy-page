import { postReq, RequestHandler } from '@/common/libs'

export type ApproveActParams = {
  /** 活动 ID */
  actId: number
  /** 门店 ID */
  poiId: number
  /** 商品 ID */
  skuId: number
  esId: number
}

export type ApproveActRes = {}

export const approveAct: RequestHandler<ApproveActParams, ApproveActRes> = (
  params
) => {
  return postReq('/api/zspt/apply/approveSkuApply', params)
}
