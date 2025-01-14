import { OperationType } from '@/common'
import { AnyNodesInfoType } from '@easy-page/antd-ui'
import { wmDisInvitationOfEditScene } from './edit'
import { wmDisInvitationOfCreateAndCopyScene } from './create/wmDis'
import { wmDiscountInvitationOfViewScene } from './view/wmDiscount'

export const wmDisInvitationMap: Record<OperationType, AnyNodesInfoType> = {
  [OperationType.CREATE]: [wmDisInvitationOfCreateAndCopyScene],
  [OperationType.COPY]: [wmDisInvitationOfCreateAndCopyScene],
  [OperationType.VIEW]: [wmDiscountInvitationOfViewScene],
  [OperationType.EDIT]: [wmDisInvitationOfEditScene],
}
