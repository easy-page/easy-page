import { RequestHandler, postReq } from "@/common/libs";
import { Empty } from "@easy-page/antd-ui";

export type PlanAuthInfo = {
  modify: string, // 编辑操作授权mis号
  send: string, // 发送邀请操作授权mis号
  withdraw: string // 撤回操作授权mis号
}

export type AuthPlanParams = {
  planId: number;
  authInfo: PlanAuthInfo
}

export type AuthPlanResult = Empty;

// 方案授权
export const authPlan: RequestHandler<AuthPlanParams, AuthPlanResult> = (params) => {
  return postReq('/api/zspt/operation/plan/saveAuthInfo', params)
}