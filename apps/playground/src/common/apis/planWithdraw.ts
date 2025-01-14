// /api/zspt/operation/plan/withdraw

import { postReq, RequestHandler } from "../libs";

export type PlanWithdrawParams = {
  planId: number;
}

export type PlanWithdrawRes = {

}

export const planWithdraw: RequestHandler<PlanWithdrawParams, PlanWithdrawRes> = (params) => {
  return postReq('/api/zspt/operation/plan/withdraw', params)
}