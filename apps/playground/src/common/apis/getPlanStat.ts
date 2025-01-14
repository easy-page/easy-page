import { RequestHandler, postReq } from '@/common/libs'

export type GetPlanStatParams = {
  planIds: number[]
}

interface Activity {
  id: number // 提报活动ID
  name: string // 提报活动名称
}

interface ActivityStatusAmount {
  activityStatus: number // 提报活动状态, 详见枚举
  amount: number // 当前状态下提报活动数量
  activities: Activity[] // 当前状态下提报活动信息
}

export type PlanStatItem = {
  planId: number
  /** 方案下包含的提报活动数量统计信息 */
  activityStatusAmount: ActivityStatusAmount[]
}
/** 获取表格列更多数据 */
export const getPlanStat: RequestHandler<GetPlanStatParams, PlanStatItem[]> = (
  params
) => postReq('/api/zspt/operation/plan/getStat', params)
