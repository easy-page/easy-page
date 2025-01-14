import { RequestHandler, postReq } from '@/common/libs'
import { Empty } from '@easy-page/antd-ui'

// 单个业务品牌信息
export interface SingleBrandInfo {
  brandId: number
  brandName: string
}

export interface GetBatchActStatParams {
  brandIds: number[]
}

export interface GetBatchActStatResult {
  brandInfo: SingleBrandInfo[] // 业务品牌信息数组
  amountInConfirmPeriod?: number // 确认周期内的活动数
  amountTobeConfirm?: number // 待确认
  amountAuditing?: number // 审批中
  amountConfirmJoin?: number // 确认参加
  amountConfirmNotJoin?: number // 确认不参加
}

export const getBatchActStat: RequestHandler<
  GetBatchActStatParams,
  GetBatchActStatResult
> = (params) => {
  return postReq('/api/zspt/operation/operConfirm/batch/actStat', params)
}
