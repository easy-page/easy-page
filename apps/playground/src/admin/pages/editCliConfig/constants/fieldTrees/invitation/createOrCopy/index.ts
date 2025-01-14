import { OpSenceId, OpSenceText } from '@/common/constants/fieldMaps/opSence'
import { TreeOption } from '../../interface'
import {
  ChooseOptionOfCreateOrCopyConfig,
  commonFields,
} from './common/chooseOption'
import { invitationTipsConfig } from '../common'

export const CreateSenceConfig: TreeOption = {
  value: OpSenceId.ActInviteCreate,
  label: OpSenceText.actInviteCreate,
  children: [
    invitationTipsConfig,
    ChooseOptionOfCreateOrCopyConfig,
    ...commonFields,
  ],
}

export const CopySenceConfig: TreeOption = {
  value: OpSenceId.ActInviteCopy,
  label: OpSenceText.actInviteCopy,
  children: [
    invitationTipsConfig,
    ChooseOptionOfCreateOrCopyConfig,
    ...commonFields,
  ],
}
