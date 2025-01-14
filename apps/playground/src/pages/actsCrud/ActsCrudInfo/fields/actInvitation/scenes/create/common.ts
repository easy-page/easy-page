import { OperationType } from '@/common'
import { invitationOfCreateSceneContainer } from '../../containers'
import {
  commonChooseOperation,
  commonInputWayOfCreate,
  commonInviteWayOfCreate,
  invitationTips,
} from '../../fields'

/** 新建和复制模式下邀请模块结构 */
export const invitationOfCreateAndCopyScene = invitationOfCreateSceneContainer([
  OperationType.CREATE,
  OperationType.COPY,
]).appendChildren([
  commonChooseOperation,
  commonInviteWayOfCreate(),
  commonInputWayOfCreate,
  invitationTips,
])
