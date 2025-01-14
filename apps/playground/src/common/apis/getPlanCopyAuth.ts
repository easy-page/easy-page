import { RequestHandler, postReq } from "@/common/libs"

export type GetPlanCopyAuthParams = {
  planId: number // 方案ID
  opType: 'copy' // copy-复制
}


export type GetPlanCopyAuthRes = {
  authResult: boolean // 方案ID
  reason: string // copy-复制
}

export const getPlanCopyAuth: RequestHandler<GetPlanCopyAuthParams, GetPlanCopyAuthRes> = (params) => {
  return postReq('/api/zspt/operation/plan/checkAuth', params)
}