
import { AuthUrl, OperationEnum, UserRoleAuthEnum } from "@/common/constants"
import { RequestHandler, postReq } from "@/common/libs"


export type GetAuthParams = {
  planId?: number
  activityId?: number
  url: AuthUrl
}


export type AuthResult = Record<OperationEnum, string>

export type OpAuthRes = {
  /** 为啥拷贝操作的鉴权不放到：authResult 里，真特么离谱 */
  authResult: AuthResult
  toast: string
}

export type TempAuth = {
  authResult: true
  toast: string
}

export type PlanAuth = Record<UserRoleAuthEnum, boolean>

export type AuthInfoRes = {
  // 权限
  opAuth: OpAuthRes

  /** 模版权限 */
  tempAuth: TempAuth,
  /** 方案授权 */
  planAuth?: PlanAuth
}


export const getAuthInfo: RequestHandler<GetAuthParams, AuthInfoRes> = async (params: GetAuthParams) => {
  const { url, ...rest } = params;
  return postReq(url, rest)
}