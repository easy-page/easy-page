import { RequestHandler, postReq } from '@/common/libs'
import { SearchRuleId } from '@/pages/actApplyResult/ActApplyResultInfo/common'

export type BatchExitSkuApplyRecordByConditionParams = Partial<
  Record<SearchRuleId, any>
> & {
  reason: string
  operateTime: number
  actId: number
}

export type BatchExitSkuApplyRecordByConditionRes = number

// 商家列表清退
export const batchExitSkuApplyRecordByCondition: RequestHandler<
  BatchExitSkuApplyRecordByConditionParams,
  BatchExitSkuApplyRecordByConditionRes
> = (params) => {
  return postReq('/api/zspt/apply/batchExitSkuApplyRecordByCondition', params)
}
