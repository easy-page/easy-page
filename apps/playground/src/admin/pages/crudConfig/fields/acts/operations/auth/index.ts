import { AuthHandlersEnum } from '@/common'
import {
  authActCopy,
  authActFrombackendOfPlan,
  authActGray,
  authFrombackend,
  authSubsidy,
  commonOpAuths,
} from '../../../operation/auth'
import { auths } from '../../../authInfo/fields'
import { actAuthUrl } from '../../../operation/auth/actAuthUrl'
import { planAuthUrl } from '../../../operation/auth/planAuthUrl'

export const actCopyAuths = commonOpAuths('actCopyAuths', '活动复制按钮权限', {
  defaultValue: [
    AuthHandlersEnum.AuthActCopy,
    AuthHandlersEnum.AuthFromBackEnd,
  ],
}).appendChildren([
  authActCopy,
  authFrombackend('actCopyAuths', {
    nodes: [actAuthUrl],
  }),
  authActGray('actCopyAuths'),
  authSubsidy('actCopyAuths'),
])

export const actEditAuths = commonOpAuths('actEditAuths', '活动编辑按钮权限', {
  defaultValue: [AuthHandlersEnum.AuthFromBackEnd],
}).appendChildren([
  authFrombackend('actEditAuths', {
    nodes: [actAuthUrl],
  }),
  authActGray('actEditAuths'),
  authSubsidy('actEditAuths'),
  authActFrombackendOfPlan('actEditAuths', {
    nodes: [planAuthUrl],
  }),
])

export const actInviteSettingsAuths = commonOpAuths(
  'actInviteSettingsAuths',
  '活动邀请设置按钮权限',
  {
    defaultValue: [AuthHandlersEnum.AuthFromBackEnd],
  }
).appendChildren([
  authFrombackend('actInviteSettingsAuths', {
    nodes: [actAuthUrl],
  }),
  authActGray('actInviteSettingsAuths'),
  authSubsidy('actInviteSettingsAuths'),
  authActFrombackendOfPlan('actInviteSettingsAuths', {
    nodes: [planAuthUrl],
  }),
])

export const actSendInviteAuths = commonOpAuths(
  'actSendInviteAuths',
  '发送邀请按钮权限',
  {
    defaultValue: [AuthHandlersEnum.AuthFromBackEnd],
  }
).appendChildren([
  authFrombackend('actSendInviteAuths', {
    nodes: [actAuthUrl],
  }),
  authActGray('actSendInviteAuths'),
  authSubsidy('actSendInviteAuths'),
  authActFrombackendOfPlan('actSendInviteAuths', {
    nodes: [planAuthUrl],
  }),
])

export const actWithdrawAuths = commonOpAuths(
  'actWithdrawAuths',
  '活动撤回按钮权限',
  {
    defaultValue: [AuthHandlersEnum.AuthFromBackEnd],
  }
).appendChildren([
  authFrombackend('actWithdrawAuths', {
    nodes: [actAuthUrl],
  }),
  authActGray('actWithdrawAuths'),
  authSubsidy('actWithdrawAuths'),
  authActFrombackendOfPlan('actWithdrawAuths', {
    nodes: [planAuthUrl],
  }),
])

export const actPoiConfirmAuths = commonOpAuths(
  'actPoiConfirmAuths',
  '活动合作运营确认按钮权限',
  {
    defaultValue: [AuthHandlersEnum.AuthFromBackEnd],
  }
).appendChildren([
  authFrombackend('actPoiConfirmAuths', {
    nodes: [actAuthUrl],
  }),
  authActGray('actPoiConfirmAuths'),
  authSubsidy('actPoiConfirmAuths'),
  authActFrombackendOfPlan('actPoiConfirmAuths', {
    nodes: [planAuthUrl],
  }),
])
