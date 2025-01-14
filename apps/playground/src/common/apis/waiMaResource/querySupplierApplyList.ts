import { RequestHandler, postReq } from '@/common/libs'

export type QueryResourceApplyListParams = {
  activityId: number // 活动ID
  applyType: number // 1 表示 供应商 2表示 品类运营
}

export type ResourceApplyListItem = {
  resourceId: number
  /** 供应商ID */
  inviteTargetId: number
  /** 供应商名称 */
  supplierName: number
  /** 资源位名称 */
  resourceName: string
  /** 素材 */
  materialInfo: string
  skuCodes: string
  // 报名状态
  status: number
  // 供应商报名时间
  applyTime: number 
}

export type QueryResourceApplyListRes = {
  activityId: number
  activityName: string // 活动名称
  status: number // 活动状态
  contractId: string // 合同id 即关联协议id
  contractStatus: number // 合同签署状态
  contractStatusDesc: string // 合同签署状态描述
  items: ResourceApplyListItem[]
}

export const queryResourceApplyList: RequestHandler<
  QueryResourceApplyListParams,
  QueryResourceApplyListRes
> = (params) => {
  return postReq('/api/zspt/apply/resource/queryApplyList', params)
}
