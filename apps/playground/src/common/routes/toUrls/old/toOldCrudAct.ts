/** 七巧板的那个统一招商平台 */

import {
  OperationType,
  BizLineEnum,
  ActivitySourceEnum,
  ActTypeEnum,
  ActSubTabResources,
} from '@/common/constants'
import { openInUocEntry } from '@/common/libs'
import { ToPageHandler } from '../../interface'
import { UrlEnum } from '../../urls'
import { appendParamsToUrl } from '../../utils'

export enum FromPage {
  /** 报名结果页面 */
  PlanResult = 'planResult',
  JoinPlan = 'joinPlan',
  ActivityList = 'activityList',
}

export type OldCrudActParams = {
  operationType: OperationType
  planOperationType?: OperationType
  bizLine: string
  groupId?: string | number
  templateId: number
  tempId: number
  groupName?: string
  groupTime?: number[]
  brandApplyEndTime?: number
  brandOperateAuditEndTime?: number
  brandActivityCount?: number
  canWorkflowEditStatus?: boolean
  planId?: number
  activityId?: number
  fromPage?: FromPage
  tabValue?: number
  filterType?: ActSubTabResources
  source?: ActivitySourceEnum
  promotionTypeConfig: ActTypeEnum
}
export const toOldCrudAct: ToPageHandler<OldCrudActParams> = (
  params,
  target
) => {
  openInUocEntry(appendParamsToUrl(UrlEnum.OldCrudAt, params), target)
}
