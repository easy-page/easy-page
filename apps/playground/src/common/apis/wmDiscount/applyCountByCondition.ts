import { RequestHandler, postReq } from '@/common/libs'
import { QuerySkuApplyListParams } from './querySkuApplyList'

export type GetOptRecordCountParams = QuerySkuApplyListParams & {
  actId: number
}
// 报名结果页面 列表清退
export const applyCountByCondition: RequestHandler<
  GetOptRecordCountParams,
  number
> = (params) => {
  return postReq('/api/zspt/apply/countByCondition', params)
}
