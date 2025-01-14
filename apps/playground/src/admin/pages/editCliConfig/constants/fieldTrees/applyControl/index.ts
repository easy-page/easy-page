import {
  ContainerIds,
  ContainerIdsText,
  FieldIds,
  FieldIdsText,
} from '@/common/constants/fieldMaps'
import { TreeOption } from '../interface'

export const ApplyControlTreeData: TreeOption = {
  value: ContainerIds.ApplyControl,
  label: ContainerIdsText.applyControlContainer,
  children: [
    {
      value: FieldIds.CanApplyRole,
      label: FieldIdsText.canApplyRole,
    },
    {
      value: FieldIds.CanCancelAct,
      label: FieldIdsText.canCancelAct,
    },
    {
      value: FieldIds.CanEditAct,
      label: FieldIdsText.canEditAct,
    },
    {
      value: FieldIds.CanEditGoodInfo,
      label: FieldIdsText.canEditGoodInfo,
    },
    {
      value: FieldIds.CanAudit,
      label: FieldIdsText.canAudit,
    },
  ],
}
