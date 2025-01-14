import { RequestHandler, postReq } from '@/common/libs'
import { Empty } from '@easy-page/antd-ui'

// 单个业务品牌信息
export interface SingleBrandStatInfo {
  brandId: number // 业务品牌ID
  brandName: string // 业务品牌名称
  amountInConfirmPeriod: number // 确认周期内的活动数
  amountTobeConfirm: number // 当前待确认的活动数
  amountToBeginConfirm: number // 即将开始确认的活动数
  confirmBeginTime: number // 合作运营确认开始时间(最早)，通常为时间戳
}

export interface GetBrandStatListParams {
  brandIds?: string
  brandId?: number
}

export const getBrandStatList: RequestHandler<
  GetBrandStatListParams,
  SingleBrandStatInfo[]
> = (params) => {
  return postReq('/api/zspt/operation/operConfirm/batch/brandStatList', params)
}
