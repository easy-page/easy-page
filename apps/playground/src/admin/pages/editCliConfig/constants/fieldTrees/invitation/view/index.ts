import { OpSenceId, OpSenceText } from '@/common/constants/fieldMaps/opSence'
import { ChooseOptionOfCreateOrCopyConfig } from '../createOrCopy/common/chooseOption'
import { invitationTipsConfig, poiListConfig } from '../common'
import { TreeOption } from '../../interface'
import { InviteWayOfCreateOrCopy } from '../createOrCopy/common/inviteWay'
import { FieldIds, FieldIdsText } from '@/common/constants/fieldMaps'

export const ViewSenceConfig: TreeOption = {
  value: OpSenceId.ActInviteView,
  label: OpSenceText.actInviteView,
  children: [
    invitationTipsConfig,
    ChooseOptionOfCreateOrCopyConfig,
    InviteWayOfCreateOrCopy,
    {
      label: FieldIdsText.inputIdsWayOfView,
      value: FieldIds.InputIdsWayOfView,
    },
    poiListConfig,
  ],
}
