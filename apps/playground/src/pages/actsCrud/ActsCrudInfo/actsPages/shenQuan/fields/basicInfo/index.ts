import {
  actDesc,
  baseInfoContainer,
  ruleDesc,
  actName,
  shyActTime,
  shenquanPoiType,
} from '@/pages/actsCrud/ActsCrudInfo/fields'
import { shenQuanActType } from './promotionType'

export const shenQuanBasicInfo = baseInfoContainer().appendChildren([
  shenQuanActType,
  actName,
  shyActTime,
  shenquanPoiType,
  actDesc(),
  ruleDesc,
])

export * from './promotionType'
