import { settingGears, subPlanSubsidyContainer } from '@/pages/plansCrud/fields'
import { ucSettingGears } from '../ucSettingGears'
import { commissionRatio } from '../commissionRatio'

// 补贴规则
export const subsidyRule = subPlanSubsidyContainer().appendChildren([
  commissionRatio,
  ucSettingGears,
])
