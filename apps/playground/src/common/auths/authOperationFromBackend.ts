import { getAuthInfo } from '@/common/apis'
import { AuthHandler } from './planAndActAuths'
import {
  AuthFromBackendResEnum,
  AuthUrl,
  OperationEnum,
} from '@/common/constants'

export enum AuthSence {
  ActList = 'actList',
  PlanList = 'planList',
}

export const AuthSenceText: Record<AuthSence, string> = {
  [AuthSence.ActList]: '活动列表鉴权',
  [AuthSence.PlanList]: '方案列表鉴权',
}

/**
 * - 在方案列表验证列表数据权限
 * - 在活动列表验证完活动权限后、校验方案权限
 * @param auths
 * @param options
 * @returns
 */
export const authOperationFromBackend: <
  T extends {
    creator: string
    planCreator?: string
    planId?: number
    id?: number
    activityId?: number
  }
>(
  auths: AuthFromBackendResEnum[],
  options: {
    // 当当前操作的鉴权是非通用的 url 时，配置
    authUrl?: AuthUrl
    sence: AuthSence
    noPlanEditAuthMsg?: string
  }
) => AuthHandler<T> =
  (auths, options) =>
  async ({ record, userInfo, authUrl, operation, authOperationKey }) => {
    const curAuthUrl = options?.authUrl || authUrl
    const planId =
      options.sence === AuthSence.ActList ? record.planId : record.id
    /** 验证活动列表 */
    const isActListSence = options.sence === AuthSence.ActList
    const isPlanAuth = curAuthUrl === AuthUrl.PlanAuth

    if (!planId && isActListSence && isPlanAuth) {
      console.log('无方案 ID，无需校验方案权限')
      // 活动列表验证方案权限，但是无方案 ID，则不验证，不返回结果，默认上一次结果。
      return null
    }

    const authInfo = await getAuthInfo({
      url: curAuthUrl,
      planId: planId, // 存在 planId 表明是活动里，不存在则是方案，取：id
      activityId: record.id,
    })
    if (!authInfo.success) {
      return {
        allow: false,
        msg: '获取权限数据失败，请稍后重试',
        continueNextResult: 'allow',
      }
    }

    const planAuth = authInfo?.data?.planAuth
    const authOperaton = authOperationKey || operation
    // console.log(
    //   'authOperaton:',
    //   authOperaton,
    //   [OperationEnum.Modify].includes(authOperaton),
    //   auths?.includes(AuthFromBackendResEnum.PlanAuth)
    // )
    if (
      auths?.includes(AuthFromBackendResEnum.PlanAuth) &&
      [OperationEnum.Modify, OperationEnum.Send].includes(authOperaton) &&
      !planAuth?.edit
    ) {
      // 方案修改的时候，验证下角色权限
      return {
        allow: false,
        msg: options?.noPlanEditAuthMsg || '无方案编辑权限',
        continueNextResult: 'allow',
      }
    }

    /** 验证是否具有模板权限 */
    if (auths?.includes(AuthFromBackendResEnum.TempAuth)) {
      const tempAuth = authInfo?.data?.tempAuth
      if (!tempAuth?.authResult) {
        return {
          allow: false,
          msg: tempAuth?.toast || '无权限操作',
          continueNextResult: 'allow',
        }
      }
    }
    /** 验证是否为本人操作 */
    if (auths?.includes(AuthFromBackendResEnum.Creator)) {
      const isCreator = record.creator === userInfo?.mis
      if (isCreator) {
        return { allow: true, continueNextResult: 'deny' }
      }
    }

    if (auths?.includes(AuthFromBackendResEnum.PlanCreator)) {
      const isPlanCreator = record.planCreator === userInfo?.mis

      if (isPlanCreator) {
        return { allow: true, continueNextResult: 'deny' }
      }
    }

    if (auths?.includes(AuthFromBackendResEnum.OpWhiteList)) {
      /** 验证操作白名单 */
      const opAuth = authInfo.data?.opAuth
      const opAuthRes = opAuth?.authResult
      if (!opAuthRes) {
        return {
          allow: false,
          continueNextResult: 'allow',
          msg: opAuth?.toast || '无权限操作',
        }
      }

      const whiteListStr = opAuthRes[authOperaton]
      const whiteList = whiteListStr ? whiteListStr.split(',') : []
      if (userInfo?.mis && whiteList.includes(userInfo?.mis)) {
        return { allow: true, continueNextResult: 'deny' }
      }
      /** 如果是方案，则到此结束判断，活动权限判断则继续走 */
      return {
        allow: false,
        continueNextResult: 'deny',
        msg:
          opAuth?.toast ||
          '仅创建人及被授权的mis可操作，请联系创建人进行操作授权',
      }
    }

    return {
      allow: true,
      continueNextResult: 'allow',
    }
  }

/** 只鉴权模板权限 */
export const authTempOnly = (sence: AuthSence) =>
  authOperationFromBackend([AuthFromBackendResEnum.TempAuth], { sence })

/**
 * - 验证模板权限、方案角色权限
 * - TempAuth 在拷贝方案的时候，得验证活动有没有这个权限
 *  */
export const authTempAndPlanRole = (sence: AuthSence) =>
  authOperationFromBackend(
    [AuthFromBackendResEnum.TempAuth, AuthFromBackendResEnum.PlanAuth],
    { sence }
  )

/** 鉴权模板权限、白名单、是否是创建人 */
export const authTempAndWhilteListAndSelf = (sence: AuthSence) =>
  authOperationFromBackend(
    [
      AuthFromBackendResEnum.TempAuth,
      AuthFromBackendResEnum.Creator,
      AuthFromBackendResEnum.OpWhiteList,
    ],
    { sence }
  )

/** 校验是否具有模板权限、是否为活动创建人、是否为方案创建人、是否在白名单中 */
export const authTempAndWhilteListAndPlanCreatorAndSelf = (sence: AuthSence) =>
  authOperationFromBackend(
    [
      AuthFromBackendResEnum.TempAuth,
      AuthFromBackendResEnum.Creator,
      AuthFromBackendResEnum.PlanCreator,
      AuthFromBackendResEnum.OpWhiteList,
    ],
    { sence }
  )

/**
 * - 方案鉴权模板权限、方案权限、白名单
 * - 只有存在方案 ID 的活动才走
 * */
export const authTempAndWhilteListAndSelfOfPlan = (sence: AuthSence) =>
  authOperationFromBackend(
    [
      AuthFromBackendResEnum.TempAuth,
      AuthFromBackendResEnum.PlanAuth,
      AuthFromBackendResEnum.OpWhiteList,
    ],
    {
      authUrl: AuthUrl.PlanAuth,
      sence,
    }
  )

/** 方案鉴权是否是创建人、白名单*/
export const authWhilteListAndSelf = (sence: AuthSence) =>
  authOperationFromBackend(
    [AuthFromBackendResEnum.Creator, AuthFromBackendResEnum.OpWhiteList],
    { sence }
  )

/** 方案鉴权是否是方案权限、是否是创建人、白名单*/
export const authPlanTempAndWhiteListAndSelf = (sence: AuthSence) =>
  authOperationFromBackend(
    [
      AuthFromBackendResEnum.PlanAuth,
      AuthFromBackendResEnum.Creator,
      AuthFromBackendResEnum.OpWhiteList,
    ],
    { sence }
  )
