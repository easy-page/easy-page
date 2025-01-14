// /api/zspt/operation/plan/planList

import {
  ActivityStatusAmount,
  FlowResourceStateEnum,
  PlanSubTabResources,
  PlanStatusEnum,
  PlanTypeEnum,
  PlanJoinStatusEnum,
} from '@/common/constants'
import { RequestHandler, RequestResult, postReq } from '@/common/libs'
import { BizLineEnum } from '@/common/constants'
import { getPlanStat } from './getPlanStat'

export interface PlanListFilter {
  creator?: string
  /** 创建时间范围 */
  ctime?: number[]
  filterType: PlanSubTabResources
  planId?: number // 方案ID
  planName?: string // 方案名称
  planStatus?: PlanStatusEnum // 方案状态
  joinStatus?: PlanJoinStatusEnum
  /** 发布时间范围 */
  sendTime?: number[]
}

export type GetPlanListParams = PlanListFilter & {
  currentPage: number
  pageNo: number
  bizLine?: BizLineEnum // 不填写默认为闪购
}

export interface PlanFlowResource {
  planId: number
  netFlowActivityWithdrawStatus: FlowResourceStateEnum
  packages: { netFlowId: string; netFlowName: string }[]
}

export type PlanInfo = {
  planType?: PlanTypeEnum //方案类型
  id: number // 方案ID
  name: string // 方案名称
  status: number // 方案状态
  statusDesc: string // 方案状态描述
  sendTime: number // 发布时间
  ctime: number // 创建时间
  creator: string // 创建人mis号
  planCreator?: string
  joinStatus?: PlanJoinStatusEnum
  invitedGroupCnt?: number // 邀请的业务组数量,仅在神价方案中存在
  joinedGroupCnt?: number // 已完成的业务组数量，仅在神价方案中存在
  planId: number
  bizLine?: BizLineEnum
  activityStatusAmount: ActivityStatusAmount[] // 方案下包含的提报活动数量统计信息
  flowResource: PlanFlowResource
  netFlowActivityWithdrawStatus: FlowResourceStateEnum
}

export type GetPlanListResult = {
  items: PlanInfo[]
  total: number
}

export const getPlanList: RequestHandler<
  GetPlanListParams,
  GetPlanListResult
> = async (params: GetPlanListParams) => {
  const res: RequestResult<GetPlanListResult> = await postReq(
    '/api/zspt/operation/plan/planList',
    params
  )
  const planIds = (res.data?.items || []).map((e) => e.id)
  const { data: statsData } = await getPlanStat({ planIds })
  const items = res?.data?.items || []
  return {
    ...res,
    data: {
      total: res?.data?.total,
      items: items.map((e) => {
        const planStatItem = (statsData || []).find(
          (stat) => stat.planId === e.id
        )
        return {
          ...e,
          activityStatusAmount: planStatItem.activityStatusAmount,
        }
      }),
    },
  }
}
