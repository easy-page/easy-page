import { OperationType } from '@/common'
import { invitationOfCreateSceneContainer } from '../../containers'
import {
  commonInputIdsWayOfView,
  commonInviteWayOfCreate,
  poiList,
} from '../../fields'
import { commonChooseOperation } from '../../fields/chooseOperation/common/common'
import { invitationTips } from '../../fields/invitationTips'

/** 查看模式下邀请模块结构 */
export const invitationOfViewScene = invitationOfCreateSceneContainer([
  OperationType.VIEW,
]).appendChildren([
  commonChooseOperation,
  commonInviteWayOfCreate({ name: '通过商家品牌邀请' }),
  commonInputIdsWayOfView,
  invitationTips,
  poiList(),
])
