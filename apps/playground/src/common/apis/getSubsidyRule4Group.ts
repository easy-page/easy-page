import { RequestHandler, postReq } from '@/common/libs'
import { SubMarketingPlanStatus } from './getPlanDetail'
import { BusinessPartition, SubsidyRule } from './savePlan'

export type GetSubsidyRule4GroupParams = {
  groupId: number // 分组 ID
}

export type GetSubsidyRule4GroupRes = {
  planIntro: string
  groupStatus: SubMarketingPlanStatus
  commissionRatio?: number // 商家出佣比例
  subsidyRule: SubsidyRule[]
  businessPartition: BusinessPartition[]
  groupId: number
  planId: number
  groupName: string
}

export const getSubsidyRule4Group: RequestHandler<
  GetSubsidyRule4GroupParams,
  GetSubsidyRule4GroupRes
> = (params) => {
  return postReq('/api/zspt/operation/act/getSubsidyRule4Group', params)
}
