import { commonChargeInfo } from './chargeInfo'
import { disChargeType } from './chargeType'
import { subsidyFieldContainer } from './createSubsidyContainer'

/** 补贴分担设置 */
export const disSubsidyInfo = subsidyFieldContainer().appendChildren([
  disChargeType,
  commonChargeInfo,
])
