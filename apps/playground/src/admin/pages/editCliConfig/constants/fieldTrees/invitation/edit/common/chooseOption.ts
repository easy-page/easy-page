import {
  FieldIds,
  FieldIdsText,
  FieldOptionIds,
  FieldOptionIdsText,
} from '@/common/constants/fieldMaps'
import { TreeOption } from '../../../interface'
import { InputWayOfEditConfig } from './inputWay'
import { InviteWayOfEditConfig } from './inviteWay'

export const commonFields: TreeOption[] = [
  InputWayOfEditConfig,
  InviteWayOfEditConfig,
]

export const ChooseOptionOfEditConfig: TreeOption = {
  value: FieldIds.ChooseOperationOfEdit,
  label: FieldIdsText.chooseOperationOfEdit,
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

  //   {
  //     value: FieldOptionIds.AppendPoiOfEdit,
  //     label: FieldOptionIdsText.appendPoiOfEdit,
  //     children: commonFields,
  //   },

  //   {
  //     value: FieldOptionIds.RemovePoiOfEdit,
  //     label: FieldOptionIdsText.removePoiOfEdit,
  //     children: commonFields,
  //   },

  //   {
  //     value: FieldOptionIds.ReplaceAllOfEdit,
  //     label: FieldOptionIdsText.replaceAllOfEdit,
  //     children: commonFields,
  //   },
  // ],
}
