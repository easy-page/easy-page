import { SubFormIds, SubFormIdsText } from '@/common/constants/fieldMaps'
import { TreeOption } from '../interface'
import { commonPromotionSettings } from './common'

export const subActConfig: TreeOption = {
  value: SubFormIds.SubAct,
  label: SubFormIdsText.subAct,
  children: commonPromotionSettings,
}
