import {
  ConfigFullInfo,
  getActConfig,
} from '@/common/configs/utils/getActConfigs'
import {
  AuthActGrayConfig,
  AuthFromBackendConfig,
  AuthInfo,
  AuthSubsidyConfig,
} from '@/common/apis/getConfigList'
import {
  authActCopy,
  authActGray,
  AuthHandler,
  authNetFlow,
  authOperationFromBackend,
  authPlanCopy,
  authSubsidy,
  OperaitonContext,
} from '@/common/auths'
import { authPlanGray } from '@/common/auths/authPlanGray'
import { getPlanConfig } from '@/common/configs'
import { AuthHandlersEnum, PlanTypeEnum } from '@/common/constants'

type AuthHanlderMapType = {
  AuthActCopy: () => AuthHandler
  AuthFromBackEnd: (config: AuthFromBackendConfig) => AuthHandler
  AuthActFromBackEndOfPlan: (config: AuthFromBackendConfig) => AuthHandler
  AuthPlanGray: (config: AuthActGrayConfig) => AuthHandler
  AuthActGray: (config: AuthActGrayConfig) => AuthHandler
  AuthPlanCopy: () => AuthHandler
  AuthNetFlow: () => AuthHandler
  AuthSubsidy: (config: AuthSubsidyConfig) => AuthHandler
}

const AuthHanlderMap: AuthHanlderMapType = {
  AuthActCopy: () => authActCopy,
  AuthFromBackEnd: ({ auths, authUrl, sence }) =>
    authOperationFromBackend(auths, {
      sence,
      authUrl,
    }),
  AuthActFromBackEndOfPlan: ({ auths, authUrl, sence }) =>
    authOperationFromBackend(auths, {
      sence,
      authUrl,
      noPlanEditAuthMsg: '无权限操作',
    }),
  AuthPlanGray: ({ ruleCode }) => authPlanGray({ ruleCodes: ruleCode }),
  AuthActGray: ({ ruleCode }) => authActGray({ ruleCodes: ruleCode }),
  AuthPlanCopy: () => authPlanCopy,
  AuthNetFlow: () => authNetFlow,
  AuthSubsidy({ checkItems, resourceIdList }) {
    return authSubsidy({ checkItems, resourceIdList })
  },
}

/** 鉴权顺序排序 */
export const sortAuthOrder = (authConfig: AuthInfo[], isPlan?: boolean) => {
  const result: AuthInfo[] = []
  const planSortedAuths: AuthHandlersEnum[] = [
    AuthHandlersEnum.AuthNetFlow,
    AuthHandlersEnum.AuthPlanGray,
    AuthHandlersEnum.AuthFromBackEnd,
    AuthHandlersEnum.AuthPlanCopy,
  ]

  const actSortedAuths: AuthHandlersEnum[] = [
    AuthHandlersEnum.AuthActGray,
    AuthHandlersEnum.AuthSubsidy,
    AuthHandlersEnum.AuthFromBackEnd,
    AuthHandlersEnum.AuthActCopy,
    AuthHandlersEnum.AuthActFromBackEndOfPlan,
  ]
  const sortedAuths = isPlan ? planSortedAuths : actSortedAuths
  sortedAuths.forEach((x) => {
    const curAuth = (authConfig || []).find((e) => e.authHandlerType === x)
    if (curAuth) {
      result.push(curAuth)
    }
  })
  return result
}

export const getAuthConfig =
  (getConfig: (fullConfig: ConfigFullInfo) => AuthInfo[]) =>
  ({
    record,
    configs,
  }: OperaitonContext<
    {
      templateId?: number
      planType?: PlanTypeEnum
      status: any
    },
    string,
    Record<string, any>
  > & {}): AuthHandler[] => {
    const isPlan = record.planType !== undefined
    const fullConfig = isPlan
      ? getPlanConfig({
          planType: record.planType,
          configs,
        })
      : getActConfig({ configs, templateId: record.templateId })
    const authConfig = sortAuthOrder(getConfig(fullConfig), isPlan)
    if (authConfig.length === 0) {
      return []
    }
    return authConfig.map((e) => {
      const handler = AuthHanlderMap[e.authHandlerType]
      console.log('执行操作鉴权:', e.authHandlerType, e.config || {})
      if (!handler) {
        throw Error(`未匹配到对应鉴权 handler，请实现:${e.authHandlerType}`)
      }
      console.log('e.config', e.config)

      return handler((e.config || {}) as any)
    })
  }
