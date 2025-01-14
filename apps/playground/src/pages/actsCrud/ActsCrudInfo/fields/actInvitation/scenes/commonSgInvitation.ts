import { OperationType } from '@/common'
import { AnyNodesInfoType } from '@easy-page/antd-ui'
import { invitationOfCreateAndCopyScene } from './create'
import { csInvitationOfEditScene, invitationOfEditScene } from './edit'
import { invitationOfViewScene } from './view'
import { sgInviteTips } from '../fields/sgInviteTips'

export const CommonSgActInviteMap: Record<OperationType, AnyNodesInfoType> = {
  [OperationType.CREATE]: [sgInviteTips, invitationOfCreateAndCopyScene],
  [OperationType.COPY]: [sgInviteTips, invitationOfCreateAndCopyScene],
  [OperationType.VIEW]: [sgInviteTips, invitationOfViewScene],
  [OperationType.EDIT]: [sgInviteTips, invitationOfEditScene],
}

export const CsActInviteMap: Record<OperationType, AnyNodesInfoType> = {
  [OperationType.CREATE]: [sgInviteTips, invitationOfCreateAndCopyScene],
  [OperationType.COPY]: [sgInviteTips, invitationOfCreateAndCopyScene],
  [OperationType.VIEW]: [sgInviteTips, invitationOfViewScene],
  [OperationType.EDIT]: [sgInviteTips, csInvitationOfEditScene],
}