import { RequestHandler, postReq } from '@/common/libs'
import { SearchRuleId } from '@/pages/actApplyResult/ActApplyResultInfo/common'

export type BrandListDismissCountParams = Partial<Record<SearchRuleId, any>> & {
  actId: number
  operateTime: number
}

export type BrandListDismissCountRes = {
  totalCount: number
  exitCount: number
}

export const getBrandListDismissCount: RequestHandler<
  BrandListDismissCountParams,
  BrandListDismissCountRes
> = (params) => {
  return postReq('/api/zspt/apply/poiBrand/queryExitPoiCountByCondition', params)
}
