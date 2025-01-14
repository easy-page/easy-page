import { OperationType } from '@/common'
import { invitationOfCreateSceneContainer } from '../../containers'
import {
  inputWayOfCreateWithFilter,
  commonInviteWayOfCreate,
} from '../../fields'
import { poiTypeTips } from '../../fields/poiTypeTips'
import { shyCanApplyRole } from '../../../canApplyRole'

/** 新建和复制模式下邀请模块结构 */
export const shyInvitationOfCreateAndCopyScene =
  invitationOfCreateSceneContainer([
    OperationType.CREATE,
    OperationType.COPY,
  ]).appendChildren([
    commonInviteWayOfCreate({ name: '通过业务品牌邀请' }),
    shyCanApplyRole,
    inputWayOfCreateWithFilter,
    poiTypeTips,
  ])
