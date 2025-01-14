import { AuthHandlersEnum } from '@/common'
import {
  authPlanGray,
  commonOpAuths,
  authPlanCopy,
  authNetflow,
  authFrombackend,
} from '../../../operation/auth'
import { planAuthUrl } from '../../../operation/auth/planAuthUrl'

export const planEditBtnAuths = commonOpAuths(
  'planEditBtnAuths',
  '方案编辑按钮权限',
  {
    defaultValue: [AuthHandlersEnum.AuthFromBackEnd],
  }
).appendChildren([
  authFrombackend('planEditBtnAuths', {
    nodes: [planAuthUrl],
  }),
  authPlanGray('planEditBtnAuths'),
  authNetflow,
])

export const planCopyBtnAuths = commonOpAuths(
  'planCopyBtnAuths',
  '方案复制按钮权限',
  {
    defaultValue: [AuthHandlersEnum.AuthFromBackEnd],
  }
).appendChildren([
  authFrombackend('planCopyBtnAuths', {
    nodes: [planAuthUrl],
  }),
  authPlanGray('planCopyBtnAuths'),
  authPlanCopy,
  authNetflow,
])
