import {
  ContainerIds,
  ContainerIdsText,
  FieldIds,
  FieldIdsText,
} from '@/common/constants/fieldMaps'
import { TreeOption } from '../interface'
import { commonPromotionSettings } from './common'
import { subActConfig } from './subAct'

export const PromotionSettingsTreeData: TreeOption = {
  value: ContainerIds.PromotionSettings,
  label: ContainerIdsText.promotionSettingsContainer,
  children: [
    {
      value: FieldIds.CanApplyActCount,
      label: FieldIdsText.canApplyActCount,
    },
    {
      value: FieldIds.ActRule,
      label: FieldIdsText.actRule,
    },
    subActConfig,
    ...commonPromotionSettings,
  ],
}
