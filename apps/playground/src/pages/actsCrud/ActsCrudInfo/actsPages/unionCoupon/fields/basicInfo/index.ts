import {
  actDesc,
  baseInfoContainer,
  ruleDesc,
  actName,
  shyActTime,
  actPeriod,
  commonActTimeRange,
  disChargeFlowType,
  endTime,
  PeriodTypeEnum,
  weekDays,
  unionCouponActTimeRange,
  // unioncouponPoiType,
} from '@/pages/actsCrud/ActsCrudInfo/fields'
import { unionCouponActType } from './promotionType'
import { disPoiType } from '@/pages/actsCrud/ActsCrudInfo/fields/baseInfo/poiType/disPoiType'

export const unionCouponBasicInfo = baseInfoContainer().appendChildren([
  unionCouponActType,
  disPoiType,
  actName,
  unionCouponActTimeRange,
  actPeriod([PeriodTypeEnum.From00, PeriodTypeEnum.From30]),
  weekDays(),
  endTime(),
  actDesc(),
  ruleDesc,
])

export * from './promotionType'
