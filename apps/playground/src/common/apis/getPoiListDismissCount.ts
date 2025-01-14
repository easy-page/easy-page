import { RequestHandler, postReq } from '@/common/libs'
import { SearchRuleId } from '@/pages/actApplyResult/ActApplyResultInfo/common'

export type PoiListDismissCountParams = Partial<Record<SearchRuleId, any>> & {
  actId: number
  operateTime: number
}

export type PoiListDismissCountRes = {
  totalCount: number
  exitCount: number
}

export const getPoiListDismissCount: RequestHandler<
  PoiListDismissCountParams,
  PoiListDismissCountRes
> = (params) => {
  return postReq('/api/zspt/apply/queryExitPoiCountByCondition', params)
}
