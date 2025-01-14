import { activityScene } from '@/pages/actsCrud/ActsCrudInfo/fields/baseInfo/activityScene'
import { shenhuiyuanActType } from './promotionType'

import {
  actDesc,
  actName,
  baseInfoContainer,
  belongBizline,
  ruleDesc,
  shyActTime,
  shyPoiType,
} from '@/pages/actsCrud/ActsCrudInfo/fields'

export const shenhuiyuanBasicInfo = baseInfoContainer().appendChildren([
  shenhuiyuanActType,
  belongBizline,
  activityScene,
  actName,
  shyActTime,
  shyPoiType,
  actDesc(),
  ruleDesc,
])

export * from './promotionType'
