import { OperationType } from '@/common'
import { invitationOfCreateSceneContainer } from '../../containers'
import {
  inputWayOfCreateWithFilter,
  commonInviteWayOfCreate,
  commonChooseOperation,
  poiTypeTips,
} from '../../fields'
import { wmDisCanApplyRole } from '../../../canApplyRole'

/** 新建和复制模式下邀请模块结构 */
export const wmDisInvitationOfCreateAndCopyScene =
  invitationOfCreateSceneContainer([
    OperationType.CREATE,
    OperationType.COPY,
  ]).appendChildren([
    commonInviteWayOfCreate({ name: '通过业务品牌邀请', disabled: true }),
    wmDisCanApplyRole, // 可报名角色
    inputWayOfCreateWithFilter,
    poiTypeTips,
  ])
