import {
  FieldOptionIds,
  FieldOptionIdsText,
  FieldIds,
  FieldIdsText,
} from '@/common/constants/fieldMaps'
import { TreeOption } from '../../../interface'

export const InputIdsWayOption: TreeOption[] = [
  {
    value: FieldOptionIds.ByIdOption,
    label: FieldOptionIdsText.byIdOption,
    children: [
      {
        value: FieldIds.InputId,
        label: FieldIdsText.inputId,
      },
    ],
  },
  {
    value: FieldOptionIds.ByUpload,
    label: FieldOptionIdsText.byUpload,
    children: [
      {
        value: FieldIds.UploadId,
        label: FieldIdsText.uploadId,
      },
    ],
  },
  {
    value: FieldOptionIds.ByFilter,
    label: FieldOptionIdsText.byFilter,
    children: [
      {
        value: FieldIds.FilterRule,
        label: FieldIdsText.filterRule,
      },
    ],
  },
]
