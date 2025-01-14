import {
  ContainerIds,
  ContainerIdsText,
  FieldIds,
  FieldIdsText,
  SubFormIds,
  SubFormIdsText,
} from '@/common/constants/fieldMaps'
import { TreeOption } from '../interface'

export const BudgetControlTreeData: TreeOption = {
  value: ContainerIds.BudgetControl,
  label: ContainerIdsText.budgetControlContainer,
  children: [
    {
      value: SubFormIds.BudgetControl,
      label: SubFormIdsText.budgetControl,
      // children: [
      //   {
      //     value: FieldIds.Pn,
      //     label: FieldIdsText.pn,
      //   },
      //   {
      //     value: FieldIds.BudgetAmount,
      //     label: FieldIdsText.budgetAmount,
      //   },
      //   {
      //     value: FieldIds.PnControl,
      //     label: FieldIdsText.pnControl,
      //   },
      // ],
    },
    {
      value: ContainerIds.ApplyReasonContainer,
      label: ContainerIdsText.applyReasonContainer,
      children: [
        {
          value: FieldIds.ApplyReasonField,
          label: FieldIdsText.applyReasonField,
        },
      ],
    },
  ],
}
