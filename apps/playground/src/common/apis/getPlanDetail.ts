import { RequestHandler, postReq } from "@/common/libs";
import { BaseSubMarketingPlan, MarketingPlan } from "./savePlan"

export type GetPlanDetailParams = { planId: number }

export enum SubMarketingPlanStatus {
  Started = 'started', // 已开启
  ToStart = 'to_start', // 待启用
  End = 'end', // 已结束
  Pause = 'pause' // 已停用
}

export const SubMarketingPlanStatusText: Record<SubMarketingPlanStatus, string> = {
  [SubMarketingPlanStatus.Started]: "已启用",
  [SubMarketingPlanStatus.ToStart]: "待开启",
  [SubMarketingPlanStatus.End]: "已结束",
  [SubMarketingPlanStatus.Pause]: "已停用"
}

export interface SubMarketingPlan extends BaseSubMarketingPlan {
  actIds: number[]// 分组下提报活动ID
  groupStatus: SubMarketingPlanStatus;
}

export type GetPlanDetailResult = MarketingPlan<SubMarketingPlan>

export const getPlanDetail: RequestHandler<GetPlanDetailParams, GetPlanDetailResult> = (params) => {
  return postReq('/api/zspt/operation/plan/getPlanDetail', params)
}