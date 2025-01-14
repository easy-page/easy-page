import { authActCopy } from './authActCopy'
import {
  AuthSence,
  authTempAndWhilteListAndPlanCreatorAndSelf,
  authTempAndWhilteListAndSelfOfPlan,
  authTempOnly,
  authWhilteListAndSelf,
} from './authOperationFromBackend'

export * from './authNetFlow'
export * from './authOperationFromBackend'
export * from './authPlanCopy'
export * from './planAndActAuths'
export * from './authActGray'
export * from './authSubsidy'
export * from './authActCopy'

/** 闪购活动通用的活动操作鉴权：活动编辑、活动发送邀请、邀请设置 */
export const commonSgActOperationAuth = [
  authTempAndWhilteListAndPlanCreatorAndSelf(AuthSence.ActList),
  authTempAndWhilteListAndSelfOfPlan(AuthSence.ActList),
]

/** 闪购活动编辑按钮通用鉴权 */
export const commonSgActCopyOpAuth = [
  authActCopy,
  authTempOnly(AuthSence.ActList),
]

export const commonWmActOperationAuth = [
  authWhilteListAndSelf(AuthSence.ActList),
]
