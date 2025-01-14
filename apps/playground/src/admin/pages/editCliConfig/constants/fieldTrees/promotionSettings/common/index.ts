import { TreeOption } from '../../interface'
import { qualifyConfig } from './qualify'
import { subBaseInfoConfig } from './subBaseInfo'
import { subPromotionRuleConfig } from './subPromotionRule'

export const commonPromotionSettings: TreeOption[] = [
  qualifyConfig,
  subBaseInfoConfig,
  subPromotionRuleConfig,
]
