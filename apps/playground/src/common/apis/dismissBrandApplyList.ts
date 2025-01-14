import { RequestHandler, postReq } from '@/common/libs'
import { SearchRuleId } from '@/pages/actApplyResult/ActApplyResultInfo/common'

export type DismissBrandApplyListParams = Partial<Record<SearchRuleId, any>> & {
  reason: string
  operateTime: number
  actId: number
}

export type DismissBrandApplyListRes = number

// 品牌商-列表清退
export const dismissBrandApplyList: RequestHandler<
  DismissBrandApplyListParams,
  DismissBrandApplyListRes
> = (params) => {
  return postReq('/api/zspt/apply/poiBrand/exitPoiApplyByCondition', params)
}
