import { FieldIds, FieldIdsText } from '@/common/constants/fieldMaps'
import { TreeOption } from '../../../interface'
import { InputWayOfCreateOrCopy } from './inputWay'
import { InviteWayOfCreateOrCopy } from './inviteWay'

export const commonFields: TreeOption[] = [
  InviteWayOfCreateOrCopy,
  InputWayOfCreateOrCopy,
]

export const ChooseOptionOfCreateOrCopyConfig: TreeOption = {
  value: FieldIds.ChooseOperation,
  label: FieldIdsText.chooseOperation,
  // children: [
  //   {
  //     value: FieldOptionIds.LimitOption,
  //     label: FieldOptionIdsText.limitOption,
  //     children: commonFields,
  //   },
  //   {
  //     value: FieldOptionIds.NoLimitOption,
  //     label: FieldOptionIdsText.noLimitOption,
  //   },

  //   // {
  //   //   value: FieldOptionIds.AppendPoi,
  //   //   label: FieldOptionIdsText.appendPoi,
  //   //   children: commonFields,
  //   // },

  //   // {
  //   //   value: FieldOptionIds.RemovePoi,
  //   //   label: FieldOptionIdsText.removePoi,
  //   //   children: commonFields,
  //   // },

  //   // {
  //   //   value: FieldOptionIds.ReplaceAll,
  //   //   label: FieldOptionIdsText.replaceAll,
  //   //   children: commonFields,
  //   // },
  // ],
}
