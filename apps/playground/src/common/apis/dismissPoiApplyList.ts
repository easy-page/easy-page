import { RequestHandler, postReq } from '@/common/libs'
import { SearchRuleId } from '@/pages/actApplyResult/ActApplyResultInfo/common'

export type DismissPoiApplyListParams = Partial<Record<SearchRuleId, any>> & {
  reason: string
  operateTime: number
  actId: number
}

export type DismissPoiApplyListRes = number

// 商家列表清退
export const dismissPoiApplyList: RequestHandler<
  DismissPoiApplyListParams,
  DismissPoiApplyListRes
> = (params) => {
  return postReq('/api/zspt/apply/exitPoiApplyByCondition', params)
}
