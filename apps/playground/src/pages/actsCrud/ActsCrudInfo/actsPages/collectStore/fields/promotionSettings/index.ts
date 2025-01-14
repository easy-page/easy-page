import { promotionSettingsContainer } from '@/pages/actsCrud/ActsCrudInfo/fields'
import { subActRule } from './actRule'
import { csCanApplyActCount } from './canApplyActCount'

export const csPromotionSettings = promotionSettingsContainer().appendChildren([
  csCanApplyActCount,
  subActRule,
])
