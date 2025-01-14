import { RequestHandler, postReq } from '@/common/libs'
import { QueryPoiApplyListParams } from './queryPoiApplyList'

export type ListApproveRecordParams = Omit<
  QueryPoiApplyListParams,
  'currentPage' | 'pageSize'
>

export type listApproveRecordRes = string // 提示信息

// 列表审核通过
export const listApproveRecord: RequestHandler<
  ListApproveRecordParams,
  listApproveRecordRes
> = (params) => {
  return postReq(
    '/api/zspt/apply/batchApproveSkuApplyRecordByCondition',
    params
  )
}
