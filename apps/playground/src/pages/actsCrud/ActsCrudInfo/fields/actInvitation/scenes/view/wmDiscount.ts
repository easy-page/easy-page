import { OperationType } from '@/common'
import { invitationOfCreateSceneContainer } from '../../containers'
import {
  commonInputIdsWayOfView,
  commonInviteWayOfCreate,
  inputWayOfViewWithFilter,
  poiList,
} from '../../fields'
import { commonChooseOperation } from '../../fields/chooseOperation/common/common'
import { invitationTips } from '../../fields/invitationTips'
import { wmDisCanApplyRole } from '../../../canApplyRole'

/** 查看模式下邀请模块结构 */
export const wmDiscountInvitationOfViewScene = invitationOfCreateSceneContainer(
  [OperationType.VIEW]
).appendChildren([
  commonChooseOperation,
  commonInviteWayOfCreate({ name: '通过业务品牌邀请', disabled: true }),
  wmDisCanApplyRole, // 可报名角色
  inputWayOfViewWithFilter, // 录入方式
  invitationTips,
  poiList(),
])
