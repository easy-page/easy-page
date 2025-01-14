import { promotionSettingsContainer } from '@/pages/actsCrud/ActsCrudInfo/fields'
import { applyQualify } from './applyQualify'
import { subsidy } from './subsidy'

export const promotionSettingsInfo =
  promotionSettingsContainer().appendChildren([applyQualify, subsidy])
