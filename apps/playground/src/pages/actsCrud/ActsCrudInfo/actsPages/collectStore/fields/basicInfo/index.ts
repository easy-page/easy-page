import {
  actDesc,
  actName,
  actTimeRange,
  baseInfoContainer,
  commonActTimeRange,
  endTime,
  ruleDesc,
} from '@/pages/actsCrud/ActsCrudInfo/fields'
import { csActPeriod } from './actPeriod'
import { csWeekDays } from './weekDays'
import { collectStoreActType } from './promotionType'
import { targetCollectStore } from './targerCollectStore'

import { csPoiType } from './poiType'
import { csChargeFlowType } from './chargeFlowType'

export const basicInfo = baseInfoContainer().appendChildren([
  collectStoreActType,
  targetCollectStore,
  csPoiType,
  csChargeFlowType,
  actName,
  commonActTimeRange, // 活动生效时间 不可编辑
  csActPeriod, // 生效时段  不支持配置，页面隐藏。如果是集合店类型，传默认值00:00 - 23:59
  csWeekDays, // 周循环：不支持配置，页面隐藏。如果是集合店类型，传默认值'1,2,3,4,5,6,7'
  endTime(), // 商家报名截止时间
  actDesc(), // 活动简介
  ruleDesc, // 活动规则
])

export * from './promotionType'
export * from './targerCollectStore'
