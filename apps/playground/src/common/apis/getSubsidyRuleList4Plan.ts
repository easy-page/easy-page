import { RequestHandler, postReq } from "@/common/libs";
import { BizLineEnum, PlanTypeEnum } from "../constants";

export type GetSubsidyRuleList4PlanParams = {
  bizLine: BizLineEnum;
  planType: PlanTypeEnum
}

export type GroupInfo = {
  id: number; // 方案 ID
  name: string;
}

export type SubsidyRuleList4Plan = {
  id: number; // 方案 ID
  name: string;// 方案名称
  group: GroupInfo[] // 子方案 ID 和名称
}
export type GetSubsidyRuleList4PlanResult = SubsidyRuleList4Plan[]

export const getSubsidyList4Plan: RequestHandler<GetSubsidyRuleList4PlanParams, GetSubsidyRuleList4PlanResult> = (params) => {
  return postReq('/api/zspt/operation/act/getSubsidyRuleList4Plan', params)
}