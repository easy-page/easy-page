import {
  ContainerIds,
  ContainerIdsText,
  FieldIds,
  FieldIdsText,
} from '@/common/constants/fieldMaps'
import { TreeOption } from '../../interface'

export const subBaseInfoConfig: TreeOption = {
  value: ContainerIds.SubBaseInfo,
  label: ContainerIdsText.subBaseInfo,
  children: [
    {
      value: FieldIds.DisSubActName,
      label: FieldIdsText.disSubActName,
    },
    {
      value: FieldIds.CanApplyGoodCount,
      label: FieldIdsText.canApplyGoodCount,
    },
  ],
}
