import {
  ContainerIds,
  ContainerIdsText,
  FieldIds,
  FieldIdsText,
} from '@/common/constants/fieldMaps'
import { TreeOption } from '../../interface'

export const qualifyConfig: TreeOption = {
  value: ContainerIds.SubQualify,
  label: ContainerIdsText.subQualify,
  children: [
    {
      value: FieldIds.Qualify,
      label: FieldIdsText.qualify,
    },
  ],
}
