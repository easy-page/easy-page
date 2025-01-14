import { MccData, UserInfo } from '@/common/apis'

import {
  ActSubTabResources,
  AuthUrl,
  OperationEnum,
  PlanSubTabResources,
} from '@/common/constants'
import { Empty } from '@easy-page/antd-ui'
import { ConfigListInfo } from '../apis/getConfigList'

export type OperaitonContext<T, Sence = string, Context = Empty> = Context & {
  userInfo?: UserInfo
  record: T
  sence?: Sence
  operation: OperationEnum
  authOperationKey?: OperationEnum
  mccConfig?: Partial<MccData>
  configs?: ConfigListInfo[]
  actSubTab?: ActSubTabResources
  planSubTab?: PlanSubTabResources
  setShowInviteSettings?: (options: { show: boolean; actId: number }) => void
  authUrl?: AuthUrl // 不同的操作，有不同的请求，就非常的离谱，后端设计的非常拉垮。
}

export type AuthHandlerRes = {
  allow: boolean
  msg?: string // 不允许时的提示语
  /**
   * - 是否继续的结果，如果当前结果是：allow，并且节点需要继续验证的结果是：allow 则继续，否则结束鉴权
   * - 是否继续的结果，如果当前结果是：deny，并且节点需要继续验证的结果是：deny 则继续，否则结束鉴权
   *  */
  continueNextResult: 'allow' | 'deny'
  /** 定义后，就不再默认 toast */
  disableErrorToast?: boolean
}
export type AuthHandler<
  T = Record<string, any>,
  Context = Record<string, any>,
  Sence = string
> = (
  context: OperaitonContext<T, Sence, Context>
) => null | AuthHandlerRes | Promise<AuthHandlerRes | null>

export enum AuthsEnum {
  AuthNetFlow = 'AuthNetFlow', // 验证流量资源白名单权限
  AuthCreator = 'AuthCreator', // 验证用户信息
  AuthFromBackend = 'AuthFromBackend', // 验证后端权限
  AuthPlan = 'AuthPlan', // 验证方案权限
}

export const NetFlowGrayListAll = 'all'

export type AuthHandlerType<T, Context = Record<string, any>, Sence = string> =
  | AuthHandler<T, Context, Sence>[]
  | ((
      context: OperaitonContext<T, Sence, Context>
    ) => AuthHandler<T, Context, Sence>[])
