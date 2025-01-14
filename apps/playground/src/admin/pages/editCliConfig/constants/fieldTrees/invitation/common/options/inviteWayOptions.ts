import {
  FieldOptionIds,
  FieldOptionIdsText,
} from '@/common/constants/fieldMaps'
import { TreeOption } from '../../../interface'

export const InviteWayOption: TreeOption[] = [
  {
    value: FieldOptionIds.ByConditionFilter,
    label: FieldOptionIdsText.byConditionFilter,
  },
  {
    value: FieldOptionIds.ByMerchantBrand,
    label: FieldOptionIdsText.byMerchantBrand,
  },
  {
    value: FieldOptionIds.ByPoiInviteOption,
    label: FieldOptionIdsText.byPoiInviteOption,
  },
]
