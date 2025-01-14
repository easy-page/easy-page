import { RequestHandler, postReq } from '@/common/libs'
import { QueryPoiApplyListParams } from './queryPoiApplyList'

export type CountByConditionRecordParams = Omit<
  QueryPoiApplyListParams,
  'currentPage' | 'pageSize'
>

export type CountByConditionRecordRes = number // 提示信息

// 查询可清退数据条数
export const countByCondition: RequestHandler<
  CountByConditionRecordParams,
  CountByConditionRecordRes
> = (params) => {
  return postReq('/api/zspt/apply/countByCondition', params)
}
