import { OperationType } from '@/common'
import { invitationOfCreateSceneContainer } from '../../containers'
import {
  commonInviteWayOfCreate,
  inputWayOfViewWithFilter,
  poiList,
} from '../../fields'
import { shyCanApplyRole } from '../../../canApplyRole'

/** 查看模式下邀请模块结构 */
export const shenQuanInvitationOfViewScene = invitationOfCreateSceneContainer([
  OperationType.VIEW,
]).appendChildren([
  commonInviteWayOfCreate({ name: '通过商家品牌邀请' }),
  inputWayOfViewWithFilter,
  poiList(),
])
