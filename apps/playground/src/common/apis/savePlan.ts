import { Empty } from '@easy-page/antd-ui'
import {
  PlanStatusEnum,
  PlanTypeEnum,
  SubsidyChargeKeyEnum,
  SubsidyConditionKeyEnum,
  SubsidyOptEnum,
} from '../constants'
import { RequestHandler, postReq } from '@/common/libs'
import { reportManager } from '../reporter'
import { overWatchEnd } from '../overwatch'

/** T 为子方案信息 */
export interface MarketingPlan<T> {
  id?: number // 营销方案ID，编辑时必填
  name: string // 营销方案名称
  intro: string // 营销方案介绍
  group: T[] // 分组信息
  planType: PlanTypeEnum
  bizLine: number // 外卖业务线
  status?: PlanStatusEnum
}

export enum SubsidyLevelEnum {
  Base = 'base',
  Expand = 'expand',
  OutSite = 'out_site'
}

export const SubsidyLevelText: Record<SubsidyLevelEnum, string> = {
  [SubsidyLevelEnum.Base]: '基础档位',
  [SubsidyLevelEnum.Expand]: '膨胀档位',
  [SubsidyLevelEnum.OutSite]: '',
}

export interface SubsidyRule {
  scene: SubsidyLevelEnum // 适用场景，base-基础，expand-膨胀
  rule: SubsidyRuleDetail[] // 补贴规则
}

export interface SubsidyRuleDetail {
  condition: SubsidyCondition // 补贴条件
  charge: SubsidyCharge[] // 补贴承担
}

export interface SubsidyCondition {
  key: SubsidyConditionKeyEnum // 补贴条件的键
  opt: SubsidyOptEnum // 补贴条件的操作符
  minValue: string // 补贴条件的最小值
  maxValue: string // 补贴条件的最大值
}

export interface SubsidyCharge {
  key: SubsidyChargeKeyEnum // 补贴承担的键
  opt: SubsidyOptEnum // 补贴承担的操作符
  minValue: string // 补贴承担的最小值
  maxValue: string // 补贴承担的最大值
}

export interface BusinessPartition {
  oriMisId: string[]
}

export interface BaseSubMarketingPlan {
  id?: number // 子方案ID, 编辑时必填
  name: string // 分组名称
  subsidyRule: SubsidyRule[] // 出资策略
  commissionRatio: number // 商家佣金比例
  businessPartition: BusinessPartition[] // 策略使用人员信息，本次取第一个
}

export type SavePlanParams = MarketingPlan<BaseSubMarketingPlan>
export type SavePlanResult = Empty

export const savePlan: RequestHandler<SavePlanParams, SavePlanResult> = async (
  params
) => {
  const res = await postReq('/api/zspt/operation/plan/savePlan', params)
  reportManager.sendSavePlanEvent({
    bizLine: params.bizLine,
    planType: params.planType,
    traceid: res.traceid,
    msg: res.msg,
    success: res.success,
  })
  overWatchEnd()
  return res
}
