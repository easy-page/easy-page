import {
  FieldIds,
  FieldIdsText,
  FieldOptionIds,
  FieldOptionIdsText,
} from '@/common/constants/fieldMaps'
import { TreeOption } from '../../interface'

export const actTimeConfig: TreeOption = {
  value: FieldIds.ActTime,
  label: FieldIdsText.actTime,
  children: [
    {
      value: FieldOptionIds.ActTimeLimit,
      label: FieldOptionIdsText.actTimeLimit,
      children: [
        {
          value: FieldIds.ActTimeRange,
          label: FieldIdsText.actTimeRange,
        },
      ],
    },
    {
      value: FieldOptionIds.ActTimeNoLimit,
      label: FieldOptionIdsText.actTimeNoLimit,
    },
  ],
}
