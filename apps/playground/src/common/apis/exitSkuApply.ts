import { RequestHandler, postReq } from '@/common/libs'

export type ExitSkuApplyParams = {
  actId: number // 提报活动 ID
  reason: string // 清退理由
  skuId: number
  poiId: number // 门店 ID
  esId: number
}

export type ExitSkuApplyRes = {}

export const exitSkuApply: RequestHandler<
  ExitSkuApplyParams,
  ExitSkuApplyRes
> = (params) => {
  return postReq('/api/zspt/apply/exitSkuApply', params)
}
