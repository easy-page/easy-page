import { OperationType } from '@/common'
import { invitationOfCreateSceneContainer } from '../../containers'
import {
  commonInviteWayOfCreate,
  inputWayOfViewWithFilter,
  poiList,
} from '../../fields'
import { shyCanApplyRole } from '../../../canApplyRole'

/** 查看模式下邀请模块结构 */
export const shyInvitationOfViewScene = invitationOfCreateSceneContainer([
  OperationType.VIEW,
]).appendChildren([
  commonInviteWayOfCreate({ name: '通过业务品牌邀请' }),
  shyCanApplyRole,
  inputWayOfViewWithFilter,
  poiList(),
])
