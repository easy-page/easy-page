import { RequestHandler, postReq } from "@/common/libs";
import { Empty } from "@easy-page/antd-ui";

export type SendInviteParams = {
  planId: number;
}

export type SendInviteResult = Empty;

export const sendPlanInvite: RequestHandler<SendInviteParams, SendInviteResult> = (params) => {
  return postReq('/api/zspt/operation/plan/send', params)
}