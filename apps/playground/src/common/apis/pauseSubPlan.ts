import { RequestHandler, postReq } from "@/common/libs";
import { Empty } from "@easy-page/antd-ui";

export type PauseSubPlanParams = {
  groupId: number; // 子方案 ID
}

export type PauseSubPlanResult = Empty;

export const pauseSubPlan: RequestHandler<PauseSubPlanParams, PauseSubPlanResult> = (params) => {
  return postReq('/api/zspt/operation/group/pause', params)
}

