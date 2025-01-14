import { OpSenceId, OpSenceText } from '@/common/constants/fieldMaps/opSence'
import { TreeOption } from '../../interface'
import { invitationTipsConfig, poiListConfig } from '../common'
import { ChooseOptionOfEditConfig } from './common/chooseOption'

export const EditSenceConfig: TreeOption = {
  value: OpSenceId.ActInviteEdit,
  label: OpSenceText.actInviteEdit,

  children: [
    invitationTipsConfig,
    ChooseOptionOfEditConfig,
    // InviteWayOfEditConfig,
    // InputWayOfEditConfig,
    // poiListConfig,
  ],
}
