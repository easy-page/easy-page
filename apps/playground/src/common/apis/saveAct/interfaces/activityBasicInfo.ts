import { ActivityStatusEnum, ActivitySourceEnum } from "@/common/constants"
import { BizLineEnum } from "@/common/constants";

export type FeProperties = {
  promotionTypeConfig: string;
}

export interface ActBasicInfo {
  // 来源, plan 通过方案创建, activity 直接创建提报活动，本次传plan即可
  source: ActivitySourceEnum
  // 方案ID，编辑方案时必填
  planId: number
  // 分组ID，编辑方案场景，在已有分组下新增、编辑提报活动时必填
  groupId?: number
  // 分组民初
  groupName?: string
  // 分组开始时间
  groupStartTime?: number
  // 分组结束时间
  groupEndTime?: number
  // 业务线，详见枚举，本次为闪购
  bizLine: BizLineEnum
  // 模板ID，即：促销类型ID
  templateId: number
  // 模板名称，即：促销类型名称
  templateName?: string
  templateInfo?: string; // FeProperties 的 stirng 类型
  // 活动状态
  status?: ActivityStatusEnum
}