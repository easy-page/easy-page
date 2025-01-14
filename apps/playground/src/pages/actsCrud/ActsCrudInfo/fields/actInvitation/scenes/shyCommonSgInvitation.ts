import { OperationType } from '@/common'
import { AnyNodesInfoType } from '@easy-page/antd-ui'
import { shyInvitationOfCreateAndCopyScene } from './create'
import { shyInvitationOfEditScene } from './edit'
import { shyInvitationOfViewScene } from './view'

export const ShyActInviteMap: Record<OperationType, AnyNodesInfoType> = {
  [OperationType.CREATE]: [shyInvitationOfCreateAndCopyScene],
  [OperationType.COPY]: [shyInvitationOfCreateAndCopyScene],
  [OperationType.VIEW]: [shyInvitationOfViewScene],
  [OperationType.EDIT]: [shyInvitationOfEditScene],
}
