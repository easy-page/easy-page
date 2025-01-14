import { ActivityStatusEnum, PoiTypeEnum } from '@/common/constants'
import { ActListOpConfig } from '../../getStat'

export interface BudgetInfo {
  chargeOrg: string // 补贴承担组织
  budgetAmount: number // 预算总金额, 单位元
  usedAmount: number // 预算消耗金额, 单位元
  usedPercent: number // 预算消耗百分比, 如：预算消耗50.24%则返回50.24，保留两位小数
}

export interface StatusInfo {
  activityStatusCause: number // 流转到当前状态的原因, 详见枚举
  activityStatusCauseDesc: string // 流转到当前状态的原因
  activityStatusCauseTip: string
}

export interface ActivityStatItem {
  activityId: number // 提报活动ID
  poiType: PoiTypeEnum
  budgetInfo: BudgetInfo[] // 预算信息
  statusInfo: StatusInfo[] // 状态信息
  opConfig: ActListOpConfig // 列表操作项
}

// 分组活动详情
export type IGroupDetailAct = {
  // 是否已确认复制  仅前端需要
  copyConfirmed: boolean
  // 是否新增提报活动
  isNewActivity: boolean
  // 模板 ID
  templateId: number
  // 提报活动ID
  id: number
  // 活动名称
  name: string
  // 促销类型(枚举待提供)
  promotionType: number
  // 促销类型描述
  promotionTypeDesc: string
  // 活动开始时间
  promotionStartTime: number
  // 活动结束时间
  promotionEndTime: number
  // 活动状态
  status: ActivityStatusEnum
  // 活动状态描述
  statusDesc: string
  // 品牌报名结束时间
  brandApplyEndTime: number
  // 品牌运营审核结束时间
  brandOperateAuditEndTime: number
  //活动统计信息
  statInfo: ActivityStatItem
  //品牌商报名截止时间是否一致  仅前端需要
  brandApplyEndTimeSame: boolean
  //品牌运营审核截止时间是否一致 仅前端需要
  brandOperateAuditEndTimeSame: boolean
}
