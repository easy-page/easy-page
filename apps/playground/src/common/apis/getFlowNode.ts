import { ActivityStatusEnum } from "../constants";
import { postReq, RequestHandler } from "../libs";
import { FlowNode } from "./saveAct";

export type GetFlowNodeParams = {
  activityId: number;
}

export type GetFlowNodeRes = {
  activityStatus: ActivityStatusEnum
  flowNode: FlowNode[]
}

export const getFlowNode: RequestHandler<GetFlowNodeParams, GetFlowNodeRes> = (params) => {
  return postReq('/api/zspt/operation/act/getFlowNode', params)
}