import { Empty } from "@easy-page/antd-ui";
import { RequestHandler, postReq } from "../libs";

export type SendActInviteParms = {
  activityId: number;
}

export const sendActInvite: RequestHandler<SendActInviteParms, Empty> = (params) => {
  return postReq('/api/zspt/operation/act/send', params)
}