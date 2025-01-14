import { RequestHandler, postReq } from '@/common/libs'

export interface applySkuParams {
  activityId: number // 活动ID
  resourceId: number // 资源位ID
  skuCodes: string
}

export type applySkuParamsRes = {}

export const applySku: RequestHandler<applySkuParams, applySkuParamsRes> = (
  params
) => {
  return postReq('/api/zspt/apply/resource/applySku', params)
}
