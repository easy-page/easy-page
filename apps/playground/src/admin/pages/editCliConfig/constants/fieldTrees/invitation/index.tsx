import {
  ContainerIds,
  ContainerIdsText,
  FieldIds,
  FieldIdsText,
} from '@/common/constants/fieldMaps'
import { TreeOption } from '../interface'
import { CopySenceConfig, CreateSenceConfig } from './createOrCopy'
import { EditSenceConfig } from './edit'
import { ViewSenceConfig } from './view'

export const InvitationTreeData: TreeOption = {
  value: ContainerIds.ActInvite,
  label: ContainerIdsText.actInviteContainer,
  children: [
    {
      value: FieldIds.InviteTips,
      label: FieldIdsText.inviteTips,
    },
    CreateSenceConfig,
    CopySenceConfig,
    EditSenceConfig,
    ViewSenceConfig,
  ],
}
