import { Empty } from "@easy-page/antd-ui";
import { RequestHandler, postReq } from "../libs";

export type WithdrawActParms = {
  activityId: number;
}

export const withdrawAct: RequestHandler<WithdrawActParms, Empty> = (params) => {
  return postReq('/api/zspt/operation/act/withdraw', params)
}