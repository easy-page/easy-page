import { FieldIds, FieldIdsText } from '@/common/constants/fieldMaps'
import { TreeOption } from '@roo/roo/TreeSelect'
import { InputIdsWayOption } from '../common/options/InputIdsWayOptions'
import { InviteWayOption } from '../common/options/inviteWayOptions'

export const BaseInvitationFields: TreeOption[] = [
  {
    value: FieldIds.InviteWay,
    label: FieldIdsText.inviteWay,
    children: [...InviteWayOption],
  },

  {
    value: FieldIds.InputIdsWay,
    label: FieldIdsText.inputIdsWay,
    children: [...InputIdsWayOption],
  },
]
