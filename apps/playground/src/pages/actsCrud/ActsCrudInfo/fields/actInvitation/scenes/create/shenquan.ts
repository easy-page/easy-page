import { OperationType } from '@/common'
import { invitationOfCreateSceneContainer } from '../../containers'
import {
  inputWayOfCreateWithFilter,
  commonInviteWayOfCreate,
} from '../../fields'
import { poiTypeTips } from '../../fields/poiTypeTips'

/** 新建和复制模式下邀请模块结构 */
export const shenquanInvitationOfCreateAndCopyScene =
  invitationOfCreateSceneContainer([
    OperationType.CREATE,
    OperationType.COPY,
  ]).appendChildren([
    commonInviteWayOfCreate({ name: '通过商家品牌邀请' }),
    inputWayOfCreateWithFilter,
    poiTypeTips,
  ])
