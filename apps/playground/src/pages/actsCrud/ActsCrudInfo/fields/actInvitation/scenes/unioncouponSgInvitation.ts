import { OperationType } from '@/common'
import { AnyNodesInfoType } from '@easy-page/antd-ui'
import { shenquanInvitationOfEditScene } from './edit'
import { shenQuanInvitationOfViewScene } from './view'
import { shenquanInvitationOfCreateAndCopyScene } from './create'

export const UnionCouponActInviteMap: Record<
  OperationType,
  AnyNodesInfoType
> = {
  [OperationType.CREATE]: [shenquanInvitationOfCreateAndCopyScene],
  [OperationType.COPY]: [shenquanInvitationOfCreateAndCopyScene],
  [OperationType.VIEW]: [shenQuanInvitationOfViewScene],
  [OperationType.EDIT]: [shenquanInvitationOfEditScene],
}
