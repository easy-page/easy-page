import { ActTypeEnum, BizLineEnum } from '@/common'
import {
  baseInfoContainer,
  promotionType,
  commonActTimeRange,
  ruleDesc,
  actName,
} from '@/pages/actsCrud/ActsCrudInfo/fields'
import { wmsActRule } from './actRule'
import { bizline } from '@/pages/actsCrud/ActsCrudInfo/fields/baseInfo/bizline'
import { recordStatus } from './recordStatus'

export const wmsBasicInfo = baseInfoContainer().appendChildren([
  recordStatus(),
  promotionType(ActTypeEnum.WAIMA_SOURCE),
  actName,
  commonActTimeRange,
  wmsActRule(),
  bizline(BizLineEnum.WaimaSongJiu),
])
