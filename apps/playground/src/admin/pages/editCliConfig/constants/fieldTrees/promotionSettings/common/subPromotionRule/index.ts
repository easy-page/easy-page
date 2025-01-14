import {
  ContainerIds,
  ContainerIdsText,
  FieldIds,
  FieldIdsText,
} from '@/common/constants/fieldMaps'
import { subSidyConfig } from './subsidy'
import { TreeOption } from '../../../interface'

export const subPromotionRuleConfig: TreeOption = {
  value: ContainerIds.SubPromotionRule,
  label: ContainerIdsText.subPromotionRule,
  children: [
    {
      value: FieldIds.DiscountRange,
      label: FieldIdsText.discountRange,
    },
    {
      value: FieldIds.PriceRange,
      label: FieldIdsText.priceRange,
    },
    subSidyConfig,
  ],
}
